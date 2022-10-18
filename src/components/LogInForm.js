import {useContext, useState} from 'react';
import {View, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {CCContext} from '../contexts/CCContext';
import {UserInformation} from '../contexts/userInformation';
import {Input, Icon, Button, Text} from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDoc, doc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {enviromentVariables} from '../../utils/enviromentVariables';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

const LogInForm = ({navigation}) => {
    const {setUserInformation, userInformation} = useContext(UserInformation);
    const {setCCUser} = useContext(CCContext);
    const [loading, isLoading] = useState(false);
    const {db, app} = enviromentVariables;

    const screen = Dimensions.get("window");

    const auth = getAuth(app);

    const logInSchema = Yup.object().shape({
        email:Yup.
            string().
            email("Email no valido").
			required("Email requerido"),
        password:Yup.
            string().
            required("Contraseña requerida")
    })

    const getData = async uid => {
        try{
            const users = [
            getDoc(doc(db, "donor", uid)),
            getDoc(doc(db, "BAMXmanager", uid)),
            getDoc(doc(db, "collection_center", uid))
            ];

            const userAuthList = await Promise.all(users);
            const userType = userAuthList.map((user, i) => user.exists() ? {userData: user.data(),i,id: user.id} : null);
            const user = userType.filter(user => user !== null);
            if(user.length !== 0)return user[0];throw Error();
        }catch(e){}
    }

    const handleSubmit = async(data) => {
        try{
            //Getting the input user, starting login process and loading modal
            const {email, password} = data;
            isLoading(true);

            //Singing
            await signInWithEmailAndPassword(auth, email, password);

            //Detects the user type and gets data
            const user = await getData(auth.currentUser.uid);
            const {i, id} = user;
            
            //logsin
            switch(i){
                case 0:
                case 1:
                    isLoading(false);
                    const {name, lastName} = user.userData;
                    await setUserInformation({auth, id, name, lastName});
                    Toast.show(
                        "Bienvenid@", 
                        {position: Toast.positions.CENTER, 
                            duration: Toast.durations.SHORT,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                            backgroundColor: "#000000",
                            textColor: "#ffffff"});
                    navigation.navigate(i === 0 ? "HomePageDonor" : "HomePageManagerBAMX", {navigation});
                    break;
                case 2:
                    isLoading(false);
                    await setCCUser(id);
                    Toast.show(
                        "Bienvenid@", 
                        {position: Toast.positions.CENTER, 
                            duration: Toast.durations.SHORT,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                            backgroundColor: "#000000",
                            textColor: "#ffffff"});
                    navigation.navigate("CCmenu");
                    break;
            }
        }catch(e){
            isLoading(false);
            Alert.alert("Error", "Usuario o contraseña incorrectas",[{text: "ACEPTAR", onPress: () => console.log(e)}]);
        }
    }

  return (
    <>
        <Spinner
            visible={loading === true}
            textContent={'Cargando...'}
            textStyle={{color: '#FFF'}}
        />
        <Formik
            initialValues={{
                email:"",
                password:""
            }}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}
            validationSchema={logInSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => {
                    return(
                        <>
                            <View style={{padding: 35}}>
                                <Input
                                    placeholder="Correo"
                                    leftIcon={<Icon type="material" name="mail"/>}
                                    onChangeText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    style={{height: screen.height*0.02, fontSize: screen.fontScale*20}}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <Input
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    leftIcon={<Icon type="material" name="lock"/>}
                                    onChangeText={handleChange("password")}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    style={{height: screen.height*0.02, fontSize: screen.fontScale*20}}
                                    value={values.password}
                                />
                            </View>
                            <View style={{justifyContent:"space-around", flexDirection:"column"}}>    
                                <Button 
                                    onPress={handleSubmit} 
                                    title="Entrar"
                                    buttonStyle={{
                                        width: screen.width*0.8,
                                        height: screen.height*0.06,
                                        borderRadius: 10,
                                        backgroundColor:"red",
                                        alignSelf:"center"
                                    }}
                                    titleStyle={{
                                        width: screen.width*0.7,
                                        color:"white",
                                        fontSize: screen.fontScale*25,
                                        fontWeight:"bold"
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color ="white"/>}
                                    iconRight={true}
                                />
                                <Button 
                                    onPress={() => navigation.navigate("RegisterDonor")} 
                                    title="Registrarse"
                                    buttonStyle={{
                                        width: screen.width*0.8,
                                        height: screen.height*0.06,
                                        borderRadius: 10,
                                        backgroundColor:"orange",
                                        alignSelf:"center",
                                        marginTop: screen.height*0.01
                                    }}
                                    titleStyle={{
                                        width: screen.width*0.7,
                                        color:"white",
                                        fontSize: screen.fontScale*25,
                                        fontWeight:"bold"
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color ="white"/>}
                                    iconRight={true}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                    <Text style={{
                                            color:"black", 
                                            alignSelf:"center", 
                                            marginTop: screen.height*0.04, 
                                            fontSize: screen.fontScale*16,
                                            textDecorationLine: "underline",
                                            textDecorationColor: "black",
                                            textDecorationStyle: "solid",
                                            fontStyle: "italic"
                                        }}
                                    >¿Olvidaste tu contraseña?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
            }
        </Formik>
    </>
)}

export default LogInForm;
<<<<<<< HEAD

=======
>>>>>>> 5f7a37c8d26e9e6b15e5d3fde0fbe71743e03d6f

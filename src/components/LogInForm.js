import {useContext, useState} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import {CCContext} from '../contexts/CCContext';
import {UserInformation} from '../contexts/userInformation';
import {Input, Icon, Button, Text} from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDoc, doc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {enviromentVariables} from '../../utils/enviromentVariables';
import Spinner from 'react-native-loading-spinner-overlay';

const LogInForm = ({navigation}) => {
    const {setUserInformation} = useContext(UserInformation);
    const {setCCUser} = useContext(CCContext);

    const {db, app} = enviromentVariables;

    const [loading, isLoading] = useState(false);

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

    const logIn = async uid => {
        const users = [
            getDoc(doc(db, "donor", uid)),
            getDoc(doc(db, "BAMXmanager", uid)),
            getDoc(doc(db, "collection_center", uid))
        ];

        return Promise.all(users).then(usersList => usersList.map((user, i) => {
            if(user.exists()){
                const {name, lastName} = user.data();
                switch(i){
                    case 0:
                    case 1:
                        isLoading(false);
                        setUserInformation({uid,auth,name,lastName});
                        navigation.navigate((i === 0) ? "HomePageDonor" : "HomePageManagerBAMX", {navigation});
                        break;
                    case 2:
                        isLoading(false);
                        setCCUser(uid);
                        navigation.navigate("CCmenu");
                        break;
                }
            }
        })).catch((e) => {
            isLoading(false);
            Alert.alert("Error", "Usuario o contraseña incorrectas",
            [{text: "ACEPTAR", onPress: () => console.log(e)}]);
        });
    }

    const handleSubmit = async(data) => {
        //Getting the input user, starting login process and loading modal
        const {email, password} = data;
        isLoading(true);

        //Singing
        await signInWithEmailAndPassword(auth, email, password);

        //Detects the user type and navigate to the corresponding view
        await logIn(auth.currentUser.uid);
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
                            <View style={{padding: 34}}>
                                <Input
                                    placeholder="Correo"
                                    leftIcon={<Icon type="material" name="mail"/>}
                                    onChangeText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    style={{height:20, fontSize: 20}}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <Input
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    leftIcon={<Icon type="material" name="lock"/>}
                                    onChangeText={handleChange("password")}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    style={{height:20, fontSize: 20}}
                                    value={values.password}
                                />
                            </View>
                            <View style={{justifyContent:"space-around", flexDirection:"column"}}>    
                                <Button 
                                    onPress={handleSubmit} 
                                    title="Entrar"
                                    buttonStyle={{
                                        width: "80%",
                                        height:50,
                                        borderRadius: 10,
                                        backgroundColor:"red",
                                        alignSelf:"center"
                                    }}
                                    titleStyle={{
                                        width: "90%",
                                        color:"white",
                                        fontSize: 25
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color ="white"/>}
                                    iconRight={true}
                                />
                                <Button 
                                    onPress={() => navigation.navigate("RegisterDonor")} 
                                    title="Registrarse"
                                    buttonStyle={{
                                        width: "80%",
                                        height:50,
                                        borderRadius: 10,
                                        backgroundColor:"orange",
                                        alignSelf:"center",
                                        marginTop: 10
                                    }}
                                    titleStyle={{
                                        width: "90%",
                                        color:"white",
                                        fontSize: 25
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color ="white"/>}
                                    iconRight={true}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                    <Text style={{
                                            color:"black", 
                                            alignSelf:"center", 
                                            marginTop: 30, 
                                            fontSize: 16,
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
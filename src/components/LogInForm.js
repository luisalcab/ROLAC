import {useContext} from 'react';
import {View} from 'react-native';
import {Input, Icon, Button} from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDoc, doc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebaseConection from "../contexts/FBConnection"
import { UserInformation } from '../contexts/userInformation';

const LogInForm = ({navigation}) => {

    const {userInformation, setUserInformation} = useContext(UserInformation);

    const auth = getAuth();

    const nav2Registration = () => {
        navigation.navigate("RegisterDonor");
    }

    const logInSchema = Yup.object().shape({
        email:Yup.
            string().
            email("Email no valido").
			required("Email requerido"),
        password:Yup.
            string().
            required("Contraseña requerida")
    })

    const handleSubmit = async(data) => {
        const {email, password} = data;
        console.log(email)
        console.log(password)

        await signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            const querySnapshotDonor = await getDoc(doc(firebaseConection.db, "donor", auth.currentUser.uid))
            if(querySnapshotDonor.exists()){
                const { currentUser } = auth;
                const { lastName, name } = querySnapshotDonor.data();
                console.log("Lo que es auth: ", currentUser);
                console.log("Lo que se encontro: ", lastName, " - ", name);
                setUserInformation({
                    auth: currentUser,
                    name: name,
                    lastName: lastName
                });

                navigation.navigate("HomePageDonor", {navigation: navigation})
            } else {
                const querySnapshotCollectionCenter = await getDoc(doc(firebaseConection.db, "collection_center", auth.currentUser.uid))
                if(querySnapshotCollectionCenter.exists()){
                    alert("Es centro de acopio")
                } else {
                    const querySnapshotManger = await getDoc(doc(firebaseConection.db, "BAMXmanager", auth.currentUser.uid))
                    if(querySnapshotManger.exists()){
                        alert("Es administrador de centro de acopio")
                    } else {
                        alert("Usuario o contraseña incorrectas");

                    }
                }
                
            }



        })
        .catch((e) => {
            console.log(e)
            alert("Usuario o contraseña incorrectas");
        });

        
         
    }
  return (
    <>
        <Formik
            initialValues={{
                email:"",
                password:""
            }
        }
        onSubmit={(values, {resetForm}) => {
            handleSubmit(values);
            resetForm();
        }}
        validationSchema={logInSchema}
        >
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <>
                        <Input
                            placeholder="Correo"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("email")}
                            errorMessage={errors.email && touched.email ? errors.email : ""}
                            style={{width:"100%",height:20}}
                            value={values.email}
                        />
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            leftIcon={<Icon type="material" name="lock"/>}
                            onChangeText={handleChange("password")}
                            errorMessage={errors.password && touched.password ? errors.password : ""}
                            style={{width:"100%",height:20}}
                            value={values.password}
                        />
                        <View style={{flex:1, justifyContent:"space-around", alignItems:"center", flexDirection:"column"}}>    
                            <Button 
                                onPress={handleSubmit} 
                                title="Submit"
                                buttonStyle={{
                                    width: "80%",
                                    height:50,
                                    borderBottomEndRadius:10,
                                    borderBottomLeftRadius:10,
                                    backgroundColor:"gray"
                                }}
                                titleStyle={{
                                    width: "100%"
                                }}
                                icon={<Icon name="arrow-forward-ios" type="material"/>}
                                iconRight={true}
                            />
                            <Button 
                                onPress={nav2Registration} 
                                title="Registrarse"
                                buttonStyle={{
                                    width: "80%",
                                    height:50,
                                    borderBottomEndRadius:10,
                                    borderBottomLeftRadius:10,
                                    backgroundColor:"gray"
                                }}
                                titleStyle={{
                                    width: "100%"
                                }}
                                icon={<Icon name="arrow-forward-ios" type="material"/>}
                                iconRight={true}
                            />
                        </View>
                    </>
                )
            }}
        </Formik>    
    </>
  )
}

export default LogInForm
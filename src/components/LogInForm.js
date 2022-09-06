import {useEffect} from 'react';
import {View} from 'react-native';
import {Input, Icon, Button} from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import FBConnection from "../contexts/FBConnection";
import {getDoc, deleteDoc, updateDoc, collection} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

const LogInForm = ({navigation}) => {
    const {db, app} = FBConnection;
    const auth = getAuth();

    const nav2Registration = () => {
        props.navigation.navigate("Register");
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
        // signInWithEmailAndPassword(auth, "bruh@gmail.com", "bruhMomentums")
        // .then((userAuth) => {
        //   console.log("logeado exitosamente")
        // }).catch(() =>{
        //   console.log("Error en login")
        // })
        
        // console.log("Fuera: ", auth.currentUser.uid)
        // console.log("Fuera: ", auth.currentUser.email)
        // console.log(email)
        // console.log(password)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // console.log(auth.currentUser);
            navigation.navigate("HomePageDonor", {userAuth: auth})

        }catch (e){
            console.log(e);
        } 
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
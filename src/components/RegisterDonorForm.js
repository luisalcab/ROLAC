import React, {useState} from 'react'
import {View, Text, Alert} from 'react-native';
import {Input, Icon, Button, CheckBox } from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {doc, setDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConection from '../contexts/FBConnection';
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterDonorForm = ({navigation}) => {
    const [loading, isLoading] = useState(false);
    const [accept, setAccept] = useState(false);

    const auth = getAuth();
    const donorSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre es obligatorio"),
        email:Yup.
            string().
            required("Email es obligatorio").
            email("Email no válido"),
        password:Yup.
            string().
            required("Contraseña es obligatoria").
            min(8, "La contraseña debe de tener por lo menos 8 caracteres")
    })

    return (
        <>
            <Formik
                initialValues={{
                    name:"",
                    lastName: "",
                    lastName: "",
                    email:"",
                    password:""
                }}
                onSubmit={(values, {resetForm}) => {
                    isLoading(true);

                    createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then(userCredential => {
                        const user = userCredential;                    
                        setDoc(doc(firebaseConection.db, "donor", user.user.uid), {
                            lastName: values.lastName,
                            name: values.name
                        })
                        .then(() => {
                            Alert.alert("Registro exitoso", "Se ha registrado exitosamente", [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        navigation.navigate("Login");
                                        isLoading(false);
                                    }
                                }
                            ])
                        })
                        .catch(() => {
                            Alert.alert("Error", "No se pudo registrar", [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        navigation.navigate("Login");
                                        isLoading(false);
                                    }
                                }
                            ])
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        if(error.code == 'auth/email-already-in-use'){
                            Alert.alert("Error", "El email ya está en uso", [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        isLoading(false);
                                    }
                                }
                            ])
                        }
                    })

                    resetForm();
                }}
                validationSchema={donorSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => {
                    return(
                        <>
                        <Spinner
                            visible={loading == true}
                            textContent={'Cargando...'}
                            textStyle={{color: '#FFF'}}
                        />
                            <View style={{width:"100%", height:"100%" ,flex:1 ,alignItems:"center"}}>
                                <View style={{width:"80%", height:"100%" ,flex:1 ,alignItems:"center", justifyContent:"center"}}>
                                <Input
                                    placeholder="Nombre(s)"
                                    leftIcon={<Icon type="material" name="person"/>}
                                    onChangeText={handleChange("name")}
                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                    value={values.name}
                                    style={{fontSize: 20}}
                                />
                                <Input
                                    placeholder="Apellido(s)"
                                    leftIcon={<Icon type="material" name="people"/>}
                                    onChangeText={handleChange("lastName")}
                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                    value={values.lastName}
                                    style={{fontSize: 20}}
                                />
                                <Input
                                    placeholder="Email"
                                    leftIcon={<Icon type="material" name="mail"/>}
                                    onChangeText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    value={values.email}
                                    style={{fontSize: 20}}
                                />
                                <Input
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    leftIcon={<Icon type="material" name="lock"/>}
                                    onChangeText={handleChange("password")}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    value={values.password}
                                    style={{fontSize: 20}}
                                />
                                <View style = {{width: "100%", alignItems: "center"}}>
                                    <CheckBox
                                        title={
                                            <Text> He leído y acepto los
                                                <Text style={{color: "#0000EE"}} onPress={() => navigation.navigate("TerminosyCondiciones")}> Términos y Condiciones</Text>
                                            </Text>
                                        }
                                        checkedIcon="check-square"
                                        uncheckedIcon="square-o"
                                        checked={accept}
                                        onPress={() => setAccept(!accept)}
                                    />
                                </View>
                            </View>
                                <Button
                                    onPress={handleSubmit}
                                    title="Registrarse"
                                    buttonStyle={{
                                        width:"90%",
                                        height:60,
                                        alignSelf:"center",
                                        marginTop:20,
                                        borderRadius: 10,
                                        backgroundColor:"orange",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3
                                        },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,
                                        elevation: 6,
                                        marginBottom: 20
                                    }}
                                    titleStyle={{
                                        color:"white",
                                        width:"80%",
                                        fontSize:25,
                                        fontWeight: 'bold'
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color={"white"}/>}
                                    iconRight={true}
                                    disabled={!accept}
                                />
                                <View style={{flex:1, justifyContent:"flex-start", width:"100%", height:"auto", marginTop: 50}}>
                                    <Button
                                        onPress={() => navigation.navigate("RegisterCCForm")}
                                        title="¿Eres un negocio?"
                                        buttonStyle={{
                                            backgroundColor:"transparent",
                                            width:"100%",
                                        }}
                                        titleStyle={{
                                            color:"black",
                                            fontWeight: 'bold',
                                            textDecorationLine: 'underline',
                                            fontSize: 16
                                        }}
                                    >
                                    </Button>
                                </View>
                            </View>
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

export default RegisterDonorForm
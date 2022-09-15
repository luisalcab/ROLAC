import React from 'react'
import {View} from 'react-native';
import {Input, Icon, Button, } from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDoc, deleteDoc, updateDoc, collection, doc, setDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConection from '../contexts/FBConnection';

const RegisterDonorForm = ({navigation}) => {
    const auth = getAuth();
    const donorSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre es Obligatorio."),
        email:Yup.
            string().
            required("Email es Obligatorio.").
            email("Email no válido"),
        password:Yup.
            string().
            required("Contraseña es Obligatoria.").
            min(8, "La contraseña debe de tener por lo menos 8 caracteres.")
    })

    return (
        <>
            <Formik
                initialValues={{
                    name:"",
                    lastName: "",
                    email:"",
                    password:""
                }}
                onSubmit={(values, {resetForm}) => {
                    console.log(values)

                    createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then(userCredential => {
                        const user = userCredential;                    
                        setDoc(doc(firebaseConection.db, "donor", user.user.uid), {
                            email: values.email,
                            lastName: values.lastName,
                            name: values.name
                        })
                        .then(() => {
                            alert("Se a creado el perfil");
                            navigation.navigate("Login");
                        })
                        .catch(() => {
                            alert("Ha habido un error a la hora de crear el perfil");
                            navigation.navigate("Login");
                        })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    })

                    resetForm();
                }}
                validationSchema={donorSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => {
                    return(
                        <>
                            <View style={{width:"100%", height:"100%" ,flex:1 ,alignItems:"center"}}>
                                <Input
                                    placeholder="Nombre"
                                    leftIcon={<Icon type="material" name="person"/>}
                                    onChangeText={handleChange("name")}
                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                    value={values.name}
                                />
                                <Input
                                    placeholder="Apellidos"
                                    leftIcon={<Icon type="material" name="people"/>}
                                    onChangeText={handleChange("lastName")}
                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                    value={values.lastName}
                                />
                                <Input
                                    placeholder="Email"
                                    leftIcon={<Icon type="material" name="mail"/>}
                                    onChangeText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    value={values.email}
                                />
                                <Input
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    leftIcon={<Icon type="material" name="lock"/>}
                                    onChangeText={handleChange("password")}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    value={values.password}
                                />
                                <View style={{flex:1,justifyContent:"flex-start",width:"100%",height:"auto"}}>
                                    <Button
                                        onPress={() => navigation.navigate("RegisterCCForm")}
                                        title="¿Eres un Negocio?"
                                        buttonStyle={{
                                            backgroundColor:"transparent",
                                            width:160
                                        }}
                                        titleStyle={{
                                            color:"black",
                                            fontWeight: 'bold',
                                            textDecorationLine: 'underline'
                                        }}
                                    >
                                    </Button>
                                </View>
                                <Button
                                    onPress={handleSubmit}
                                    title="Registrarse"
                                    buttonStyle={{
                                        width:"80%",
                                        height:80,
                                        borderRadius: 5,
                                        backgroundColor:"white",
                                        marginBottom: "20%",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3
                                        },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,
                                        elevation: 6
                                    }}
                                    titleStyle={{
                                        color:"black",
                                        width:"80%",
                                        fontSize:30
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

export default RegisterDonorForm
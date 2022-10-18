import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';
import { Input, Icon, Button } from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { enviromentVariables } from '../../../utils/enviromentVariables';

const AdminRegisterComponent = ({ navigation }) => {
    const auth = getAuth();   
    const { db } = enviromentVariables;

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
                    lastName: "",
                    email:"",
                    password:""
                }}
                onSubmit={(values, {resetForm}) => {
                    createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then(userCredential => {
                        const user = userCredential;

                        setDoc(doc(db, "BAMXmanager", user.user.uid), {
                            lastName: values.lastName,
                            name: values.name
                        })
                        .then(() => {
                            alert("Se a creado el perfil");
                            navigation.navigate("HomePageManagerBAMX", {navigation: navigation});
                        })
                        .catch((err) => {
                            alert("Ha habido un error a la hora de crear el perfil");
                            navigation.navigate("HomePageManagerBAMX", {navigation: navigation});
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        if(error.code == 'auth/email-already-in-use'){
                            alert("Ya hay una cuenta que utiliza ese correo");
                        }
                    })

                    resetForm();
                }}
                validationSchema={donorSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => {
                    return(
                        <>
                            <View style={{width:"100%", height:"100%" ,flex:1 ,alignItems:"center"}}>
                                <View style={styles.form}>
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
                                </View>
                                <Button
                                    onPress={handleSubmit}
                                    title="Agregar"
                                    buttonStyle={{
                                        width: screen.width*0.8,
                                        height:50,
                                        borderRadius: 5,
                                        backgroundColor:"orange",
                                        marginBottom: "5%",
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
                                        color:"white",
                                        fontSize:20
                                    }}
                                />
                            </View>
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    form:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        padding: 30,
    }
})

export default AdminRegisterComponent
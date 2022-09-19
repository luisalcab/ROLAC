import React from 'react'
import {View} from 'react-native';
import {Input, Icon, Button, } from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';

const RegisterDonorForm = ({navigation}) => {
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
                    email:"",
                    password:""
                }}
                onSubmit={(values, {resetForm}) => {
                    console.log(values)
                    navigation.navigate("Login");
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
                                    leftIcon={<Icon type="feather" name="user"/>}
                                    onChangeText={handleChange("name")}
                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                    value={values.name}
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
import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Input, Icon, Button, } from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterCCForm = () => {
    const registerSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre Requerido"),
        email:Yup.
            string().
            email("Email no valido").
            required("Email requerido"),
        direction:Yup.
            string().
            required("Direccion Requeida"),
        coordinates:Yup.
            string().
            required("Coordenadas Requeridas").
            matches(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi, "Coordenada no Válida")
    })


  return (
    <View style={styles.screen}>
        <Formik
            initialValues={{
                name:"",
                email:"",
                direction:"",
                coordinates:""
            }}
            onSubmit={(values, {resetForm}) => {
                console.log(values)
            }}
            validationSchema={registerSchema}
        >
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <View style={styles.form}>
                        <Text>xdxdxdxdxd</Text>
                    </View>
                )
            }}

        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:"center",
        width: "100%",
        height: "100%"
    },
    input:{

    },
    form:{
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor:"blue"
    }
})

export default RegisterCCForm
import React from 'react';
import {View, Text} from 'react-native';
import { Input, Icon, Button } from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup'

const LogInForm = () => {
    const logInSchema = Yup.object().shape({
        email:Yup.
            string().
            email("Email no valido").
			required("Email requerido"),
        password:Yup.
            string().
            required("Contraseña requerida")
    })

  return (
    <>
        <Formik
            initialValues={{
                email:"",
                password:""
            }
        }
        onSubmit={(values, {resetForm}) => {
            console.log(values)
            resetForm();
        }}
        validationSchema={logInSchema}
        >
            {({errors, touched, handleChange, handleSubmit}) => {
                return(
                    <View style={{with:"100%",height:"30%",justifyContent:"space-around", alignItems:"center"}}>
                        <Input
                            placeholder="Correo"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("email")}
                            errorMessage={errors.email && touched.email ? errors.email : ""}
                            style={{with:"100%",height:20}}
                        />
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            leftIcon={<Icon type="material" name="lock"/>}
                            onChangeText={handleChange("password")}
                            style={{with:"100%",height:20}}
                        />
                        <Button 
                            onPress={handleSubmit} 
                            title="Submit"
                            buttonStyle={{
                                width: "80%",
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
                )
            }}
        </Formik>    
    </>
  )
}

export default LogInForm
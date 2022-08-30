import React from 'react';
import {View} from 'react-native';
import { Input, Icon, Button } from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup'

const LogInForm = ({navigation}) => {
    const nav2Registration = () => {
        navigation.navigate("Register");
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
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <View style={{width:"100%",height:"30%",justifyContent:"space-around", alignItems:"center"}}>
                        <Input
                            placeholder="Correo"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("email")}
                            errorMessage={errors.email && touched.email ? errors.email : ""}
                            style={{with:"100%",height:20}}
                            value={values.email}
                        />
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            leftIcon={<Icon type="material" name="lock"/>}
                            onChangeText={handleChange("password")}
                            errorMessage={errors.password && touched.password ? errors.password : ""}
                            style={{with:"100%",height:20}}
                            value={values.password}
                        />
                        <Button 
                            onPress={handleSubmit} 
                            title="Submit"
                            buttonStyle={{
                                width: "80%",
                                borderBottomEndRadius:10,
                                borderBottomLeftRadius:10,
                                marginTop:30,
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
                                borderBottomEndRadius:10,
                                borderBottomLeftRadius:10,
                                marginTop:50,
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
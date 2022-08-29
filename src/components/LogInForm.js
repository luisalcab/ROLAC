import React from 'react';
import {View, Text} from 'react-native';
import { Input } from "@rneui/themed";
import { Formik } from 'formik';

const LogInForm = () => {
    const handleSubmit = async(values) =>{
        console.log(values)
    }

  return (
<<<<<<< HEAD
    <>
        <View>
            <Input
                
            />
        </View>
    </>
=======
    <View>
        <Formik
            initialValues={{
                email:"",
                password:""
            }
        }
        onSubmit={async (values, {resetForm}) => {
            await handleSubmit(values);
            resetForm();
        }}
        >
            <View  style={{with:"100%",height:40}}>
                <Input
                    placeholder="Correo"
                    style={{with:50,height:20}}
                />
                <Input
                    placeholder="Contraseña"
                    style={{with:50,height:20}}
                />
            </View>
        </Formik>    
    </View>
>>>>>>> main
  )
}

export default LogInForm
import React, {useState} from 'react'
import {View, Text, Alert, Dimensions} from 'react-native';
import {Input, Icon, Button, CheckBox } from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {doc, setDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { enviromentVariables } from '../../utils/enviromentVariables';
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterDonorForm = ({navigation}) => {
    const [loading, isLoading] = useState(false);
    const [accept, setAccept] = useState(false);
    const {db} = enviromentVariables;

    const screen = Dimensions.get("window");

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
                        setDoc(doc(db, "donor", user.user.uid), {
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
                            <View style={{width: screen.width*1, height: screen.height*1, alignItems:"center", justifyContent: "flex-start"}}>
                                <View style={{width: screen.width*.8, height: screen.height*.5, flex: 1, alignItems:"center", justifyContent:"center"}}>
                                    <Input
                                        placeholder="Nombre(s)"
                                        leftIcon={<Icon type="material" name="person"/>}
                                        onChangeText={handleChange("name")}
                                        errorMessage={errors.name && touched.name ? errors.name : ""}
                                        value={values.name}
                                        style={{fontSize: screen.fontScale*20}}
                                    />
                                    <Input
                                        placeholder="Apellido(s)"
                                        leftIcon={<Icon type="material" name="people"/>}
                                        onChangeText={handleChange("lastName")}
                                        errorMessage={errors.name && touched.name ? errors.name : ""}
                                        value={values.lastName}
                                        style={{fontSize: screen.fontScale*20}}
                                    />
                                    <Input
                                        placeholder="Email"
                                        leftIcon={<Icon type="material" name="mail"/>}
                                        onChangeText={handleChange("email")}
                                        errorMessage={errors.email && touched.email ? errors.email : ""}
                                        value={values.email}
                                        style={{fontSize: screen.fontScale*20}}
                                    />
                                    <Input
                                        placeholder="Contraseña"
                                        secureTextEntry={true}
                                        leftIcon={<Icon type="material" name="lock"/>}
                                        onChangeText={handleChange("password")}
                                        errorMessage={errors.password && touched.password ? errors.password : ""}
                                        value={values.password}
                                        style={{fontSize: screen.fontScale*20}}
                                    />
                                    <View style = {{width: screen.width*.8, alignItems: "center", marginTop: screen.height*0.01}}>
                                        <CheckBox
                                            title={
                                                <Text style = {{fontSize: screen.fontScale*15}}>He leído y acepto los
                                                    <Text style={{color: "#0000EE"}} onPress={() => navigation.navigate("TerminosyCondiciones")}> Términos y Condiciones</Text>
                                                </Text>
                                            }
                                            checkedIcon="check-square"
                                            uncheckedIcon="square-o"
                                            checked={accept}
                                            onPress={() => setAccept(!accept)}
                                        />
                                    </View>
                                    <View style = {{width: screen.width*.8, alignItems: "center", flex: 1}}>
                                        <Button
                                            onPress={handleSubmit}
                                            title="Registrarse"
                                            buttonStyle={{
                                                width: screen.width*.8,
                                                height: screen.height*.06,
                                                alignSelf:"center",
                                                marginTop: screen.height*.01,
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
                                                width: screen.width*.6,
                                                fontSize: screen.fontScale*24,
                                                fontWeight: 'bold'
                                            }}
                                            icon={<Icon name="arrow-forward-ios" type="material" color={"white"}/>}
                                            iconRight={true}
                                            disabled={!accept}
                                        />
                                    <View style={{flex:1, justifyContent:"flex-start", width: screen.width*1, height: "auto", marginTop: screen.width*0.04}}>
                                        <Button
                                            onPress={() => navigation.navigate("RegisterCCForm")}
                                            title="¿Eres un negocio?"
                                            buttonStyle={{
                                                backgroundColor:"transparent",
                                            }}
                                            titleStyle={{
                                                color:"black",
                                                fontWeight: 'bold',
                                                textDecorationLine: 'underline',
                                                fontSize: screen.fontScale*16,
                                                fontStyle: "italic"
                                            }}
                                        >
                                        </Button>
                                    </View>
                                </View>
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
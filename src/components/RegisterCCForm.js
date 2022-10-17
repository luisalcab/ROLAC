import {useState, useContext} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Icon, Button, CheckBox} from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from './DatePicker';
import {RegisterContext} from "../contexts/RegisterCC"
import Toast from 'react-native-root-toast';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screen = Dimensions.get("screen");

const RegisterCCForm = ({navigation}) => {
    const {setData} = useContext(RegisterContext);
    const [accept, setAccept] = useState(false);

    const nav2Registration = () => {
        navigation.navigate("RegisterDonor");
    }

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    //Set the schedule data
    const [schedule, setSchedule] = useState(
        {
            Lunes:{open:"00:00", close:"00:00"},
            Martes:{open:"00:00", close:"00:00"},
            Miercoles:{open:"00:00", close:"00:00"},
            Jueves:{open:"00:00", close:"00:00"},
            Viernes:{open:"00:00", close:"00:00"},
            Sabado:{open:"00:00", close:"00:00"},
            Domingo:{open:"00:00", close:"00:00"}
        });

    const registerSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre Requerido"),
        email:Yup.
            string().
            email("Email no valido").
            required("Email requerido"),
        address:Yup.
            string().
            required("Dirección Requerida"),
        longitude:Yup.
            number().
            required("Coordenadas Requeridas"),
        latitude:Yup.
            number().
            required("Coordenadas Requeridas")
    })

  return (
    <>
        <Formik
            initialValues={{
                name:"",
                email:"",
                address:"",
                longitude:0,
                latitude:0
            }}
            onSubmit={(values, {resetForm}) => {
                try{
                    //WrapUp all the values
                    const allData = {
                        ...values,
                        dates: schedule,
                        longitude: parseFloat(values.longitude),
                        latitude: parseFloat(values.latitude)
                    }
                    
                    //Call the context and reset form
                    setData(allData);
                    Toast.show("Solicitud enviada correctamente");
                    resetForm();

                    nav2Registration();
                }catch(error){
                    console.log(error);
                }
            }}
            validationSchema={registerSchema}
        >
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <View style={styles.screen}>
                        <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        enableAutomaticScroll = {true}
                        extraHeight = {10}
                        extraScrollHeight = {10}>
                        <View style = {styles.form}>
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
                                placeholder="Dirección"
                                leftIcon={<Icon type="font-awesome" name="map-marker"/>}
                                onChangeText={handleChange("address")}
                                errorMessage={errors.address && touched.address ? errors.address : ""}
                                value={values.address}
                            />

                            <Text style={styles.text}>Horario de Atención</Text> 
                            <View style={{width: screen.width*1, marginBottom: screen.height*.02}}>
                                {days.map((day, index) => <DatePicker key={index} day={day} setSchedule={setSchedule} schedule={schedule}/>)}
                            </View>

                            <Text style={styles.text}>Dirección</Text>
                            <Input
                                placeholder="Longitud"
                                leftIcon={<Icon type="font-awesome-5" name="map-marked"/>}
                                onChangeText={handleChange("longitude")}
                                errorMessage={errors.longitude && touched.longitude ? errors.longitude : ""}
                                value={values.longitude}
                            />
                            <Input
                                placeholder="Latitud"
                                leftIcon={<Icon type="font-awesome-5" name="map-marked-alt"/>}
                                onChangeText={handleChange("latitude")}
                                errorMessage={errors.latitude && touched.latitude ? errors.latitude : ""}
                                value={values.latitude}
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
                            <View style={{height: screen.height*.15, width: screen.width*1, flex: 1, justifyContent:"center", alignItems:"center"}}>
                                <Button
                                    onPress={handleSubmit}
                                    title="Registrarse"
                                    buttonStyle={{
                                        width:screen.width * .8,
                                        height:screen.height * 0.06,
                                        borderRadius: 5,
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
                                        width: screen.width * 0.6,
                                        fontSize:screen.fontScale * 24,
                                        fontWeight:"bold"
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material" color={"white"}/>}
                                    iconRight={true}
                                    disabled={!accept}
                                />
                            </View>
                        </View>
                        </KeyboardAwareScrollView>
                    </View>
                )
            }}
        </Formik>
    </>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:"center",
        width: screen.width*1,
        height: screen.height*1,
        backgroundColor: "white"
    },
    text:{
        fontWeight: 'bold',
        marginBottom: screen.height*.02,
        fontSize: screen.fontScale*20
    },
    form:{
        width: screen.width*1,
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center",
        padding: screen.width*.07
    }
})

export default RegisterCCForm
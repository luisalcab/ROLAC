import {useState, useContext, useEffect} from 'react'
import {View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Icon, Button} from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {CCContext} from "../../contexts/CCContext";
import DatePicker from '../../components/DatePicker';
import Toast from 'react-native-root-toast';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CCEdit = ({navigation}) => {
    const {setCCEditViewS, addEdit, CCUser, getCCData} = useContext(CCContext);
   
    //Set the schedule data
    const [schedule, setSchedule] = useState({
        Lunes:{open:"00:00", close:"00:00"},
        Martes:{open:"00:00", close:"00:00"},
        Miercoles:{open:"00:00", close:"00:00"},
        Jueves:{open:"00:00", close:"00:00"},
        Viernes:{open:"00:00", close:"00:00"},
        Sabado:{open:"00:00", close:"00:00"},
        Domingo:{open:"00:00", close:"00:00"}
    });
    const [data, setData] = useState(null);

    console.log("RENDER", data)

    useEffect(() => {
        const setUp = async() => {
            const d = await getCCData();
            setData(d);
            console.log("DATA", d.dates)
            await setSchedule(d.dates);
        }
        
        setUp();
    }, [])

    const nav2CCmenu = () => navigation.navigate("CCmenu");

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado", "Domingo"];

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
    {data ? (
        <Formik
            initialValues={{
                name: data.name,
                email: data.email,
                address: data.address,
                longitude: `${data.longitude}`,
                latitude: `${data.latitude}`
            }}
            onSubmit={async(values, {resetForm}) => {
                try{
                    //WrapUp all the values
                    const allData = {
                        ...values,
                        dates: schedule,
                        longitude: parseFloat(values.longitude),
                        latitude: parseFloat(values.latitude),
                        CCUser
                    }

                    console.log(allData)
                    
                    //Call the context and reset form
                    await addEdit(allData);
                    Toast.show("Solicitud Enviada",{position: Toast.positions.BOTTOM});
                    resetForm();

                    nav2CCmenu();
                }catch(error){
                    console.log(error, "EDIT");
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
                        <View style={styles.form}>
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
                                leftIcon={<Icon type="fontisto" name="direction-sign"/>}
                                onChangeText={handleChange("address")}
                                errorMessage={errors.address && touched.address ? errors.address : ""}
                                value={values.address}
                            />
                            <Text style={styles.text}>Horario de Atención</Text>
                            <View style={styles.days}>
                                {days.map((day, index) => <DatePicker key={index} day={day} setSchedule={setSchedule} schedule={schedule}/>)}
                            </View>
                            <Text style={styles.text}>Dirección</Text>
                            <Input
                                placeholder="Longitud"
                                leftIcon={<Icon type="material" name="mail"/>}
                                onChangeText={handleChange("longitude")}
                                errorMessage={errors.longitude && touched.longitude ? errors.longitude : ""}
                                value={values.longitude}
                            />
                            <Input
                                placeholder="Latitiud"
                                leftIcon={<Icon type="material" name="mail"/>}
                                onChangeText={handleChange("latitude")}
                                errorMessage={errors.latitude && touched.latitude ? errors.latitude : ""}
                                value={values.latitude}
                            />
                            <View style={styles.btnContainer}>
                                <Button
                                    onPress={handleSubmit}
                                    title="Mandar solicitud"
                                    buttonStyle={styles.btn}
                                    titleStyle={styles.title}
                                    icon={<Icon name="arrow-forward-ios" type="material" color="white"/>}
                                    iconRight={true}
                                />
                            </View>
                        </View>
                        </KeyboardAwareScrollView>
                    </View>
                )
            }}
        </Formik>) : (
            <View style={styles.screen}>
                <LottieView
                    source={require("../../animations/122764-circle-loading.json")}
                    autoPlay
                />
            </View>
        )}
        
    </>
  )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:"center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    ScrollView:{
        width:"100%",
        height:"100%"
    },
    text:{
        ontWeight: 'bold',
        marginTop: 10,
        fontSize: screen.fontScale*20,
        height: screen.height*.05,
    },
    form:{
        width: screen.width*1,
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center",
        padding: screen.width*.07
    },
    title:{
        color:"white",
        width:"80%",
        marginBottom:"1%",
        fontSize:screen.fontScale * 30
    },
    btn:{
        width:screen.width * .8,
        height:screen.height * 0.06,
        marginBottom: 100,
        borderRadius: 5,
        backgroundColor:"orange",
        padding: "1%",
        shadowColor: "#000",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 5
    },
    days:{
        width:"100%", 
        height:"40%", 
        marginBottom: "5%"
    },
    btnContainer:{
        height:"100%", 
        width:"100%", 
        flex:1, 
        justifyContent:"center", 
        alignItems:"center",
        borderRadius: 5
    }
})

export default CCEdit;
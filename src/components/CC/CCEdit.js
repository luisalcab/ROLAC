import {useState, useContext, useEffect} from 'react'
import {View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Icon, Button} from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {CCContext} from "../../contexts/CCContext";
import DatePicker from '../../components/DatePicker';
import BackButton from '../BackButton';

const CCEdit = ({navigation}) => {
    const {getCCData, setCCEditViewS} = useContext(CCContext);
   
    //Set the schedule data
    const [schedule, setSchedule] = useState(
        {
            Lunes:{open:"", close:""},
            Martes:{open:"", close:""},
            Miércoles:{open:"", close:""},
            Jueves:{open:"", close:""},
            Viernes:{open:"", close:""},
            Sabado:{open:"", close:""},
            Domingo:{open:"", close:""}
        });
    const [data, setData] = useState(null);

    useEffect(() => {
        const setUp = async() => {
            const d = await getCCData();
            setData(d);
            setSchedule(d.dates);
        }
        
        setUp();
    }, [])

    navigation.setOptions({
        title: "Editar Datos",
        headerBackVisible: false,
        headerLeft: () => (<BackButton onPress={() => setCCEditViewS(false)}/>)
    });

    const nav2Registration = () => navigation.navigate("RegisterDonor");

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
    {(data !== null) ? (
        <Formik
            initialValues={{
                name: data.name,
                email: data.email,
                address: data.address,
                longitude: data.longitude,
                latitude: data.latitude
            }}
            onSubmit={async(values, {resetForm}) => {
                try{
                    //WrapUp all the values
                    const allData = {
                        ...values,
                        dates: schedule
                    }
                    
                    //Call the context and reset form
                    await setData(allData);
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
                    <ScrollView style={{width:"100%",}}>
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

                        <View style={styles.days}>
                            <Text style={styles.text}>Horario de Atención</Text>
                            {days.map(day => <DatePicker day={day} setSchedule={setSchedule} schedule={schedule}/>)}
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
                                title="Registrarse"
                                buttonStyle={styles.btn}
                                titleStyle={styles.title}
                                icon={<Icon name="arrow-forward-ios" type="material"/>}
                                iconRight={true}
                            />
                        </View>
                    </ScrollView>
                )
            }}
        </Formik>) : (
            <Text>XDDDD</Text>
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
        height: "100%"
    },
    ScrollView:{
        width:"100%",
        height:"100%"
    },
    text:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom:"5%",
        marginLeft: 10
    },
    form:{
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    title:{
        color:"black",
        width:"80%",
        height:"100%",
        marginTop:"5%",
        marginBottom:"1%",
        fontSize:screen.fontScale * 30
    },
    btn:{
        width:screen.width * .8,
        height:screen.width * 0.2,
        borderRadius: 5,
        backgroundColor:"white",
        padding: "1%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    days:{
        width:"100%", 
        height:"40%", 
        marginBottom:"15%"
    },
    btnContainer:{
        height:"100%", 
        width:"100%", 
        flex:1, 
        justifyContent:"center", 
        alignItems:"center"
    }
})

export default CCEdit;
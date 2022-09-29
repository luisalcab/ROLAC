import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Switch, StyleSheet, LogBox } from 'react-native';
import {Icon} from '@rneui/themed';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import * as Yup from 'yup'
import openGallery from './OpenGallery';
import uploadImage from './UploadImage';
import uploadData from './UploadData';
import { RefresherContext } from '../Contexts/RefresherContext';

const CreateProductForm = ({navigation}) => {

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [values, setValues] = useState(null);
    const [switchOnActive, setSwitchOnActive] = useState(false);
    const [switchOnUrgent, setSwitchOnUrgent] = useState(false);
    const {refresh, setRefresh} = useContext(RefresherContext);

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        if (imageURL != null) {
            uploadData({values, imageURL});
            setImageURL(null);
            setValues(null);
            setRefresh(true);
            navigation.navigate("Administración de productos", {navigation: navigation})
        }
    }, [imageURL && values]);

    const productSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre requerido").
            matches(/[A-Za-z]/, "Solo letras"),
        cost:Yup.
            number().
            required("Costo requerido").
            positive("Costo debe ser positivo"),
        unit:Yup.
            string().
            required("Unidad requerida").
            matches(/[A-Za-z]/, "Solo letras"),
        urgent:Yup.
            boolean().
            required("Urgente requerido"),
        active:Yup.
            boolean().
            required("Activo requerido"),
    })

    return (
        <Formik
            initialValues={{
                name: "",
                cost: 0,
                urgent: false,
                active: false,
                unit: "",
            }}
            onSubmit={async (values, {resetForm}) => {
                if(image == null){
                    setImageURL("https://www.freeiconspng.com/uploads/no-image-icon-15.png");
                    setValues(values);
                } else {
                    await uploadImage(image, setImageURL, values.name).then(() => {
                        setValues(values);
                        resetForm();
                    },
                    (error) => {
                        console.log(error);
                    });
                }
            }}
            validationSchema={productSchema}
        >
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <>
                        <View style = {styles.box1}>
                            <TouchableOpacity onPress={()=>openGallery(setImage)} style = {styles.picTouch}>
                                <ImageBackground source={{ uri: image }} style={styles.pic}>
                                    <Icon name="edit" type="feather" color="white" size={50} marginTop = "30%"/>
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style = {styles.nameIn}>
                                <Text style = {styles.textInfo}>Nombre:</Text>
                                <Input placeholder="Nombre producto" 
                                errorMessage={errors.name && touched.name ? errors.name : ""}
                                onChangeText = {handleChange("name")}
                                returnKeyType="done"/>
                            </View>
                        </View>
                        <View style = {styles.box2}>
                            <Text style = {styles.textInfo}>Activo:</Text>
                            <Switch onValueChange={(value) => {values.active = value; setSwitchOnActive(value)}} value={switchOnActive}/>
                            <Text style = {styles.textInfo}>Prioridad:</Text>
                            <Switch onValueChange={(value) => {values.urgent = value; setSwitchOnUrgent(value)}} value={switchOnUrgent}/>
                        </View>
                        <View style = {styles.box3}>
                            <Text style = {styles.textInfo}>Unidades:</Text>
                            <Input placeholder="Unidades (kg, l, u...)"
                            onChangeText = {handleChange("unit")}
                            errorMessage={errors.unit && touched.unit ? errors.unit : ""}
                            returnKeyType="done"/>
                            <Text style = {styles.textInfo}>Costo:</Text>
                            <Input placeholder="Precio simbolico"
                            onChangeText = {handleChange("cost")}
                            errorMessage={errors.cost && touched.cost ? errors.cost : ""}
                            keyboardType = "numeric"/>
                        </View>
                        <View style = {styles.box4}>
                            <TouchableOpacity onPress={handleSubmit} style = {styles.button1}>
                                <Text style = {styles.textB}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=> {navigation.navigate("Administración de productos", {navigation: navigation})
                            setRefresh(true);}} 
                            style = {styles.button2}>
                                <Text style = {styles.textB}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }}
        </Formik>
    )
}

const styles = StyleSheet.create({
    picTouch:{
        width: 150,
        height: 150,
        borderRadius: 10, 
        marginTop: 10,
    },
    pic:{
        width: 150,
        height: 150,
        marginHorizontal:"5%",
        backgroundColor: "gray",
        borderRadius: 10, 
        absolute: "left"
    },
    button1:{
        alignSelf: "center",
        backgroundColor: "black",
        width: "50%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center"
    },
    button2:{
        alignSelf: "center",
        backgroundColor: "gray",
        width: "50%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center"
    },
    textB:{
        color: "white",
        textAlign: "center",
        fontSize: 20
    },
    nameIn:{
        width: "50%",
        height: 40,
        marginHorizontal: "5%",
        marginTop: "12%",
    },
    box1:{
        flexDirection: "row",
        justifyContent: "space-around",
    },
    box2:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "8%"
    },
    box3:{
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: "8%"
    },
    box4:{
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: "8%"
    },
    textInfo:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginHorizontal: "3%",
    }
});

export default CreateProductForm
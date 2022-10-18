import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Switch, StyleSheet, LogBox, Dimensions } from 'react-native';
import {Icon} from '@rneui/themed';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import * as Yup from 'yup'
import openGallery from './OpenGallery';
import uploadImage from './UploadImage';
import { RefresherContext } from '../contexts/RefresherContext';
import { ProductInfoContext } from '../contexts/ProductInfoContext';
import updateData from './UpdateProduct';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';


const CreateProductForm = ({navigation}) => {

    const {productInfo, setProductInfo} = useContext(ProductInfoContext);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [values, setValues] = useState(null);
    const [switchOnActive, setSwitchOnActive] = useState(productInfo.values.active);
    const [switchOnUrgent, setSwitchOnUrgent] = useState(productInfo.values.urgent);
    const [loading, isLoading] = useState(false);
    const {refresh, setRefresh} = useContext(RefresherContext);

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        if (imageURL != null) {
            updateData({values, imageURL}, productInfo.id);
            setImageURL(null);
            setValues(null);
            setRefresh(true);
            isLoading(false);
            navigation.navigate("Administración de productos", {navigation: navigation})
        }
    }, [imageURL && values]);

    const productSchema = Yup.object().shape({
        name:Yup.
            string().
            matches(/[A-Za-z]/, "Solo letras"),
        cost:Yup.
            number().
            positive("Costo debe ser positivo"),
        unit:Yup.
            string().
            matches(/[A-Za-z]/, "Solo letras")
    })

    return (
        <Formik
            initialValues={{
                name: productInfo.values.name,
                cost: productInfo.values.cost,
                urgent: productInfo.values.urgent,
                active: productInfo.values.active,
                unit: productInfo.values.unit,
            }}
            onSubmit={async (values, {resetForm}) => {
                isLoading(true);
                if (image === null) {
                    setImageURL(productInfo.imageURL);
                    setValues(values);
                    resetForm();
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
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                <Spinner
                    visible={loading === true}
                    textContent={'Cargando...'}
                    textStyle={{color: '#FFF'}}
                />
                <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll = {true}
                >
                    <View style = {styles.box1}>
                        <TouchableOpacity onPress={()=>openGallery(setImage)} style = {styles.picTouch}>
                            {image == null ? (
                                <ImageBackground source={{uri: productInfo.imageURL}} style = {styles.pic}>
                                    <Icon name="edit" type="feather" color="white" size={50} marginTop = "30%"/>
                                </ImageBackground>
                            ) : (
                                <ImageBackground source={{ uri: image }} style={styles.pic}>
                                    <Icon name="edit" type="feather" color="white" size={50} marginTop = "30%"/>
                                </ImageBackground>
                            )}
                        </TouchableOpacity>
                        <View style = {styles.nameIn}>
                            <Text style = {styles.textInfo}>Nombre:</Text>
                            <Input placeholder={productInfo.values.name} 
                            errorMessage={errors.name && touched.name ? errors.name : ""}
                            onChangeText = {handleChange("name")}
                            returnKeyType="done"/>
                        </View>
                    </View>
                    <View style = {styles.box2}>
                        <Text style = {styles.textInfoSw}>Activo:</Text>
                        <Switch onValueChange={(value) => {values.active = value; setSwitchOnActive(value)}} value={switchOnActive}
                        ios_backgroundColor="gray"/>
                        <Text style = {styles.textInfoSw}>Prioridad:</Text>
                        <Switch onValueChange={(value) => {values.urgent = value; setSwitchOnUrgent(value)}} value={switchOnUrgent}
                        ios_backgroundColor="gray" trackColor={{false: "gray", true: "red"}}/>
                    </View>
                    <View style = {styles.box3}>
                        <Text style = {styles.textInfo}>Unidades:</Text>
                        <Input placeholder={productInfo.values.unit}
                        onChangeText = {handleChange("unit")}
                        errorMessage={errors.unit && touched.unit ? errors.unit : ""}
                        returnKeyType="done"/>
                        <Text style = {styles.textInfo}>Costo:</Text>
                        <Input placeholder={productInfo.values.cost}
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
                </KeyboardAwareScrollView>
                </>
            )}
        </Formik>
    )
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    picTouch:{
        width: screen.width * 0.3,
        height: screen.width * 0.35,
        borderRadius: 10, 
        marginTop: screen.width * 0.04,
    },
    pic:{
        width: screen.width * 0.35,
        height: screen.width * 0.35,
        marginHorizontal: screen.width * 0.02,
        backgroundColor: "#C7C7C7",
        borderRadius: 10, 
        absolute: "left"
    },
    button1:{
        alignSelf: "center",
        backgroundColor: "red",
        width: screen.width*0.6,
        height: screen.height*0.05,
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: screen.height * 0.01
    },
    button2:{
        alignSelf: "center",
        backgroundColor: "orange",
        width: screen.width*0.6,
        height: screen.height*0.05,
        borderRadius: 10,
        justifyContent: "center"
    },
    textB:{
        color: "white",
        textAlign: "center",
        fontSize: screen.fontScale * 20,
        fontWeight: "bold"
    },
    nameIn:{
        width: screen.width * 0.5,
        height: screen.height * 0.05,
        marginHorizontal: screen.width * 0.03,
        marginTop: "12%",
    },
    box1:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: screen.height * 0.01
    },
    box2:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: screen.height * 0.05,
        paddingHorizontal: screen.width * 0.04
    },
    box3:{
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: screen.height * 0.05,
        paddingHorizontal: screen.width * 0.04
    },
    box4:{
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: screen.height * 0.04
    },
    textInfo:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginHorizontal: screen.width * 0.02,
    },
    textInfoSw:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    }
});

export default CreateProductForm

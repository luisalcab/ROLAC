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
import { ProductInfoContext } from '../Contexts/ProductInfoContext';


const CreateProductForm = ({navigation}) => {

    const {productInfo, setProductInfo} = useContext(ProductInfoContext);
    const [image, setImage] = useState(productInfo.imageURL);
    const [imageURL, setImageURL] = useState(null);
    const [values, setValues] = useState(null);
    const [switchOnActive, setSwitchOnActive] = useState(productInfo.values.active);
    const [switchOnUrgent, setSwitchOnUrgent] = useState(productInfo.values.urgent);
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
        cost:Yup.
            number().
            positive("Costo debe ser positivo"),
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
                if (imageURL == null) {
                    setImageURL(productInfo.values.imageURL);
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
            {({ handleChange, handleSubmit, values, errors }) => (
                <>
                    <View style = {styles.box1}>
                        <TouchableOpacity onPress={()=>openGallery(setImage)} style = {styles.picTouch}>
                            <ImageBackground source={{ uri: image }} style={styles.pic}>
                                <Icon name="edit" type="feather" color="white" size={50} marginTop = "30%"/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style = {styles.nameIn}>
                            <Text style = {styles.textInfo}>Nombre:</Text>
                            <Input placeholder={productInfo.values.name} 
                            errorMessage={errors.name && touched.name ? errors.name : ""}
                            onChangeText = {handleChange("name")}
                            returnKeyType="done"/>
                        </View>
                    </View>
                </>
            )}
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

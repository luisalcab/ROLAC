import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Icon} from '@rneui/themed';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import * as Yup from 'yup'
import {storage} from '../Contexts/FBConnection';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

const openGallery = async (setImage) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        
        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
        }
    }
}

const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/')+1);
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, 
    (error) => {
        console.log(error);
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
        });
    });
}

const CreateProductForm = () => {

    const [image, setImage] = useState(null);

    const productSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre requerido"),
        cost:Yup.
            number().
            required("Costo requerido").
            positive("Costo debe ser positivo")
            
    })

    return (
        <Formik
            initialValues={{
                name: "",
                cost: 0,
                urgent: false,
                active: false,
                unit: "",
                image: null
            }}
            onSubmit={(values, {resetForm}) => {
                uploadImage(image).then(() => {
                    console.log("Image uploaded");
                }).catch((error) => {
                    console.log(error);
                });
                console.log(values)
                resetForm();
            }}
            validationSchema={productSchema}
        >
            {({errors, touched, handleChange, handleSubmit}) => {
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
                                <Input placeholder="Nombre"
                                errorMessage={errors.name && touched.name ? errors.name : ""}
                                onChangeText = {handleChange("name")}/>
                            </View>
                        </View>
                        <View style = {styles.box2}>
                            <Text style = {styles.textInfo}>Costo:</Text>
                            <Input placeholder="Costo"
                            onChangeText = {handleChange("cost")}
                            errorMessage={errors.cost && touched.cost ? errors.cost : ""}
                            keyboardType = "numeric"
                            style = {styles.costIn}/>
                        </View>
                        <View style = {styles.box3}>
                            <TouchableOpacity onPress={handleSubmit} style = {styles.button1}>
                                <Text style = {styles.textB}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>console.log("Hola")} style = {styles.button2}>
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
        marginTop:"10%",
        borderRadius: 10
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
        marginTop: "20%"
    },
    box1:{
        flexDirection: "row",
        flex: 0.4,
        justifyContent: "space-around"
    },
    box2:{
        flexDirection: "column",
        justifyContent: "space-around",
        flex: 0.2
    },
    box3:{
        flexDirection: "column",
        justifyContent: "space-around"
    },
    textInfo:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginHorizontal: "3%"
    },
    costIn: {
        width: "50%"
    }
});

export default CreateProductForm
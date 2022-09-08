import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Icon} from '@rneui/themed';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';

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

const CreateProduct = () => {

    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [cost, setPrice] = useState(null);
    const [urgent, setUrgent] = useState(null);
    const [active, setActive] = useState(null);
    const [unit, setUnit] = useState(null);

    return (
        <Formik>
            <View style = {styles.screen}>
                <Text style = {styles.title}>Producto</Text>
                <>
                <TouchableOpacity onPress={()=>openGallery(setImage)} style = {styles.picTouch}>
                    <ImageBackground source={{ uri: image }} style={styles.pic}>
                        <Icon name="edit" type="feather" color="white" size={50} marginTop = "30%"/>
                    </ImageBackground>
                </TouchableOpacity>
                <Input placeholder="Nombre" style = {styles.nameIn}/>
                </>
                <>
                <TouchableOpacity onPress={()=>console.log("Hola")} style = {styles.button1}>
                    <Text style = {styles.text}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>console.log("Hola")} style = {styles.button2}>
                    <Text style = {styles.text}>Cancelar</Text>
                </TouchableOpacity>
                </>
            </View>
        </Formik>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    picTouch:{
        width: 150,
        height: 150,
        marginTop:"10%",
        borderRadius: 10
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10
    },
    pic:{
        width: 150,
        height: 150,
        marginHorizontal:"5%",
        marginTop:"10%",
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
    text:{
        color: "white",
        textAlign: "center",
        fontSize: 20
    },
    nameIn:{
        width: "100%",
    },
});

export default CreateProduct
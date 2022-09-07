import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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

    return (
        <View style = {styles.screen}>
            <Text style = {styles.title}>Producto</Text>
            <>
            <TouchableOpacity onPress={()=>openGallery(setImage)}>
                <>
                <ImageBackground source={{ uri: image }} style={styles.pic1}>
                    <Image source={require('../img/editing.png')} style={styles.pic2} />
                </ImageBackground>
                </>
            </TouchableOpacity>

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
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10
    },
    pic1:{
        width: 150,
        height: 150,
        marginHorizontal:"5%",
        marginTop:"10%",
        backgroundColor: "gray",
        borderRadius: 10, 
        absolute: "left"
    },
    pic2:{
        width: 50,
        height: 50,
        alignSelf: "center",
        marginTop: "30%",
        backgroundColor: "gray"
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
    }
});

export default CreateProduct
import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet} from 'react-native';
import CreateProductForm from '../components/CreateProductForm';

const CreateProduct = () => {
    return (
        <View style = {styles.screen}>
        <Text style = {styles.title}>Producto</Text>
        <CreateProductForm/>
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
        marginVertical: 10,
        marginBottom: -10
    }
});

export default CreateProduct
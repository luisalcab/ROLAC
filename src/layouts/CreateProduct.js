import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { StyleSheet} from 'react-native';
import CreateProductForm from '../components/CreateProductForm';

const CreateProduct = () => {
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <View style = {styles.screen}>
                <View style = {styles.banner}>
                    <Text style = {styles.title}>Producto</Text>
                </View>
                <View>
                    <ScrollView>
                        <CreateProductForm/>
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        textAlign: "center"
    },
    banner:{
        backgroundColor: "white",
        width: "100%",
        height: 40,
        justifyContent: "center"
    }, 
    container:{
        flex: 2,
    }
});

export default CreateProduct
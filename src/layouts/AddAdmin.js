import React, {useState} from "react"
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

const AddAdmin = ({navigation}) => {
    const [info, setInfo] = useState({
        name :"Oscar",
        email :"oscar@gmail.com",
        lastName :"Valdés"
    });

    /* const nav2Cart = () => {
        navigation.navigate("Cart");
    } */

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Añadir Admin</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Nombre</Text>
                    <View style={[styles.fieldValueBox, {backgroundColor: "rgb(220, 220, 220)"}]}>
                        <TextInput style={styles.fieldValue} defaultValue={info.name}></TextInput>
                    </View>
                </View>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Apellido</Text>
                    <View style={[styles.fieldValueBox, {backgroundColor: "rgb(220, 220, 220)"}]}>
                        <TextInput style={styles.fieldValue} defaultValue={info.lastName}></TextInput>
                    </View>
                </View>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Correo</Text>
                    <View style={[styles.fieldValueBox, {backgroundColor: "rgb(220, 220, 220)"}]}>
                        <TextInput style={styles.fieldValue} defaultValue={info.email}></TextInput>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: "rgb(96, 218, 104)"}]}>
                        <Text style={styles.buttonLabel}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: "rgb(255, 93, 93)"}]}>
                        <Text style={styles.buttonLabel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

styles = StyleSheet.create({
    container: { // Whole layout
        flex: 1
    },
    header: { // Header section with back button, title and filter
        height: "6%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(251, 249, 250)"
    },
    title: { // Title text
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "rgb(224, 31, 81)"
    },
    body: {
        width: "100%",
        flex: 1
    },
    fieldBox: {
        width: "100%",
        marginTop: 10
    },
    fieldLabel: {
        width: "100%",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 20,
        marginBottom: 3
    },
    fieldValueBox: {
        marginHorizontal: 10,
        backgroundColor: "rgb(200, 200, 200)",
        paddingLeft: 10,
        borderRadius: 15,
        height: 25,
        justifyContent: "center"
    },
    fieldValue: {
        width: "100%",
        fontSize: 16,
        fontWeight: "500",
        color: "rgb(97, 88, 88)",
    },
    footer: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        backgroundColor: "rgb(251, 249, 250)"
    },
    buttonGroup: {
        flexDirection: "row"
    },
    button: { // Proceed button
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 6,
        borderColor: "rgb(220, 220, 220)",
        borderWidth: 2,
        backgroundColor: "oldlace"
    },
    buttonLabel: { // Button text label
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(255, 255, 255)",
    }
});

export default AddAdmin;
import React, {useContext, useEffect} from "react"
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native'
import {CartContext} from "../contexts/CartContext"
import QRCode from "react-native-qrcode-svg"
import { UserInformation } from "../contexts/userInformation"

const QRGenerator = ({navigation}) => {
    const {userInformation} = useContext(UserInformation);

    const returnToMenu = () => {
        navigation.navigate('HomePageDonor', {navigation: navigation})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Código QR</Text>
            </View>
            <View style={styles.qrContainer}>
                <QRCode value={userInformation.id} size={300}/>
            </View>
            <View style={styles.button}>
                <Button
                    onPress={returnToMenu} 
                    color="#E74C3C" 
                    title="Regresar"
                />
            </View>
        </View>
    );
}


styles = StyleSheet.create({
    container: { // Whole layout
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
    },
    header: { // Header section with back button, title and filter
        justifyContent: "center",
        paddingBottom: 10,
        height: "10%",
        justifyContent: "center",
        marginTop: 50,
    },
    title: { // Title text
        textAlign: "center",
        fontSize: 30,
        fontWeight: "700",
        color: "rgb(224, 31, 81)",
    },
    qrContainer: { // Container of QR
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "75%"
    },
    footer: { // Footer with button
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        backgroundColor: "rgb(251, 249, 250)"
    },
    button: { // Proceed button
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 6,
        borderColor: "rgb(224, 174, 31)",
        borderWidth: 2,
        backgroundColor: "oldlace"
    },
    buttonLabel: { // Button text label
        fontSize: 20,
        fontWeight: "bold",
        color: "orange",
    }
});

export default QRGenerator;
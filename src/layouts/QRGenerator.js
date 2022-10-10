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
                <Text style={styles.title}>Código de Pedido</Text>
            </View>
            <View style={styles.qrContainer}>
                <QRCode value={userInformation.uid} size={200}/>
            </View>
            <View style={styles.button}>
                <Button
                    onPress={returnToMenu} 
                    color="#E74C3C" 
                    title="Regrsar"/>
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
        justifyContent: "center",
        paddingBottom: 10,
        backgroundColor: "rgb(251, 249, 250)"
    },
    title: { // Title text
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "rgb(224, 31, 81)"
    },
    qrContainer: { // Container of QR
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
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
        color: "rgb(224, 174, 31)",
    }
});

export default QRGenerator;
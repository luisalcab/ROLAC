import React, {useContext} from "react"
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {CartContext} from "../contexts/CartContext"
import QRCode from "react-native-qrcode-svg"

const QRGenerator = () => {
    const {cart} = useContext(CartContext);

    let message = [];

    cart.forEach(item => {
        message.push({name: item.name, count: item.count});
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Código de Pedido</Text>
            </View>
            <View style={styles.qrContainer}>
                <QRCode value={JSON.stringify(message)} size={200}/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonLabel}>Volver al carrito</Text>
                </TouchableOpacity>
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
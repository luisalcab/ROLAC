import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, Modal} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import ScannerCart from '../components/ScannerCart';

const QRScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [transferData, setTransferData] = useState("");

    const askForCameraPermission = async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == "granted");
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleScan = ({_, data}) => {
        setTransferData(data);
        setScanned(true);
        console.log("uid: " + data);
    }

    if (hasPermission === false) {
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Esta función requiere permiso para acceder a la cámara</Text>
                <TouchableOpacity onPress={() => askForCameraPermission()}>
                    <Text>Otorgar permiso</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (hasPermission === null) {
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Solicitando permiso para acceder a la cámara</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Carrito</Text>
                </View>
                <View style={styles.qrContainer}>
                    <BarCodeScanner 
                        onBarCodeScanned={(scanned ? undefined: handleScan)}
                        style={{width:"100%", height:"100%"}}   
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLabel}>Volver al carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.modalView}>
                <Modal
                    animationType="slide"
                    visible={scanned}
                >
                    <ScannerCart id={transferData}/>
                </Modal>
            </View>
        </View>
    );
}


styles = StyleSheet.create({
    container: { // Whole layout
        flex: 1
    },
    mainView:{

    },
    modalView: {
        
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

export default QRScanner;
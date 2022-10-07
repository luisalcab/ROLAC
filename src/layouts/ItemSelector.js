import React, {useContext} from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Item from "../components/Item";
import {ProductContext} from "../contexts/ProductContext";
import {CartContext} from "../contexts/CartContext";
import firebaseConnection from "../contexts/FBConnection";
import {doc, updateDoc} from "firebase/firestore";
import {UserInformation} from "../contexts/userInformation";

const ItemSelector = ({navigation, route}) => {
    
    const docsData = useContext(ProductContext);
    const {userInformation} = useContext(UserInformation);
    
    const {cart} = useContext(CartContext);

    const saveCartFB = () => {
        const query = doc(firebaseConnection.db, "donor", userInformation.uid);
        updateDoc(query, {cart})
        .then(() => alert("Tus cambios han sido guardados")).then(() => nav2Qr())
    }

    const nav2Cart = () => {
        if(cart[0]==undefined){
            alert("Necesitas agregar al menos un producto para poder continuar")
        } else {
            let sum = 0;
            cart.map(item => {sum += item.count * item.cost});
            if(sum >= 10){
                navigation.navigate("Cart");
            } else {
                alert("El monto minimo a donar es: $10.00")
            }
        }
    }

    const nav2Qr = () => {
        if(cart[0]==undefined){
            alert("Necesitas agregar al menos un producto para poder continuar")
        } else {
            navigation.navigate("QRGenerator");
        }
    }
    
    const renderItem = ({item}) => (
        <Item
            id={item.id}
            name={item.data.values.name}
            source={item.data.imageURL}
            unit={item.data.values.unit}
            cost={item.data.values.cost}
            urgent={item.data.values.urgent}
            kind={route.params.kind}
        />
    );

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{"Donación " + (route.params.kind ? "en especie" : "monetaria")}</Text>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={docsData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    /> 
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={(route.params.kind ? saveCartFB : nav2Cart)}>
                    <Text style={styles.buttonLabel}>{route.params.kind ? "Entregar" : "Carrito"}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

styles = StyleSheet.create({
    container: { // Whole layout
        flex: 1
    },
    header: { // Header section with back button, title and filter
        height: "5%",
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
    listContainer: { // Container of flat-list
        flex: 1,
        width: "100%"
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

export default ItemSelector;
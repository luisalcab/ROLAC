import React, {useContext} from "react"
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Item from "../components/Item"
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ItemSelector = ({navigation}) => {
    
    const docsData = useContext(ProductContext);
    
    const {cart} = useContext(CartContext);

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
    
    const renderItem = ({item}) => (
        <Item
            id={item.id}
            name={item.data.values.name}
            source={item.data.imageURL}
            unit={item.data.values.unit}
            cost={item.data.values.cost}
        />
    );

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Donación en especie</Text>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={docsData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    /> 
                </View>
            </View>
            <View style={{
                        height: "10%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: 10,
                        backgroundColor: "rgb(251, 249, 250)"
            }}>
                <TouchableOpacity style={styles.button} onPress={nav2Cart}>
                    <Text style={styles.buttonLabel}>Carrito</Text>
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
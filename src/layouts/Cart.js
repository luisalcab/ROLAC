import React, { useEffect, useState} from "react"
import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native'

const Cart = (data) => {
    let [cart, setCart] = useState(data)

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id != id))
    }

    const renderItem = ({id, name, cost, count}) => (
        <CartItem
            id={id}
            name={name}
            cost={cost}
            count={count}
            removeItem={removeItem}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Carrito</Text>
            </View>
            <View style={styles.tableHeaders}>
                <Text style={styles.columnTitle}>UDS</Text>
                <Text style={styles.columnTitle}>NOMBRE</Text>
                <Text style={styles.columnTitle}>PRECIO</Text>
                <Text style={styles.columnTitle}>SUBT</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonLabel}>Pagar</Text>
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
    listContainer: { // Container of flat-list
        flex: 1,
        width: "100%"
    },
    tableHeaders: {
        flexDirection: "row",
        marginBottom: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2
    },
    columnTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(97, 88, 88)",
    },
    list: { // Item list
        alignItems: "stretch"
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

export default Cart;
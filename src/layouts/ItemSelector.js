import React, { useEffect, useState} from "react"
import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Item from "../components/Item"

const DATA = [
    {id: 1, name: 'Pan', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 2, name: 'Leche', source: require("../img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 3, name: 'Huevo', source: require("../img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 4, name: 'Jamón', source: require("../img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 5, name: 'Atún', source: require("../img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 6, name: 'Frijol', source: require("../img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 7, name: 'Arroz', source: require("../img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 8, name: 'Manzana', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 9, name: 'Aguacate', source: require("../img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 10, name: 'Cebolla', source: require("../img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
    {id: 11, name: 'Pan', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 12, name: 'Leche', source: require("../img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 13, name: 'Huevo', source: require("../img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 14, name: 'Jamón', source: require("../img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 15, name: 'Atún', source: require("../img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 16, name: 'Frijol', source: require("../img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 17, name: 'Arroz', source: require("../img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 18, name: 'Manzana', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 19, name: 'Aguacate', source: require("../img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 20, name: 'Cebolla', source: require("../img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
    {id: 21, name: 'Pan', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 22, name: 'Leche', source: require("../img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 23, name: 'Huevo', source: require("../img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 24, name: 'Jamón', source: require("../img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 25, name: 'Atún', source: require("../img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 26, name: 'Frijol', source: require("../img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 27, name: 'Arroz', source: require("../img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 28, name: 'Manzana', source: require("../img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 29, name: 'Aguacate', source: require("../img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 30, name: 'Cebolla', source: require("../img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
]

const ItemSelector = ({navigation}) => {
    let [items, setItems] = useState(DATA);
    let [cart, setCart] = useState([]);

    const updateCart = (id, quantity) => {
        let filtered = cart.filter(item => item.id !== id);
        let updatedCart = quantity === 0 ? filtered : [...filtered, {id, quantity}];
        setCart(updatedCart);
    }

    const renderItem = ({item}) => (
        <Item
            id={item.id}
            name={item.name}
            source={item.source}
            unit={item.unit}
            rank={item.rank}
            cost={item.cost}
            count={cart.find(i => i.id === item.id) ? cart.find(i => i.id === item.id).quantity : 0}
            updateCart={updateCart}
        />
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Donación en especie</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonLabel}>Carrito</Text>
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
})

export default ItemSelector;
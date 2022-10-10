import React, {useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { ItemsContext } from "../contexts/ItemsContext";
import firebaseConnection from "../contexts/FBConnection";
import {getDoc, doc} from "firebase/firestore";

const ScannerCart = ({id}) => {
    const [cart, setCart] = useState([]);

    const consultCart = () => {
        const query = doc(firebaseConnection.db, "donor", id);
        getDoc(query)
            .then((snapshot) => {
                setCart(snapshot.data().cart);
                snapshot.data().cart.forEach((item, i) => console.log("cart[" + i + "]: ", item));
            })
    }

    useEffect(() => {
        console.log("My id is: ", id);
        consultCart();
    }, []);

    const renderItem = (item) => (
        <View style={styles.itesmBox}>
            <Text style={[styles.label, styles.counter]}>{item.count}</Text>
            <Text style={[styles.label, styles.name]}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Carrito</Text>
            </View>
            <View style={styles.tableHeaders}>
                <Text style={[styles.columnTitle, {marginRight: 120}]}>CANT</Text>
                <Text style={[styles.columnTitle, {flex: 1}]}>NOMBRE</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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
    tableHeaders: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2
    },
    columnTitle: {
        fontSize: 18,
        marginHorizontal: 10,
        fontWeight: "bold",
        color: "rgb(97, 88, 88)",
    },
    listContainer: { // Container of flat-list
        flex: 1,
        width: "100%"
    },
// ITEM
    itesmBox: { // Whole component
        flex: 1,
        flexDirection: "row",
        alignItems: "baseline",
        padding: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2
    },
    label: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    },
    counter: {
        width: 30
    },
    name: { // Title text
        flex: 1,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    },
});

export default ScannerCart;
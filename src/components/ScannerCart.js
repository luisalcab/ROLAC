import React, {useContext, useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ItemsContext} from "../contexts/ItemsContext";
import firebaseConnection from "../contexts/FBConnection";
import {updateDoc, addDoc, getDoc, doc, collection} from "firebase/firestore";
import moment from "moment";
import {UserInformation} from "../contexts/userInformation";
import { CCContext } from "../contexts/CCContext";

const ScannerCart = ({id, setModalVisible}) => {
    const [cart, setCart] = useState([]);
    const {CCUser} = useContext(CCContext);

    const consultCart = () => {
        const query = doc(firebaseConnection.db, "donor", id);
        getDoc(query)
            .then((snapshot) => {
                setCart(snapshot.data().cart);
            })
    }

    useEffect(() => {
        consultCart();
    }, []);

    const handleAproval = () => {
        const items = cart.map(item => ({count: item.count, id: item.id, name: item.name}))
        const coll = collection(firebaseConnection.db, "donations_in_kind");
        console.log("user inf: ", CCUser);
        const donation = {items, dateTime: moment().format(), donor: id, donationCenter: CCUser, collected: 0}
        console.log(donation);
        addDoc(coll, donation);

        const query = doc(firebaseConnection.db, "donor", id);
        updateDoc(query, {cart: []});
        setModalVisible(false);
    }

    const renderItem = ({item}) => (
        <View style={styles.itemBox}>
            <Text style={[styles.label, styles.counter]}>{item.count}</Text>
            <Text style={[styles.label, styles.name]}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
        {cart.length != 0 &&
            <>
                <View style={styles.header}>
                    <Text style={styles.title}>Pedido</Text>
                </View>
                <View style={styles.tableHeaders}>
                    <Text style={[styles.columnTitle, { marginRight: 20 }]}>CANT</Text>
                    <Text style={[styles.columnTitle, { flex: 1 }]}>NOMBRE</Text>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.id} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "rgb(255, 93, 93)" }]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonLabel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "rgb(96, 218, 104)" }]} onPress={() => handleAproval()}>
                        <Text style={styles.buttonLabel}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </> || <>
            <Text style={styles.buttonLabel}>El carrito esta vacio</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: "rgb(255, 93, 93)" }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonLabel}>Volver</Text>
            </TouchableOpacity></>
        }
        </View>


    );
}


const styles = StyleSheet.create({
    container: { // Whole layout
        height: "80%",
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(251, 249, 250)",
        borderRadius: 40
    },
    header: { // Header section with back button, title and filter
        height: "6%",
        justifyContent: "center",
        paddingVertical: 10,
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
    footer: { // Footer with button
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: 10,
        backgroundColor: "rgb(251, 249, 250)",
        borderRadius: 40
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
    },
// ITEM
    itemBox: { // Whole component
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
        width: 30,
        paddingRight: 50
    },
    name: { // Title text
        flex: 1,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    }
});

export default ScannerCart;
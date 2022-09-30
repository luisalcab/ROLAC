import React, {useContext} from "react"
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {CartContext} from "../contexts/CartContext"
import CartItem from "../components/CartItem"
import { StripeProvider } from '@stripe/stripe-react-native';
import {publishableKey} from '../../utils/enviromentVariables';
import PaymentScreen from "../components/stripe/PaymentScreen";

const Cart = ({navigation}) => {
    const {cart} = useContext(CartContext);
    const nav2QR = () => {
        navigation.navigate("QRGenerator");
    }

    const renderItem = ({item}) => (
        <CartItem
            id={item.id}
            name={item.name}
            cost={item.cost}
            count={item.count}
        />
    );

    const grandTotal = () => {
        let sum = 0;
        cart.map(item => {sum += item.count * item.cost});
        return sum;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Carrito</Text>
            </View>
            <View style={styles.tableHeaders}>
                <Text style={styles.columnTitle}>UDS</Text>
                <Text style={[styles.columnTitle, {flex: 1}]}>NOMBRE</Text>
                <Text style={[styles.columnTitle, {marginRight: 120}]}>SUBT</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={cart}
                />
                <View style={styles.totalBox}>
                    <Text style={styles.total}>{"TOTAL: " + (Math.round(grandTotal() * 100)/ 100).toFixed(2)}</Text>
                </View>
                <StripeProvider
                    publishableKey="pk_test_51LkUu8L3fb2NBnm32ovLcCuet2FDgfprjfA1lAaL0cqZ8SdJHzS1v7erGYck9PWWpY43cfquaZAJUudpNihX0bqu00WVCmQvro">
                    <PaymentScreen grandTotal = { grandTotal() } navigation = { navigation }/>
                </StripeProvider>
            </View>
            {/* <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => nav2QR()}>
                    <Text style={styles.buttonLabel}>Pagar</Text>
                </TouchableOpacity>
            </View> */}
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
    totalBox: {
        paddingVertical: 10,
        alignItems: "center",
        borderTopColor: "rgb(97, 88, 88)",
        borderBottomColor: "rgb(97, 88, 88)",
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(97, 88, 88)",
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
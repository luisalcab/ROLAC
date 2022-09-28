import {useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from "react-native"
import {CartContext} from "../contexts/CartContext";

const CartItem = ({id, name, cost, count}) => {
    const {cart, setCart} = useContext(CartContext);

    const removeItem = () => {
        setCart(cart.filter(item => item.id != id));
    }

    return(
        <View style={styles.container}>
            <Text style={[styles.label, styles.counter]}>{count}</Text>
            <Text style={[styles.label, styles.name]}>{name}</Text>
            <Text style={[styles.label, styles.subtotal]}>{"$" + (Math.round(cost*count * 100) / 100).toFixed(2)}</Text>
            <TouchableOpacity style={styles.btn} onPress={removeItem}>
                <Text style={styles.butonLabel}>Borrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Whole component
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
    subtotal: {
        fontWeight: "bold",
        width: 70
    },
    btn: { // Add button
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingHorizontal: 5,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: "1%",
        borderColor: "rgb(224, 31, 81)",
        backgroundColor: "oldlace"
    },
    butonLabel: { // Button text label
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(224, 31, 81)"
    }
});

export default CartItem;
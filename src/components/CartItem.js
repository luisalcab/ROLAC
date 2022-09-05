import {View, Text, StyleSheet, TouchableOpacity} from "react-native"

const CartItem = ({id, name, cost, count}) => {
    return(
        <View style={styles.container}>
            <Text style={[styles.label, styles.counter]}>{count}</Text>
            <Text style={[styles.label, styles.name]}>{name}</Text>
            <Text style={[styles.label, styles.cost]}>{"$" + cost}</Text>
            <Text style={[styles.label, styles.subtotal]}>{"$" + cost*count}</Text>
            <TouchableOpacity style={styles.btn} onPress={manageActivation}>
                <Text style={styles.butonLabel}>Borrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Whole component
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2
    },
    label: {
        marginHorizontal: 10,
        fontSize: 18,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    },
    counter: {
        width: 40
    },
    name: { // Title text
        fontSize: 18,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    },
    cost: { // Cost of the item
        fontSize: 16,
        fontWeight: "700",
        color: "rgb(97, 88, 88)",
    },
    subtotal: {
        fontWeight: "bold"
    },
    btn: { // Add button
        flex: 1,
        width: 90,
        justifyContent: "center",
        textAlign: "center",
        paddingHorizontal: 25,
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
import {View, Text, Image, Button, StyleSheet, TouchableOpacity} from "react-native"
import NumberInput from "./NumberInput";

const Item = ({id, name, source, unit, rank, cost, count, updateCart}) => {
    return(
        <View style={styles.container}>
            <Image source={source} style={styles.img}></Image>
            <View style={styles.details}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={styles.descriptionBox}>
                    <View style={styles.textBox}>
                        <Text style={styles.units}>{unit}</Text>
                        <Text style={styles.cost}>{"$" + cost}</Text>
                    </View>
                    <View style={styles.cartBox}>
                        <NumberInput id={id} value={count} updateCart={updateCart} style={styles.counter}/>
                        <TouchableOpacity style={styles.addBtn}>
                            <Text style={styles.butonLabel}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Whole component
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderBottomWidth: 1
    },
    img: { // Image
        height: 100,
        width: 100,
        borderRadius: 10
    },
    details: { // Container with title above and (cost, unit, quantity and add btns) below
        paddingLeft: 15,
        flex: 1
    },
    titleBox: { // Container of title
        paddingBottom: 10
    },
    title: { // Title text
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(97, 88, 88)",
    },
    descriptionBox: { // Container of cost, unit, quantity and btns
        flexDirection: "row",
        width: "100%",
        flex: 1,
    },
    textBox: { // Container of units and cost
        height: "100%",
        flex: 1
    },
    units: { // Unit of measure of the item
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "rgb(97, 88, 88)",
    },
    cost: { // Cost of the item
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "rgb(97, 88, 88)",
    },
    cartBox: { // Container of quantity input and add button
        height: "100%",
        flex: 1,
        alignItems: "center"
    },
    counter: {
        flex: 1,
        width: "100%"
    },
    addBtn: { // Add button
        flex: 1,
        width: 90,
        justifyContent: "center",
        textAlign: "center",
        paddingHorizontal: 25,
        borderRadius: 10,
        borderColor: "rgb(224, 174, 31)",
        borderWidth: 2,
        marginHorizontal: "1%",
        backgroundColor: "oldlace"
    },
    butonLabel: { // Button text label
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(224, 174, 31)",
    }
})

export default Item;
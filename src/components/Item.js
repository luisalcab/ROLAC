import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import {useContext, useEffect, useState} from "react";
import NumberInput from "./NumberInput";
import {CartContext} from "../contexts/CartContext";

const Item = ({id, name, source, unit, cost}) => {
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(false);

    const {cart, setCart} = useContext(CartContext);

    useEffect(() => {
        if (cart.find(e => e.id === id)){
            setActive(true);
        } else {
            setActive(false);
        }
    }, [cart]);

    const manageActivation = () => {
        if (!active && count > 0){
            setCart([...cart, {id, name, cost, count}]);
            setActive(true);
        } else if (active){
            setCart(cart.filter(item => item.id !== id));
            setActive(false);
            setCount(0);
        }
    }
    
    return(
        <View style={styles.container}>
            <Image source={{uri: source}} style={styles.img}></Image>
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
                        <NumberInput
                            id={id}
                            count={count}
                            updateCount={setCount}
                            active={active}
                            style={styles.counter}/>
                        <TouchableOpacity 
                            style={[styles.btn, !active ? styles.add : styles.remove]} 
                            onPress={manageActivation}>
                            <Text
                                style={[styles.butonLabel, active ? {color: "rgb(224, 31, 81)"} : {}]}>
                                {!active ? "Añadir" : "Borrar"}
                            </Text>
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
        borderBottomWidth: 2
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
    btn: { // Add button
        flex: 1,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: "1%",
        backgroundColor: "oldlace"
    },
    butonLabel: { // Button text label
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(224, 174, 31)",
    },
    add: {
        borderColor: "rgb(224, 174, 31)"
    },
    remove: {
        borderColor: "rgb(224, 31, 81)"
    }
});

export default Item;
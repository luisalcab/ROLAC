import {View, Text, StyleSheet, TouchableOpacity} from "react-native"

const NumberInput = ({id, value, updateCount, updateCart}) => {
    const increase = () => {
        if (value < 99){
            updateCount(value + 1);
            updateCart(id, value + 1, true);
        }
    }

    const decrease = () => {
        if (value > 0) {
            updateCount(value - 1);
            updateCart(id, value - 1, true);
        }
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={decrease} style={styles.decreaseBtn}>
                <Text style={styles.label}>{"-"}</Text>
            </TouchableOpacity>
            <View style={styles.valueLabel}>
                <Text style={styles.label}>{value}</Text>
            </View>
            <TouchableOpacity onPress={increase} style={styles.increaseBtn}>
                <Text style={styles.label}>{"+"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Whole component
        flex: 1,
        height: "100%",
        flexDirection: "row",
    },
    decreaseBtn: {
        height: 30,
        width: 30,
        alignItems: "center",
        padding: 4,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderLeftColor: "rgb(97, 88, 88)",
        borderTopColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2
    },
    valueLabel: {
        height: 30,
        width: 40,
        alignItems: "center",
        padding: 4,
        borderColor: "rgb(97, 88, 88)",
        borderWidth: 2
    },
    increaseBtn: {
        height: 30,
        width: 30,
        alignItems: "center",
        padding: 4,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomColor: "rgb(97, 88, 88)",
        borderRightColor: "rgb(97, 88, 88)",
        borderTopColor: "rgb(97, 88, 88)",
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
    }
});

export default NumberInput;
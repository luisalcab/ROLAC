import React, {useContext} from "react"
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Item from "../components/Item"
import {ItemsContext} from "../contexts/ItemsContext";
import {Icon} from "@rneui/themed";

const ItemSelector = ({navigation}) => {
    const {items, setItems} = useContext(ItemsContext);

    const nav2Cart = () => {
        navigation.navigate("Cart");
    }

    const sortByName = () => {
        setItems((prev) => {
            return prev.sort((a, b) => a.name - b.name);
        })
    }

    const sortByPriority = () => {
        setItems((prev) => {
            return prev.sort((a, b) => Number(a.uregent) - Number(b.urgent));
        })
    }
    
    const renderItem = ({item}) => (
        <Item
            id={item.id}
            name={item.name}
            source={item.source}
            unit={item.unit}
            cost={item.cost}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Donación en especie</Text>
                <Icon name="sort" color="rgb(97, 88, 88)" type="font-awesome-5" style={styles.sortIcon}/>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={nav2Cart}>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "rgb(251, 249, 250)"
    },
    title: { // Title text
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "rgb(224, 31, 81)"
    },
    sortIcon: {
        marginRight: 32,
        marginLeft: 50
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

export default ItemSelector;
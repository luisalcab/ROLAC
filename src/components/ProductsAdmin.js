import React, { useState, useEffect, useContext } from 'react';
import GetProducts from './GetProducts';
import { View, Text, TouchableOpacity, Image, StyleSheet, LogBox } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import RemoveProduct from './RemoveProduct';
import { RefresherContext } from '../Contexts/RefresherContext';
import { ProductInfoContext } from '../Contexts/ProductInfoContext';

const ProductsAdmin = ({navigation}) => {

    const [products, setProducts] = useState([]);
    const {refresh, setRefresh} = useContext(RefresherContext);
    const [refreshing, setRefreshing] = useState(refresh);
    const {productInfo, setProductInfo} = useContext(ProductInfoContext);
    const [search, setSearch] = useState('');

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        GetProducts().then((products) => {
            setProducts(products);
        });
        console.log("1ro");
    }, []);

    useEffect(() => {
        if (refresh === false && refreshing === false) return;
        GetProducts().then((products) => {
            setProducts(products);
        });
        setRefresh(false);
        setRefreshing(false);
        console.log("2do");
    }, [refresh || refreshing]);

    const removeProduct = (id) => {
        RemoveProduct(id);
        setRefreshing(true);
        setRefresh(true);
        setSearch('');
    }

    const editProduct = (product) => {
        setProductInfo(product);
        setSearch('');
        navigation.navigate("Editar producto", {navigation: navigation});
    }

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = products.filter(function (item) {
                const itemData = item.values.name ? item.values.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setProducts(newData);
            setSearch(text);
        } else {
            GetProducts().then((products) => {
                setProducts(products);
            });
            setSearch(text);
        }
    };

    return (
        <View style = {styles.screen}>
            <View style = {styles.products}>
                <SearchBar
                    placeholder="Buscar producto..."
                    onChangeText={text => searchFilterFunction(text)}
                    onClear={text => searchFilterFunction('')}
                    value={search}
                    lightTheme = {true}
                    round = {true}
                />
                <ScrollView>
                    {products.map((product) => {
                        return (
                            <Card key = {product.id} style = {styles.card}>
                                <View style = {styles.cardContent}>
                                    <View style = {styles.cardImage}>
                                        <Image source = {{uri: product.imageURL}} style = {styles.image}/>
                                    </View>
                                    <View style = {styles.cardText}>
                                        <Text style = {styles.cardTitle}>{product.values.name}</Text>
                                    </View>
                                    <View style = {styles.cardButton}>
                                        <TouchableOpacity style = {styles.button2} 
                                        onPress = {() => editProduct(product)}>
                                            <Icon name = "edit" size = {30} color = "black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style = {styles.button2} onPress = {() => removeProduct(product.id)}>
                                            <Icon type='feather' name = "trash" size = {30} color = "black"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>
                        )
                    })}
                </ScrollView>
            </View>
            <View style = {styles.box1}>
                <TouchableOpacity onPress={() => navigation.navigate("Crear producto", {navigation: navigation})}
                style = {styles.button}>
                    <Text style = {styles.textButton}>Crear producto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    banner:{
        backgroundColor: "white",
        width: "100%",
        height: 40,
        justifyContent: "center"
    },
    card:{
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button:{
        width: "50%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 10
    },
    products:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
    },
    textButton:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    box1:{
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: 50
    },
    cardContent:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    cardImage:{
        width: "25%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 10
    },
    cardTitle:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
        alignItems: "flex-start"
    },
    cardButton:{
        width: "10%",
        height: 40,
        justifyContent: "center",
        alignItems: "right",
        flexDirection: "row",
    },
    button2:{
        width: "110%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    cardText:{
        width: "40%",
        height: 40,
        justifyContent: "center",
        flexWrap: "wrap",
    },
});

export default ProductsAdmin;
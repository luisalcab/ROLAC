import React, {useMemo, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/layouts/Login';
import Register from './src/layouts/Register';
import ItemSelector from './src/layouts/ItemSelector';
import RegisterCCForm from './src/components/RegisterCCForm';
import Cart from './src/layouts/Cart';
import HomePageDonor from './src/layouts/MainMenu/HomePageDonor';
import ManagerDonorComponent from './src/components/administrationProfiles/ManagerDonorComponent'; 
import {CartContext} from './src/contexts/CartContext';
import {ItemsContext} from './src/contexts/ItemsContext';
import AdminSettings from './src/layouts/AdminSettings';
import FBConnection from './src/contexts/FBConnection';
import QRGenerator from './src/layouts/QRGenerator';
import QRScanner from './src/layouts/QRScanner';

//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

const DATA = [
    {id: 1, name: 'Pan', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 2, name: 'Leche', source: require("./src/img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 3, name: 'Huevo', source: require("./src/img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 4, name: 'Jamón', source: require("./src/img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 5, name: 'Atún', source: require("./src/img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 6, name: 'Frijol', source: require("./src/img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 7, name: 'Arroz', source: require("./src/img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 8, name: 'Manzana', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 9, name: 'Aguacate', source: require("./src/img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 10, name: 'Cebolla', source: require("./src/img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
    {id: 11, name: 'Pan', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 12, name: 'Leche', source: require("./src/img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 13, name: 'Huevo', source: require("./src/img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 14, name: 'Jamón', source: require("./src/img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 15, name: 'Atún', source: require("./src/img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 16, name: 'Frijol', source: require("./src/img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 17, name: 'Arroz', source: require("./src/img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 18, name: 'Manzana', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 19, name: 'Aguacate', source: require("./src/img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 20, name: 'Cebolla', source: require("./src/img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
    {id: 21, name: 'Pan', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: true, cost: 30.00},
    {id: 22, name: 'Leche', source: require("./src/img/item_milk.jpg"), unit: 'lt', urgent: false, cost: 20.50},
    {id: 23, name: 'Huevo', source: require("./src/img/item_eggs.jpg"), unit: 'docena', urgent: true, cost: 28.99},
    {id: 24, name: 'Jamón', source: require("./src/img/item_apple.jpg"), unit: 'empaque', urgent: true, cost: 76.80},
    {id: 25, name: 'Atún', source: require("./src/img/item_milk.jpg"), unit: 'lata', urgent: false, cost: 19.60},
    {id: 26, name: 'Frijol', source: require("./src/img/item_eggs.jpg"), unit: 'kg', urgent: false, cost: 24.00},
    {id: 27, name: 'Arroz', source: require("./src/img/item_milk.jpg"), unit: 'kg', urgent: true, cost: 26.20},
    {id: 28, name: 'Manzana', source: require("./src/img/item_apple.jpg"), unit: 'pza', urgent: false, cost: 8.10},
    {id: 29, name: 'Aguacate', source: require("./src/img/item_milk.jpg"), unit: 'pza', urgent: true, cost: 27.90},
    {id: 30, name: 'Cebolla', source: require("./src/img/item_eggs.jpg"), unit: 'pza', urgent: false, cost: 12.30},
];

// All the screens should be inside of NavigationContainer
export default function App() {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState(DATA);

    const providerCart = useMemo(() => ({cart, setCart}), [cart, setCart]);
    const providerItems = useMemo(() => ({items, setItems}), [items, setItems]);
    
    /* const getItems = (){
        useEffect(() => {
            const subscriber = FBConnection.db
                .collection("Items")
                .onSnapshot(docs => setItems(docs));
            
                return () => subscriber();
        }, []);
    } */

    return (
        <ItemsContext.Provider value={providerItems}>
            <CartContext.Provider value={providerCart}>
                <NavigationContainer initialRouteName="AdminSettings">
                    <Stack.Navigator>
                        {/*  HIDE NAVIGATION ==> screenOptions={{headerShown: false}}  */}
                        <Stack.Screen name="AdminSettings" component={AdminSettings} />
                        <Stack.Screen name="QRScanner" component={QRScanner} />
                        <Stack.Screen name="ItemSelector" component={ItemSelector} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="QRGenerator" component={QRGenerator} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="RegisterCCForm" component={RegisterCCForm} options={{title:"Pre-Registro Centros"}}/>
                        <Stack.Screen name="HomePageDonor" component={HomePageDonor} options={{title: 'Menu principal'}}/>
                        <Stack.Screen name="ManagerDonorComponent"  component={ManagerDonorComponent} options={{title: 'Administrar cuenta'}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </CartContext.Provider>
        </ItemsContext.Provider>
    );
}
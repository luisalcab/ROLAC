import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsAdmin from './src/components/ProductsAdmin';
import CreateProduct from './src/layouts/CreateProduct';
import {RefresherProvider} from './src/Contexts/RefresherContext';

//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

//All the screens should be inside of NavigationContainer
export default function App() {
    return (
        <RefresherProvider>
            <NavigationContainer initialRouteName="Administración de productos">
                <Stack.Navigator>
                    <Stack.Screen name="Administración de productos" 
                    component={ProductsAdmin}  options = {{headerBackTitle: "BACK"}}/>
                    <Stack.Screen name="Create Product" 
                    component={CreateProduct} options = {{headerBackTitle: "ATRÁS"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RefresherProvider>
    );
}
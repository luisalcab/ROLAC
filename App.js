import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsAdmin from './src/components/ProductsAdmin';
import CreateProduct from './src/layouts/CreateProduct';
import {RefresherProvider} from './src/Contexts/RefresherContext';
import {ProductInfoProvider} from './src/Contexts/ProductInfoContext';

//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

//All the screens should be inside of NavigationContainer
export default function App() {
    return (
        <ProductInfoProvider>
            <RefresherProvider>
                <NavigationContainer initialRouteName="Administración de productos">
                    <Stack.Navigator>
                        <Stack.Screen name="Administración de productos" 
                        component={ProductsAdmin}  options = {{headerBackTitle: "ATRÁS"}}/>
                        <Stack.Screen name="Crear producto" 
                        component={CreateProduct} options = {{headerBackTitle: "ATRÁS"}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </RefresherProvider>
        </ProductInfoProvider>
    );
}
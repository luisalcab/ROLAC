import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/layouts/Login';
import Stripe from './src/layouts/Stripe';

//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

//All the screens should be inside of NavigationContainer
export default function App() {
    return (
        <NavigationContainer initialRouteName="Login">
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Stripe} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/layouts/Login';
import Register from './src/layouts/Register';
import HomepageDonor from './src/layouts/MainMenu/HomePageDonor'
//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

//All the screens should be inside of NavigationContainer
export default function App() {
    return (
        <NavigationContainer initialRouteName="Login">
            <Stack.Navigator>
                <Stack.Screen name="HomePageDonor" component={HomepageDonor}/>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
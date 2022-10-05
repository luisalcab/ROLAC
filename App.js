import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import Login from './src/layouts/Login';
import RegisterDonor from './src/layouts/Register';
import ItemSelector from './src/layouts/ItemSelector';
import RegisterCCForm from './src/components/RegisterCCForm';
import Cart from './src/layouts/Cart';
import HomePageDonor from './src/layouts/MainMenu/HomePageDonor';
import ManagerDonorComponent from './src/components/administrationProfiles/ManagerDonorComponent'; 
import HomePageManagerBAMX from './src/layouts/MainMenu/HomePageManagerBAMX';
import ManagerAdminComponent from './src/components/administrationProfiles/ManagerAdminComponent';
import AdminRegister from './src/layouts/register/AdminRegister';
import CardsDonationUser from './src/layouts/donations/CardsDonationUser';
import CardsDonationAllUsers from './src/layouts/donations/CardsDonationAllUsers';
//Contexts
import {CartContext} from './src/contexts/CartContext';
import {ItemsContext} from './src/contexts/ItemsContext';
import { UserInformation } from './src/contexts/userInformation';
import {ProductContextProvider} from './src/contexts/ProductContext';

import AdminSettings from './src/layouts/AdminSettings';
import FBConnection from './src/contexts/FBConnection';
import QRGenerator from './src/layouts/QRGenerator';
import QRScanner from './src/layouts/QRScanner';

//Import utils
import enviromentVariables from './utils/enviromentVariables';

//Ignore warnings
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
    '`new NativeEventEmitter()`'
])

//Component incharge of crating the screens
const Stack = createNativeStackNavigator(); 

// All the screens should be inside of NavigationContainer
export default function App() {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [userInformation, setUserInformation] = useState([]);

    const providerCart = useMemo(() => ({cart, setCart}), [cart, setCart]);
    const providerItems = useMemo(() => ({items, setItems}), [items, setItems]);
    const providerUserInformation = useMemo(() => ({userInformation, setUserInformation}));

    return (
        <ProductContextProvider>
            <UserInformation.Provider value={providerUserInformation}>
                <ItemsContext.Provider value={providerItems}>
                    <CartContext.Provider value={providerCart}>
                        <NavigationContainer initialRouteName="Login">
                            <Stack.Navigator>
                                <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="QRGenerator" component={QRGenerator} />
                                <Stack.Screen name='CardsDonationAllUsers' component={CardsDonationAllUsers}/>
                                <Stack.Screen name='CardsDonationUser' component={CardsDonationUser}/>
                                <Stack.Screen name="RegisterDonor" component={RegisterDonor} />
                                <Stack.Screen name="RegisterCCForm" component={RegisterCCForm} options={{title:"Pre-Registro Centros"}}/>
                                <Stack.Screen name="HomePageDonor" component={HomePageDonor} options={{title: 'Menú principal'}}/>
                                <Stack.Screen name="ManagerDonorComponent"  component={ManagerDonorComponent} options={{title: 'Administrar cuenta'}}/>
                                <Stack.Screen name='HomePageManagerBAMX' component={HomePageManagerBAMX} options={{title: 'Menú principal'}}/>
                                <Stack.Screen name="ManagerAdminComponent" component={ManagerAdminComponent}
                                options={{title: 'Administrar cuenta'}}/>
                                <Stack.Screen name="QRScanner" component={QRScanner} />
                                
                                <Stack.Screen name="AdminSettings" component={AdminSettings} /> 
                                <Stack.Screen name="Cart" component={Cart} /> 
                                <Stack.Screen name="ItemSelector" component={ItemSelector} 
                                options={{title:"Banco de alimentos"}}/>   
                            </Stack.Navigator>
                        </NavigationContainer>
                    </CartContext.Provider>
                </ItemsContext.Provider>
            </UserInformation.Provider>
        </ProductContextProvider>
    )
}
import React, { useEffect, useMemo, useState } from 'react';
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
import HomePageCollectionCenter from './src/layouts/MainMenu/HomePageCollectionCenter';
import ManagerAdminComponent from './src/components/administrationProfiles/ManagerAdminComponent';
import AdminRegister from './src/layouts/register/AdminRegister';
import CardsDonationUser from './src/layouts/donations/CardsDonationUser';
import CardsDonationAllUsers from './src/layouts/donations/CardsDonationAllUsers';
import PaymentMessage from './src/components/stripe/PaymentMessage';
import CardsKindDonationUser from './src/layouts/donations/CardsKindDonationUser';

//Contexts
import {CartContext} from './src/contexts/CartContext';
import {ItemsContext} from './src/contexts/ItemsContext';
import { UserInformation } from './src/contexts/userInformation';
import {ProductContextProvider} from './src/contexts/ProductContext';
import { PdfDocDefinitionContext } from './src/contexts/PdfDocDefinitionContext';
import { RefresherProvider } from './src/contexts/RefresherContext';

import AdminSettings from './src/layouts/AdminSettings';
import FBConnection from './src/contexts/FBConnection';
import QRGenerator from './src/layouts/QRGenerator';
import QRScanner from './src/layouts/QRScanner';

import SearcherCC from './src/components/PdfGenerator/SearcherCC';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

//Import utils
import enviromentVariables from './utils/enviromentVariables';
import { combineTransition } from 'react-native-reanimated';

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
    const [pdfDocDefinition, setPdfDocDefinition] = useState([]);
    
    const providerCart = useMemo(() => ({cart, setCart}), [cart, setCart]);
    const providerItems = useMemo(() => ({items, setItems}), [items, setItems]);
    const ProviderPdfDocDefinition = useMemo(() => ({pdfDocDefinition, setPdfDocDefinition}), [pdfDocDefinition, setPdfDocDefinition]);
    const providerUserInformation = useMemo(() => ({userInformation, setUserInformation}));

    // const [initializing, setInitilizing] = useState(false);
    // const auth = getAuth();

    // onAuthStateChanged(auth, (user) => {
    //     const now = Date.now();
    //     console.log("Esto es USE: ", user)
    //     if (user) {
    //         if(now < user.stsTokenManager.expirationTime){
    //             setInitilizing(true);
    //         } else {
    //             setInitilizing(false);
    //             signOut(auth).then(() => {
    //                 // Sign-out successful.
    //                 console.log("Usuario deslogeado")
    //                 }).catch((error) => {
    //                 // An error happened.
                    
    //               });   
    //         }
            
    //     }
    //     else setInitilizing(false) 
    // });
    return (
        <RefresherProvider>
        <ProductContextProvider>
            <UserInformation.Provider value={providerUserInformation}>
                <ItemsContext.Provider value={providerItems}>
                    <CartContext.Provider value={providerCart}>
                        <PdfDocDefinitionContext.Provider value={ProviderPdfDocDefinition}>
                            <NavigationContainer initialRouteName="Login">
                                <Stack.Navigator>
                                    <Stack.Screen name="Login" component={Login} />
                                    <Stack.Screen name="SearcherCC" component={SearcherCC} />
                                    <Stack.Screen name='CardsDonationAllUsers' component={CardsDonationAllUsers}/>
                                    <Stack.Screen name="CardsKindDonationUser" component={CardsKindDonationUser}/>
                                    <Stack.Screen name="QRGenerator" component={QRGenerator} />
                                    <Stack.Screen name="PaymentMessage" component={PaymentMessage}/>
                                    <Stack.Screen name='CardsDonationUser' component={CardsDonationUser}/>
                                    <Stack.Screen name="RegisterDonor" component={RegisterDonor} />
                                    <Stack.Screen name="AdminRegister" component={AdminRegister} />
                                    <Stack.Screen name="RegisterCCForm" component={RegisterCCForm} options={{title:"Pre-Registro Centros"}}/>
                                    <Stack.Screen name="HomePageDonor" component={HomePageDonor} options={{title: 'Menú principal'}}/>
                                    <Stack.Screen name="ManagerDonorComponent"  component={ManagerDonorComponent} options={{title: 'Administrar cuenta'}}/>
                                    <Stack.Screen name='HomePageManagerBAMX' component={HomePageManagerBAMX} options={{title: 'Menú principal'}}/>
                                    <Stack.Screen name='HomePageCollectionCenter' component={HomePageCollectionCenter} options={{title: 'Menú principal'}}/>
                                    <Stack.Screen name="ManagerAdminComponent" component={ManagerAdminComponent}
                                    options={{title: 'Administrar cuenta'}}/>
                                    <Stack.Screen name="QRScanner" component={QRScanner} />
                                    <Stack.Screen name="AdminSettings" component={AdminSettings} /> 
                                    <Stack.Screen name="Cart" component={Cart} /> 
                                    <Stack.Screen name="ItemSelector" component={ItemSelector} 
                                    options={{title:"Banco de alimentos"}}/>   
                                </Stack.Navigator>
                            </NavigationContainer>
                        </PdfDocDefinitionContext.Provider>
                    </CartContext.Provider>
                </ItemsContext.Provider>
            </UserInformation.Provider>
        </ProductContextProvider>
        </RefresherProvider>   
    )
}
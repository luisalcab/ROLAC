import React, { useMemo, useState, useEffect} from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from "@react-native-community/netinfo";


//Components
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
import BAMXmenu from './src/layouts/BAMXmenu';
import CCRequest from './src/components/BAMX/CCRequest';
import CCEditRequest from './src/components/BAMX/CCEditRequest';
import CompareEdit from "./src/components/BAMX/CompareEdit";
import CCmenu from './src/layouts/CCmenu';
import CCEdit from "./src/components/CC/CCEdit";
import CCDeleteList from './src/components/BAMX/CCDeleteList';
import ConnectionFail from './src/components/ConnectionFail';
import CardsDonationUser from './src/layouts/donations/CardsDonationUser';
import CardsDonationAllUsers from './src/layouts/donations/CardsDonationAllUsers';
import PaymentMessage from './src/components/stripe/PaymentMessage';
import TerminosyCondiciones from './src/components/TyC';
import ForgotPassword from './src/components/ForgotPassword';
import ProductsAdmin from './src/components/ProductsAdmin';
import CreateProduct from './src/layouts/CreateProduct';
import EditProduct from './src/layouts/EditProduct';
import ViewCC from './src/components/BAMX/ViewCC';

//Contexts
import {CartContext} from './src/contexts/CartContext';
import {ItemsContext} from './src/contexts/ItemsContext';
import { UserInformation } from './src/contexts/userInformation';
import {RegisterCCProvider} from "./src/contexts/RegisterCC"
import {BAMXProvider} from "./src/contexts/BAMXContext"
import {CCProvider} from './src/contexts/CCContext';
import {ProductContextProvider} from './src/contexts/ProductContext';
import {RefresherProvider} from './src/contexts/RefresherContext';
import {ProductInfoProvider} from './src/contexts/ProductInfoContext';

import AdminSettings from './src/layouts/AdminSettings';
import QRGenerator from './src/layouts/QRGenerator';
import QRScanner from './src/layouts/QRScanner';

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
    const [isConnected, setIsConnected] = useState(null);

    const providerCart = useMemo(() => ({cart, setCart}), [cart, setCart]);
    const providerItems = useMemo(() => ({items, setItems}), [items, setItems]);
    const providerUserInformation = useMemo(() => ({userInformation, setUserInformation}));
    
    useEffect(() => {
        setTimeout(() => {
            NetInfo.fetch().then(netWorkStatus => setIsConnected(netWorkStatus.isConnected));
            NetInfo.addEventListener(netWorkStatus => setIsConnected(netWorkStatus.isConnected));
        }, 2000);
    }, []);

    return (
        <>
            {isConnected ? (
                <CCProvider>
                <BAMXProvider>
                <RefresherProvider>
                <RegisterCCProvider>
                <ProductInfoProvider>
                <ProductContextProvider>
                <UserInformation.Provider value={providerUserInformation}>
                <ItemsContext.Provider value={providerItems}>
                    <CartContext.Provider value={providerCart}>
                        <NavigationContainer initialRouteName="Login">
                            <Stack.Navigator>
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                                <Stack.Screen name="ViewCC" component={ViewCC} options={{title: "Centros de Acopio"}}/>
                                <Stack.Screen name="PaymentMessage" component={PaymentMessage}/>
                                <Stack.Screen name='CardsDonationUser' component={CardsDonationUser}/>
                                <Stack.Screen name="TerminosyCondiciones" component={TerminosyCondiciones} options={{title: "Términos y Condiciones", headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="RegisterDonor" component={RegisterDonor} options={{title:"Registro Donador", headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="BAMXmenu" component={BAMXmenu} options={{title: "Menú Principal", headerBackVisible: false}}/>{/*r */}
                                <Stack.Screen name="CCEdit" component={CCEdit} />
                                <Stack.Screen name="CCDeleteList" component={CCDeleteList} />
                                <Stack.Screen name="CCmenu" component={CCmenu} options={navigation => ({title: "Menú Principal", headerBackVisible: false})}/>
                                <Stack.Screen name="CCEditRequest" component={CCEditRequest} />
                                <Stack.Screen name="CCRequest" component={CCRequest} options={{title: "Solicitudes"}}/>
                                <Stack.Screen name="CompareEdit" component={CompareEdit} />
                                <Stack.Screen name="RegisterCCForm" component={RegisterCCForm} options={{title:"Pre-Registro Centros", headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="HomePageDonor" component={HomePageDonor} options={{title: 'Menú principal', headerBackVisible: false}}/>
                                <Stack.Screen name="ManagerDonorComponent"  component={ManagerDonorComponent} options={{title: 'Administrar cuenta', headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name='HomePageManagerBAMX' component={HomePageManagerBAMX} options={{title: 'Menú principal', headerBackVisible: false}}/>
                                <Stack.Screen name="ManagerAdminComponent" component={ManagerAdminComponent}
                                options={{title: 'Administrar cuenta'}}/>
                                <Stack.Screen name="QRScanner" component={QRScanner} />
                                <Stack.Screen name="QRGenerator" component={QRGenerator} />
                                <Stack.Screen name="AdminSettings" component={AdminSettings} /> 
                                <Stack.Screen name="Cart" component={Cart} /> 
                                <Stack.Screen name="ItemSelector" component={ItemSelector} options={{title:"Banco de alimentos"}}/> 
                                <Stack.Screen name='CardsDonationAllUsers' component={CardsDonationAllUsers}/>  
                                <Stack.Screen name="AdminRegister" component={AdminRegister} options={{title:"Registro Administrador", headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title:"Recuperar contraseña", headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="Administración de productos" component={ProductsAdmin}  options = {{headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="Crear producto" component={CreateProduct} options = {{headerBackTitle: "ATRÁS"}}/>
                                <Stack.Screen name="Editar producto" component={EditProduct} options = {{headerBackTitle: "ATRÁS"}}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </CartContext.Provider>
                </ItemsContext.Provider>
                </UserInformation.Provider>
                </ProductContextProvider>
                </ProductInfoProvider>
                </RegisterCCProvider>
                </RefresherProvider>
                </BAMXProvider>
                </CCProvider>
            ) : (
                <ConnectionFail isConnected={isConnected}/>   
            )}
        </>
    );
}
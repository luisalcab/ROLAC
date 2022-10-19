import {useContext, useEffect, useState} from 'react';
import {CCContext} from '../contexts/CCContext';
import {View, StyleSheet, Dimensions} from 'react-native';
import BtnEditCC from "../components/CC/BtnEditCC";
import CCEdit from "../components/CC/CCEdit";
import LottieView from 'lottie-react-native';
import BtnCCuserConfig from '../components/CC/BtnCCuserConfig';
import BtnScannerCC from '../components/CC/BtnScannerCC';

const CCmenu = ({navigation}) => {
    const {CCEditViewS} = useContext(CCContext);

    const [animation, setAnimation] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<BtnCCuserConfig/>)
        })
        setTimeout(() => {
            setAnimation(false);
        }, 2000);
    }, []);

    return(
        <View style={styles.screen}>
            {animation ? (
                <LottieView
                    source={require("../animations/122467-hanging-oil-lamp.json")}
                    autoPlay
                />
               ) : (!CCEditViewS ? (
                    <BtnEditCC navigation={navigation}/>
               ) : (
                   <CCEdit navigation={navigation}/>
               )
               )
            }   
        </View>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    screen: {
        width: screen.width,
        height: screen.height,
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default CCmenu;
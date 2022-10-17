import React from 'react'
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import RegisterDonorForm from '../components/RegisterDonorForm';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screen = Dimensions.get("screen");

const Register = ({navigation}) => {

    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll = {true}
            extraHeight = {10}
            extraScrollHeight = {10}>
                <Image source={require("../img/5e8827daba0aa_logo.png")} style={styles.pic}/>
                <RegisterDonorForm navigation={navigation}/>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: screen.width*1,
        height: screen.height*1,
        backgroundColor: "#fff",
    },
    pic:{
        width: screen.width*.6,
        height: screen.height*.2,
        alignSelf: "center",
        marginTop: screen.height*.005,
        marginHorizontal: screen.width*.1,
        borderRadius: 40  
    }
})

export default Register
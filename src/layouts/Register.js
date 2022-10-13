import React from 'react'
import {StyleSheet, View, Image} from 'react-native';
import RegisterDonorForm from '../components/RegisterDonorForm';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
    },
    pic:{
        width: "50%",
        height: 150,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 40,
        borderRadius: 40  
    }
})

export default Register
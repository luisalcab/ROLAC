import React from 'react'
import {StyleSheet, View} from 'react-native';
import {Image} from '@rneui/themed';
import LogInForm from '../components/LogInForm';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

 
//FireBase Cofiguration
const firebaseConfig = {
  apiKey: "AIzaSyDQoMWvjK0Dv2mJshp8Zc15H8Dq3z6G8Hc",
  authDomain: "rolac-f16b1.firebaseapp.com",
  projectId: "rolac-f16b1",
  storageBucket: "rolac-f16b1.appspot.com",
  messagingSenderId: "923719062098",
  appId: "1:923719062098:web:fb95301a590416e6dd858b",
  measurementId: "G-W8NSTTQS6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const Login = ({navigation}) => {
  
  return (
    <View style={styles.screen}>
        <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll = {true}
        extraHeight = {10}
        extraScrollHeight = {10}>
            <Image source={require("../img/5e8827daba0aa_logo.png")} style={styles.pic}/>
            <LogInForm navigation={navigation}/>
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
        marginTop: 0
    },
    pic:{
        width: "90%",
        height: 250,
        marginBottom: 20,
        marginTop: 100,
        marginHorizontal: 20,
        borderRadius: 40  
    }
})

export default Login
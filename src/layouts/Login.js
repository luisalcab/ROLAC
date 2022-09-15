import React from 'react'
import {StyleSheet, View} from 'react-native';
import {Image} from '@rneui/themed';
import LogInForm from '../components/LogInForm';

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useEffect } from 'react';

 
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
        <Image source={require("../img/5e8827daba0aa_logo.png")} style={styles.pic}/>
        <LogInForm navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    pic:{
      width: "80%",
      height: "40%",
      marginHorizontal:"10%",
      marginTop:"10%"
    }
})

export default Login
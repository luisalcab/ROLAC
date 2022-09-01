import React from 'react'
import {StyleSheet, View} from 'react-native';
import {Image} from '@rneui/themed';
import LogInForm from '../components/LogInForm';

const Login = ({navigation}) => {
  return (
    <View style={styles.screen}>
        <Image source={require("../img/710750.png")} style={styles.pic}/>
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
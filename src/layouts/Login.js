import React from 'react'
import { StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import LogInForm from '../components/LogInForm';
const Login = () => {
  return (
    <View style={styles.screen}>
        {/* <Image style={styles.logo} source={require('../img/710750.png')}/> */}
        <LogInForm/>
    </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Login
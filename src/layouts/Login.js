import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const Login = () => {
  return (
    <View style={styles.container}>
        <Text>LOG in!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tim:{
        width: 50,
        height: 20
    }
});

export default Login
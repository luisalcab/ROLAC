import React from 'react'
import {StyleSheet, View, Image} from 'react-native';
import RegisterDonorForm from '../components/RegisterDonorForm';

const Register = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Image source={require("../img/710750.png")} style={styles.pic}/>
            <RegisterDonorForm navigation={navigation}/>
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
        height: "20%",
        marginHorizontal:"10%",
        marginTop:"10%",
        marginBottom:30
    }
})

export default Register
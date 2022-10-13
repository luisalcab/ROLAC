import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Button, Icon} from '@rneui/themed';

const BtnCCuserConfig = ({func}) => {
  return (
    <View style={styles.view}>
        <Button
            onPress={() => func()}
            radius="xl"
            buttonStyle={styles.btn}
            icon={<Icon name="user" type="feather" iconStyle={styles.icon} containerStyle={styles.iconContainer}/>}
            iconContainerStyle={styles.btnIconContainer}
            iconPosition="top"
        />
    </View>
  )
}

export default BtnCCuserConfig

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    view:{
        width: "40%",
        height: "100%"
    },
    btn:{
        widht: "100%",
        height: screen.height * .07,
        marginVertical: "5%",
        backgroundColor: "#D9D9D9"
    },
    btnIconContainer:{
        flex:1,
        justifyContent: "center",
        alignContent: "center"
    },
    iconContainer:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    icon:{
        widht: "100%"
    }
})
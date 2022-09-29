import React from 'react';
import { View, StyleSheet } from 'react-native';
import CreateProductForm from '../components/CreateProductForm';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateProduct = ({navigation}) => {
    return (
        <View style = {styles.screen}>
            <View>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={0.01}
                    enableAutomaticScroll = {true}>
                    <CreateProductForm navigation={navigation}/>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    }
});

export default CreateProduct
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CreateProductForm from '../components/CreateProductForm';

const CreateProduct = ({navigation}) => {
    return (
        <View style = {styles.screen}>
            <View>
                <CreateProductForm navigation={navigation}/>
            </View>
        </View>
    )
}

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: screen.width*1,
        height: screen.height*1,
        backgroundColor: "white"
    }
});

export default CreateProduct
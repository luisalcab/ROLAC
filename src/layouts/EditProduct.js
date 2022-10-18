import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import EditProductForm from '../components/EditProductForm';

const EditProduct = ({navigation}) => {
    return (
        <View style = {styles.screen}>
            <View>
                <EditProductForm navigation={navigation}/>
            </View>
        </View>
    )
}

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        width: screen.width*1,
        height: screen.height*1,
        backgroundColor: "white"
    }
});

export default EditProduct
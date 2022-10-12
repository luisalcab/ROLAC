import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    }
});

export default EditProduct
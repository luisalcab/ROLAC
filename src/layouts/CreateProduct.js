import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    }
});

export default CreateProduct
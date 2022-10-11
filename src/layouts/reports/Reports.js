import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import PdfGenerator from "../../components/PdfGenerator/PdfGenerator";

const Reports = ({navigation}) => {
    return (
        <View style={styles.container}>
            <PdfGenerator navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  

export default Reports;

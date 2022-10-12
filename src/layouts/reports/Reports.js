import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import ExcelGenerator from "../../components/PdfGenerator/ExcelGenerator";

const Reports = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ExcelGenerator navigation={navigation}/>
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

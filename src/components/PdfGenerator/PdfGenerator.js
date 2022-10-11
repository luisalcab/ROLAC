import React, { useContext } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import pdfMake from "pdfmake/build/pdfmake";

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { PdfDocDefinitionContext } from "../../contexts/PdfDocDefinitionContext";

const PdfGenerator = ({navigation}) => {
    const { pdfDocDefinition, setPdfDocDefinition } = useContext(PdfDocDefinitionContext);
    console.log(pdfDocDefinition)
    const create = () => {
        const pdfDocGenerator = pdfMake.createPdf(pdfDocDefinition)
        pdfDocGenerator.getBase64((base64) => {
            const filename = FileSystem.documentDirectory + "data.pdf"
    
            FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
            .then(() => {
            Sharing.shareAsync(filename);
            })
        });
    }
    
    
    return (
    <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title='Crear PDF' onPress={create}/>
    </View>
    )
};    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default PdfGenerator;

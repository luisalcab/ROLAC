import React, { useContext } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';
import pdfMake from "pdfmake/build/pdfmake";
import { Icon } from "@rneui/base";
import { collection, query, where, getDocs } from 'firebase/firestore';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import FBConnection from '../../contexts/FBConnection';
import { PdfDocDefinitionContext } from "../../contexts/PdfDocDefinitionContext";
import moment from 'moment';


const docDefinition = {
    content: [
        {
            stack: [
                'Reporte de donaciones pendientes por recolectar',
                {text: 'Hola mundo', style: 'subheader'},
            ],
            style: 'mainHeader'
        },
        {text: 'Restaurante 1', style: 'header'},
        'ID de centro: b7udBAstoa4Y8qUdnOe2',
        {
            style: 'tableExample',
            table: {
                body: [
                    ['ID producto', 'Nombre producto', 'Cantidad'],
                    ['0IVndm3s95cmMm3QpI9q', 'Uvas', '2'],
                    ['5XGC9v8eBeVQverEFWWw', 'Limón', '2'],
                    ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '2'],
                ]
            }
        },
        {text: 'Restaurante 2', style: 'header'},
        'ID de centro: Gtby7XqEHATkb4En7oNmgTHrxq12',
        {
            style: 'tableExample',
            table: {
                body: [
                    ['ID producto', 'Nombre producto', 'Cantidad'],
                    ['0IVndm3s95cmMm3QpI9q', 'Uvas', '5'],
                    ['5XGC9v8eBeVQverEFWWw', 'Limón', '3'],
                    ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '4'],
                ]
            }
        },
        {text: 'Donaciones en especie tomadas en cuenta para el reporte', style: 'header'},
        {
            style: 'tableExample',
            table: {
                body: [
                    ['Entregada', 'ID donación', 'Realizado'],
                    ['Restaurante 1','asdsdOBlYHAZSbQmkpXY', '2022-10-01 12:58:51'],
                    ['Restaurante 1','MtdVBOBlYHAZSbQmkpXY', '2022-10-05 13:25:51'],
                    ['Restaurante 2','MtdVBOBlYHAZSbQmasdS', '2022-10-10 15:30:51'],
                ]
            }
        },
    ],
    styles: {
        mainHeader: {
               fontSize: 18,
            bold: true,
            alignment: 'right',
            
        },
        subheader: {
            fontSize: 14
        },
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        }
    },
    defaultStyle: {
        // alignment: 'justify'
    }	
  }

const PdfGenerator = ({navigation}) => {

    const create = (nameFile) => {
        console.log("Hola mundo")
        // console.log(docDefinition)

        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        pdfDocGenerator.getBase64((base64) => {
            const filename = FileSystem.documentDirectory + nameFile
    
            FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
            .then(() => {
                Sharing.shareAsync(filename);
                alert("Se ha creado exitosamente el archivo")
                navigation.navigate('HomePageManagerBAMX', {navigation: navigation})
            })
            .catch(() => {
                alert("Ha habido un error")
                navigation.navigate('HomePageManagerBAMX', {navigation: navigation})
            })
        });
    }
    
    const generatePDFReportUncollected = async () => {
        const donationsInKind = [];

        const q = query(collection(FBConnection.db, "donations_in_kind"), where("collected", "!=", 1))
        
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            const {dateTime, donationCenter, donor, items} = doc.data();
        
            donationsInKind.push({ dateTime, donationCenter, donor, items });
        });
        // console.log(donationsInKind)

        var docDefinition = {
            content: [


            ],
            styles: {
                mainHeader: {
                       fontSize: 18,
                    bold: true,
                    alignment: 'right',
                    
                },
                subheader: {
                    fontSize: 14
                },
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                // alignment: 'justify'
            }	
        }


        //Cabecera principal
        docDefinition.content.push({
            stack: [
                'Reporte de donaciones pendientes por recolectar',
                {text: moment().format("DD-MM-YY hh:mm:ss"), style: 'subheader'},
            ],
            style: 'mainHeader'           
        })

        // Tablas de centro de acopio
        // docDefinition.content.push(
        //     {text: 'Restaurante 1', style: 'header'},
        //     'ID de centro: b7udBAstoa4Y8qUdnOe2',
        //     {
        //         style: 'tableExample',
        //         table: {
        //             body: [
        //                 ['ID producto', 'Nombre producto', 'Cantidad'],
        //                 ['0IVndm3s95cmMm3QpI9q', 'Uvas', '2'],
        //                 ['5XGC9v8eBeVQverEFWWw', 'Limón', '2'],
        //                 ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '2'],
        //             ]
        //         }
        //     },
        // )

        // // Tabla de donaciones consideradas para el reporte
        // docDefinition.content.push(
        //     {text: 'Donaciones en especie tomadas en cuenta para el reporte', style: 'header'},
        //     {
        //         style: 'tableExample',
        //         table: {
        //             body: [
        //                 ['Entregada', 'ID donación', 'Realizado'],
        //                 ['Restaurante 1','asdsdOBlYHAZSbQmkpXY', '2022-10-01 12:58:51'],
        //                 ['Restaurante 1','MtdVBOBlYHAZSbQmkpXY', '2022-10-05 13:25:51'],
        //                 ['Restaurante 2','MtdVBOBlYHAZSbQmasdS', '2022-10-10 15:30:51'],
        //             ]
        //         }
        //     }
        // )
        
        // console.log(docDefinition)
        create("ReporteDonacionesNoRecolectadas.pdf")
    }

    return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => generatePDFReportUncollected()}>
                <Icon name="receipt-long" type="material" size={50} />
                <Text>Reporte de donaciones no recolectadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => generatePDFReportUncollected()}>
                <Icon name="text-snippet" type="material" size={50} />
                <Text>Consultar historico de donaciones por centro de acopio</Text>
        </TouchableOpacity>
        
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


// const docDefinition = {
//     content: [
//         {
//             stack: [
//                 'Reporte de donaciones pendientes por recolectar',
//                 {text: 'Hola mundo', style: 'subheader'},
//             ],
//             style: 'mainHeader'
//         },
//         {text: 'Restaurante 1', style: 'header'},
//         'ID de centro: b7udBAstoa4Y8qUdnOe2',
//         {
//             style: 'tableExample',
//             table: {
//                 body: [
//                     ['ID producto', 'Nombre producto', 'Cantidad'],
//                     ['0IVndm3s95cmMm3QpI9q', 'Uvas', '2'],
//                     ['5XGC9v8eBeVQverEFWWw', 'Limón', '2'],
//                     ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '2'],
//                 ]
//             }
//         },
//         {text: 'Donaciones en especie tomadas en cuenta para el reporte', style: 'header'},
//         {
//             style: 'tableExample',
//             table: {
//                 body: [
//                     ['Entregada', 'ID donación', 'Realizado'],
//                     ['Restaurante 1','asdsdOBlYHAZSbQmkpXY', '2022-10-01 12:58:51'],
//                     ['Restaurante 1','MtdVBOBlYHAZSbQmkpXY', '2022-10-05 13:25:51'],
//                     ['Restaurante 2','MtdVBOBlYHAZSbQmasdS', '2022-10-10 15:30:51'],
//                 ]
//             }
//         },
//     ],
//     styles: {
//         mainHeader: {
//                fontSize: 18,
//             bold: true,
//             alignment: 'right',
            
//         },
//         subheader: {
//             fontSize: 14
//         },
//         header: {
//             fontSize: 18,
//             bold: true,
//             margin: [0, 0, 0, 10]
//         },
//         tableExample: {
//             margin: [0, 5, 0, 15]
//         },
//         tableHeader: {
//             bold: true,
//             fontSize: 13,
//             color: 'black'
//         }
//     },
//     defaultStyle: {
//         // alignment: 'justify'
//     }	
// }
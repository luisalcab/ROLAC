import React, { useContext } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';
import pdfMake from "pdfmake/build/pdfmake";
import { Icon } from "@rneui/base";
import { collection, query, where, getDocs } from 'firebase/firestore';

// import * as XLSX from 'xlsx';
import * as XLSX from 'xlsx-js-style';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import FBConnection from '../../contexts/FBConnection';
import moment from 'moment';

const ExcelGenerator = () => {
    
    const stylesExcel = {
        title: {
            font: {
                name: "Calibri", 
                sz: 18, 
                bold: true,
            },
            alignment: {
                horizontal: "right"
            }
        },
        date: {
            font: {
                name: "Calibri", 
                sz: 14, 
                bold: true,
            },
            alignment: {
                horizontal: "right"
            }
        },
        titleCollectionCenter: {
            font: {
                name: "Calibri", 
                sz: 14, 
                bold: true,
            },
            alignment: {
                horizontal: "left"
            }
        },
        subtitleCollectionCenter: {
            font: {
                name: "Calibri", 
                italic: true,
            },
            alignment: {
                horizontal: "left"
            }
        },
        titleTable: {
            font: {
                name: "Calibri", 
                bold: true,
            },
            alignment: {
                horizontal: "center"
            }
        }
    }

    const reportRecollectionsPending = async () => {
        var sheets = [];

        const donationsInKind = [];

        const q = query(collection(FBConnection.db, "donations_in_kind"), where("collected", "!=", 1))
        
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            const {collectionCenterName, dateTime, donationCenter, donor, items} = doc.data();
        
            donationsInKind.push({ collectionCenterName, dateTime, donationCenter, donor, items });
        });


        console.log("----------------------------- Nueva donación ------------------------------------")
        console.log(donationsInKind)
        console.log("MAP__________________________-")
        
        var donationsCollectionCenter = new Map([["QQvES6YicRZw5NcNDqjr7ZwQgmi1", [1 ,2 ,3 ,4]],
            ["TIqNoLVH9eS8hN7ZmJQA5IhS0Px2" , [1.1, 1.2, 1.3, 1.4]],
            ["24s8YkXhbEY5TmTZHriX8E86jCh2", {"0IVndm3s95cmMm3QpI9q": "Accediste"}]]);
        // console.log(donationsCollectionCenter)
        // console.log("Specific Map3");
        // console.log(map3.has("24s8YkXhbEY5TmTZHriX8E86jCh2"));
        const key = "0IVndm3s95cmMm3QpI9q";
        console.log(donationsCollectionCenter.get("24s8YkXhbEY5TmTZHriX8E86jCh2")[key]);
        console.log(donationsCollectionCenter.get("24s8YkXhbEY5TmTZHriX8E86jCh2"));

        // console.log(map3.set("a",[-1, -4, -3, -5]));
        // console.log("Todo el mapa")
        // console.log(map3)
        sheets.push({
            sheetData: [
                ["", "", "", "", {v: "Reporte de donaciones pendientes por recolectar", t:"s", s:  stylesExcel.title }],
                ["", "", "", "", {v: "Fecha: 12-10-22", t:"s", s: stylesExcel.date }],
                [""],
                [{v: "Restaurante", t:"s", s: stylesExcel.titleCollectionCenter }],
                [{v: "ID de centro: ", t:"s", s:  stylesExcel.subtitleCollectionCenter }, "b7udBAstoa4Y8qUdnOe2"],
                [""],
                [{v: "ID producto", t:"s", s: stylesExcel.titleTable}, {v: "Nombre producto", t:"s", s: stylesExcel.titleTable}, {v: "Cantidad", t:"s", s: stylesExcel.titleTable}],
                ["0IVndm3s95cmMm3QpI9q", "Uvas", "2"],
                ["5XGC9v8eBeVQverEFWWw", "Limón", "2"],
                ["0IVndm3s95cmMm3QpI9q ", "Papas", "2"],
            ],
            nameSheet: "recoleccion_pendiente"
        })

        sheets.push({
            sheetData: 
                [
                    ["", "", "", "", {v: "Reporte de donaciones pendientes por recolectar", t:"s", s:  stylesExcel.title }],
                    ["", "", "", "", {v: "Fecha: 12-10-22", t:"s", s: stylesExcel.date }],
                    [""],
                    [{v: "Entregada", t:"s", s: stylesExcel.titleTable}, {v: "ID donación", t:"s", s: stylesExcel.titleTable}, {v: "Realizado", t:"s", s: stylesExcel.titleTable}],
                    ["Restaurante 1", "0IVndm3s95cmMm3QpI9q", "1/10/2022 12:58:51"],
                    ["Restaurante 2", "5XGC9v8eBeVQverEFWWw", "1/10/2022 12:58:51"],
                    ["Restaurante 1", "0IVndm3s95cmMm3QpI9q", "1/10/2022 12:58:51"],
                ],
            nameSheet: "donaciones tomadas en cuenta"
        })

        generateExcel(sheets)
    }

    const generateExcel = (sheets) => {
        let wb = XLSX.utils.book_new();
    
        sheets.forEach(sheet => {
            let ws_collect_pending = XLSX.utils.aoa_to_sheet(sheet.sheetData);
            XLSX.utils.book_append_sheet(wb, ws_collect_pending, sheet.nameSheet, true);
        })
        
        // let ws_donations_in_kind = XLSX.utils.aoa_to_sheet();
        // XLSX.utils.book_append_sheet(wb, ws_donations_in_kind, "recoleccion_pendiente", true);
        
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "MyEcxel.xlsx"
    
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
          Sharing.shareAsync(filename);
        })
      }

    return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => reportRecollectionsPending()}>
                <Icon name="receipt-long" type="material" size={50} />
                <Text>Reporte de donaciones no recolectadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => generateExcel()}>
                <Icon name="text-snippet" type="material" size={50} />
                <Text>Consultar historico de donaciones por centro de acopio</Text>
        </TouchableOpacity>
        
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

export default ExcelGenerator;
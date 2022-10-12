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
import { collectFinancialConnectionsAccounts } from '@stripe/stripe-react-native';

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
        
        var donationsCollectionCenter = new Map();

        // donationsInKind.forEach(donation => {
        //     //If collection center doesn't exist, then we add it to the map
        //     if(!donationsCollectionCenter.has(donation.donationCenter)) {
        //         donationsCollectionCenter.set(donation.donationCenter, {})
        //     }
            
        //     //Iterates all the elements of this donation.
        //     donation.items.forEach(item => {
        //         const { id, count, name, unit } = item;
                
        //         //If the item doesn't exist in the collection center, then we add it
        //         if(donationsCollectionCenter.get(donation.donationCenter)[item.id] == undefined){
        //             console.log(item.id)
        //             donationsCollectionCenter.get(donation.donationCenter)[`${item.id}`] = {
        //                 count,
        //                 id,
        //                 name,
        //                 unit
        //             }
        //         } else {
        //             donationsCollectionCenter.get(donation.donationCenter)[item.id].count += count
        //         }
        //     });
        // })
        donationsInKind.forEach(donation => {
            //If collection center doesn't exist, then we add it to the map
            if(!donationsCollectionCenter.has(donation.donationCenter)) {
                const { collectionCenterName, donationCenter } = donation;
                donationsCollectionCenter.set(donation.donationCenter, 
                    { 
                        collectionCenterName, 
                        donationCenter,
                        items: {}
                    }
                );
            }
            
            //Iterates all the elements of this donation.
            donation.items.forEach(item => {
                const { id, count, name, unit } = item;
                //If the item doesn't exist in the collection center, then we add it
                if(donationsCollectionCenter.get(donation.donationCenter)["items"][item.id] == undefined){
                    donationsCollectionCenter.get(donation.donationCenter)["items"][`${item.id}`] = 
                    {
                        count,
                        id,
                        name,
                        unit
                    }
                } else {
                    donationsCollectionCenter.get(donation.donationCenter)["items"][item.id].count += count
                }
            });
        })
        console.log("Example of the items from one donation")
        // console.log(donationsInKind[0])
        // console.log(donationsInKind[0].items[0])
        console.log(donationsCollectionCenter)
        donationsCollectionCenter.forEach(center => {
            console.log("------------------------------------------------")
            console.log(center.collectionCenterName)
            for(const key in center.items) {
                console.log(center.items[key])                
            }
        })
        
        
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
import React, { useContext } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';
import pdfMake from "pdfmake/build/pdfmake";
import { Icon } from "@rneui/base";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

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
        const donationsInKind = [];
        const q = query(collection(FBConnection.db, "donations_in_kind"), where("collected", "!=", 1))
        const querySnapshot = await getDocs(q);

        var sheets = [];
        var sheetsColletionPending = [];
        var sheetsColletionPendingDonation = [];
        
        //Get data from firebase
        querySnapshot.forEach((doc) => {
            const {collectionCenterName, dateTime, donationCenter, donor, items} = doc.data();
            donationsInKind.push({ 
                idDonation: doc.id,
                collectionCenterName, 
                date: moment(dateTime).format(), 
                donationCenter, 
                donor, 
                items,
                dateTime: moment(dateTime).valueOf() 
             });
        });
        
        // Sorting DB result by name organization
        var donationsInKindSortedOrganization = donationsInKind.sort((a, b) => {
            const nameA = a.collectionCenterName.toUpperCase(); 
            const nameB = b.collectionCenterName.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        }) 

        // Sorting DB result by date
        var donationsInKindSortedDate = donationsInKind.sort((a, b) =>  b.dateTime - a.dateTime ) 

        //Begin process to create the report of donations pending to collect
        //Create a map which will help to get the total of amount of each item by collection
        var donationsCollectionCenter = new Map();

        //Get the total amount for each item by collection
        donationsInKindSortedOrganization.forEach(donation => {
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
        
        //Store the header
        sheetsColletionPending.push
        (
            ["", "", "", "", {v: "Reporte de donaciones pendientes por recolectar", t:"s", s:  stylesExcel.title }],
            ["", "", "", "", {v: `Fecha: ${moment().format("DD-MM-YY")}`, t:"s", s: stylesExcel.date }],
            [""],
        )

        //We set in correct order 
        donationsCollectionCenter.forEach(center => {
            sheetsColletionPending.push
            (
                [{v: `${center.collectionCenterName}`, t:"s", s: stylesExcel.titleCollectionCenter }],
                [{v: "ID de centro: ", t:"s", s:  stylesExcel.subtitleCollectionCenter }, `${center.donationCenter}`],
                [""],
                [
                    {v: "ID producto", t:"s", s: stylesExcel.titleTable}, 
                    {v: "Nombre producto", t:"s", s: stylesExcel.titleTable}, 
                    {v: "Cantidad", t:"s", s: stylesExcel.titleTable},
                    {v: "Unidad", t:"s", s: stylesExcel.titleTable}
                ],
            )
            const itemsFormat = []
            //Put item data in correct format
            for(const key in center.items) {
                itemsFormat.push(center.items[key])
            }

            const itemsFormatInOrder = [...itemsFormat].sort((a, b) => {
                const nameA = a.name.toUpperCase(); 
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });

            //Store all the data in "sheetsColletionPending"
            itemsFormatInOrder.forEach(item => {
                sheetsColletionPending.push([item.id, item.name, item.count, item.unit]);
            })
            sheetsColletionPending.push([""])
        })
        
        //Begin the process for insert the donations that are considered
        //Set the header of the sheet
        sheetsColletionPendingDonation.push(
            ["", "", "", "", {v: "Donaciones consideradas para el reporte", t:"s", s:  stylesExcel.title }],
            ["", "", "", "", {v: `Fecha: ${moment().format("DD-MM-YY")}`, t:"s", s: stylesExcel.date }],
            [""],
            [{v: "Entregada en", t:"s", s: stylesExcel.titleTable}, {v: "ID donación", t:"s", s: stylesExcel.titleTable}, {v: "Realizado", t:"s", s: stylesExcel.titleTable}],
            [""],
        )

        //Set data of the sheet
        donationsInKindSortedDate.forEach(donation => {
            sheetsColletionPendingDonation.push(
                [
                    donation.collectionCenterName,
                    donation.idDonation,
                    donation.date
                ]
            )
        })

        //Set data for generate the reports
        sheets.push
        (
            {
                sheetData: sheetsColletionPending,
                nameSheet: "recoleccion_pendiente"
            },
            {
                sheetData: sheetsColletionPendingDonation,
                nameSheet: "donaciones_tomadas_en_cuenta"
            }
        )
        
        donationsInKind.forEach(async (donation) => {
            await updateDoc(
                doc(FBConnection.db, "donations_in_kind", donation.idDonation),
                {
                    collected: 1
                }
              )
              .then(() => { })
              .catch(() => { });
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
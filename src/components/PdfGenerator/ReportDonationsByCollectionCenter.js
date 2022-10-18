import React, { useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ExcelGenerator from './ExcelGenerator';


import FBConnection from '../../contexts/FBConnection';
import moment from 'moment';

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
    },
    intervalDate: {
        alignment: {
            horizontal: "center"
        }
    },
    intervalDateLabels: {
        alignment: {
            horizontal: "right"
        }
    },
    titleOfList: {
        font: {
            name: "Calibri", 
            sz: 14, 
            bold: true,
        },  
    },
    simpleTitle: {
        font: {
            name: "Calibri", 
            bold: true,
        },
    },
    simpleTitleCenter: {
        font: {
            name: "Calibri", 
            bold: true,
        },
        alignment: {
            horizontal: "center"
        }
    }

}

const ReportDonationsByCollectionCenter = async (beginDate, endDate, uid) => {

    var sheets = [];
    var sheetsDataForTheReport = []; 
    const q = query(collection(FBConnection.db, "donations_in_kind"), where("donationCenter", "==", uid))
    const querySnapshot = await getDocs(q);


    const donationsData = []
    querySnapshot.forEach(donation => {
        const { 
            collectionCenterName, 
            collected, 
            dateTime,
            donationCenter,
            items
        } = donation.data();

        donationsData.push(
            {
                idDonation: donation.id,
                collectionCenterName, 
                collected, 
                date: moment(dateTime).format("DD-MM-YY"),
                donationCenter,
                items,
                dateTime: moment(dateTime).valueOf(),
            }
        )
    })

    const donationSorted = [...donationsData].sort((a, b) => a.dateTime - b.dateTime);

    if(donationSorted[0] != undefined){
        //Set header to the document
        sheetsDataForTheReport.push
        (            
            ["", "", "", "", {v: "Donaciones consideradas para el reporte", t:"s", s:  stylesExcel.title }],
            ["", "", "", "", {v: `Fecha: ${moment().format("DD-MM-YY")}`, t:"s", s: stylesExcel.date }],
            [""],
            [
                {v: `Centro de acopio: `, t:"s", s: stylesExcel.titleCollectionCenter }, 
                {v: `${donationsData[0].collectionCenterName}`, t:"s", s: stylesExcel.titleCollectionCenter }],
            [
                {v: "ID de centro: ", t:"s", s:  stylesExcel.subtitleCollectionCenter }, 
                `${donationsData[0].donationCenter}`
            ],
            [""],
            [{v: `Intervalo de busqueda`, t:"s", s: stylesExcel.titleCollectionCenter }],
            [
                {v: "Desde:", t:"s", s: stylesExcel.intervalDateLabels}, 
                {v: beginDate, t:"s", s: stylesExcel.intervalDate}, 
                {v: "Hasta:", t:"s", s: stylesExcel.intervalDateLabels}, 
                {v: endDate, t:"s", s: stylesExcel.intervalDate}
            ],
            [""],
            [""],
            [{v: "Donaciones encontradas", t:"s", s: stylesExcel.titleOfList}],
            [""]
        )
        donationSorted.forEach(donation => {
            if(donation.date >= beginDate && donation.date <= endDate){
                sheetsDataForTheReport.push
                (
                    [
                        {v: "ID donacion: ", t: "s", s: stylesExcel.simpleTitle}, 
                        {v: `${donation.idDonation}`, t: "s", s: stylesExcel.simpleTitle}
                    ],
                    [
                        {v: "Realizada: "}, 
                        {v: `${donation.date}`, t: "s", s: {alignment: {horizontal: "center"}}}
                    ],
                    [
                        {v: "ID producto", t: "s", s: stylesExcel.simpleTitleCenter},
                        {v: "Nombre producto", t: "s", s: stylesExcel.simpleTitleCenter}, 
                        {v: "Cantidad", t: "s", s: stylesExcel.simpleTitleCenter},
                        {v: "Unidades", t: "s", s: stylesExcel.simpleTitleCenter}
                    ],
                )
                donation.items.forEach(item => {
                    sheetsDataForTheReport.push(
                        [
                            {v: `${item.id}`},
                            {v: `${item.name}`},
                            {v: `${item.count}`},
                            {v: `${item.unit}`},
                        ],  
                    )
                })
                sheetsDataForTheReport.push([""])
            }
    
        })
        sheets.push(
            {
                sheetData: sheetsDataForTheReport,
                nameSheet: "Historico de donaciones"
            },
        )
        return ExcelGenerator(sheets);
    } else { 
        alert("No se encontraron donaciones para ese centro de acopio, en ese intervalo de tiempo");

    }
}



export default ReportDonationsByCollectionCenter;

import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, LogBox, RefreshControl } from 'react-native';
import { Input, SearchBar } from 'react-native-elements';
import { Card, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { RefresherContext } from '../../contexts/RefresherContext';
import GetCC from './GetCC';
import { Button } from '@rneui/base';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import ReportDonationsByCollectionCenter from './ReportDonationsByCollectionCenter';
import ReportCollectionsPending from './ReportCollectionsPending'  

import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateEmail,
    sendPasswordResetEmail,
  } from "firebase/auth";

const SearcherCC = () => {
    const [collectionCenter, setCollectionCenter] = useState([]);
    const {refresh, setRefresh} = useContext(RefresherContext);
    const [refreshing, setRefreshing] = useState(refresh);
    const [search, setSearch] = useState('');
    const [collectionCenterSelected, setCollectionCenterSelected] = useState(undefined);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [beginDate, setBeginDate] = useState(true);
    const [intervalTime, setIntervalTime] = useState({ beginDate: "", endDate: "" });
    
    useEffect(() => {
        GetCC().then((collectionCenter) => {
            setCollectionCenter(collectionCenter);
        })

        const auth = getAuth();
        console.log("auth: " ,auth)
    },[]);

    useEffect(() => {
        if (refresh === false && refreshing === false) return;
        GetCC().then((collectionCenter) => {
            setCollectionCenter(collectionCenter);
        });
        setRefresh(false);
        setRefreshing(false);
    }, [refresh || refreshing]);


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = collectionCenter.filter(function (colCenter) {
                const colCenterData = colCenter.name ? colCenter.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return colCenterData.indexOf(textData) > -1;
            });
            setCollectionCenter(newData);
            setSearch(text);
        } else {
            GetCC().then((collectionCenter) => {
                setCollectionCenter(collectionCenter);
            });
            setSearch(text);
        }
    };
    
    const selectCC = (CC) => {
        setCollectionCenterSelected({
            address: CC.address,
            email: CC.email,
            id: CC.id,
            name: CC.name
        });
    }


    const showDatePicker = () => { setDatePickerVisibility(true); };

    const hideDatePicker = () => { setDatePickerVisibility(false); };

    const resetInformationForReport = () => { 
        setCollectionCenterSelected(undefined) 
        setIntervalTime({beginDate: "", endDate: ""})
    }
    
    const generateReport = ()  => {
        console.log("Validando")
        
        if(moment(intervalTime.beginDate).isValid() && moment(intervalTime.endDate).isValid()) {
            console.log("Entrando")
            ReportDonationsByCollectionCenter(
                intervalTime.beginDate, 
                intervalTime.endDate,
                collectionCenterSelected.id);
        } else {
            alert("Aún no has seleccionado un intervalo de fechas valido");
        }
    }


  const handleConfirm = async (date) => {
    const dateFormat = moment(date).format("DD-MM-YY");
    if(beginDate) 
        setIntervalTime({...intervalTime, ["beginDate"]: dateFormat});

    if(!beginDate){
        if(dateFormat < intervalTime.beginDate){
            alert("Intervalo de fechas invalido, escoge nuevamente")
        } else {
            setIntervalTime({...intervalTime, ["endDate"]: dateFormat});
        }
    }

    hideDatePicker();
  };


    return (
        <View style = {styles.screen}>
            {collectionCenterSelected==undefined ? 
                (
                <View style = {styles.collectionCenter}>
                <SearchBar
                    placeholder="Buscar producto..."
                    onChangeText={text => searchFilterFunction(text)}
                    onClear={text => searchFilterFunction('')}
                    value={search}
                    lightTheme = {true}
                    round = {true}
                    containerStyle = {styles.searchBar}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                setRefresh(true);
                            }}
                        />
                    }
                >
                    {collectionCenter.map((colCenter) => {
                        return (
                            <Card key = {colCenter.id} style = {styles.card}>
                                <View style = {styles.cardContent}>
                                    <View style = {styles.cardText}>
                                        <Text style = {styles.cardTitle}>{colCenter.name}</Text>
                                        <Button onPress={() => {selectCC(colCenter)}}>Seleccionar</Button>
                                    </View>
                                </View>
                            </Card>
                        )
                    })}
                </ScrollView>
                </View>
                ) :
                (
                    <>
                        <Text>Nombre centro de donación: {collectionCenterSelected.name}</Text>
                        <Text>ID: {collectionCenterSelected.id}</Text>
                        <Text>Dirección {collectionCenterSelected.address}</Text>
                        <Text>Email  {collectionCenterSelected.email}</Text>

                        <Text>Desde: {intervalTime.beginDate}</Text>
                        <Text>Hasta: {intervalTime.endDate}</Text>
                        <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}/>
                        <View style = {styles.box1}>
                            <TouchableOpacity onPress={() => 
                            {
                                showDatePicker()
                                setBeginDate(true)
                            }}
                            style = {styles.button}>
                                <Text style = {styles.textButton}>Fecha inicial</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => 
                            {
                                showDatePicker()
                                setBeginDate(false)
                            }}
                            style = {styles.button}>
                                <Text style = {styles.textButton}>Fecha final</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style = {styles.box1}>
                            <TouchableOpacity onPress={() => { generateReport() }}
                            style = {styles.button}>
                                <Text style = {styles.textButton}>Generar reporte</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { resetInformationForReport() }}
                            style = {styles.button}>
                                <Text style = {styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>    
                    </>
                )
            }         
        </View>
    );    
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    banner:{
        backgroundColor: "white",
        width: "100%",
        height: 40,
        justifyContent: "center"
    },
    card:{
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button:{
        width: "50%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "orange",
        borderRadius: 10,
        marginBottom: 10
    },
    collectionCenter:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        hide: true
    },
    textButton:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    box1:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 70,
        backgroundColor: "#E8E8E8"
    },
    cardContent:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    cardImage:{
        width: "25%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 10
    },
    cardTitle:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
    },
    cardButton:{
        width: "10%",
        height: 40,
        justifyContent: "center",
        flexDirection: "row",
        marginHorizontal: 10
    },
    button2:{
        width: "110%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    cardText:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "40%",
    },
    searchBar:{
        width: "100%",
        height: 70,
        backgroundColor: "#E8E8E8",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        backfaceVisibility: "hidden"
    }
});

export default SearcherCC;
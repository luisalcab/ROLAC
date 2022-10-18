import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, LogBox, RefreshControl } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { RefresherContext } from '../../contexts/RefresherContext';
import GetCC from './GetCC';
import { Button } from '@rneui/base';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import ReportDonationsByCollectionCenter from './ReportDonationsByCollectionCenter';
import { color } from 'react-native-reanimated';

const SearcherCC = ({navigation}) => {
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
        if(moment(intervalTime.beginDate).isValid() && moment(intervalTime.endDate).isValid()) {
            ReportDonationsByCollectionCenter(
                intervalTime.beginDate, 
                intervalTime.endDate,
                collectionCenterSelected.id)
            .then(() => {
                navigation.navigate('HomePageManagerBAMX',{navigation: navigation})
            })
            .catch(() => {
                alert("Ha habido un error durante la generación del reporte")
                navigation.navigate('HomePageManagerBAMX',{navigation: navigation})
            });
                
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
                                <View style = {styles.cardContainer}>
                                    <View>
                                        <Text style = {styles.cardTitle}>{colCenter.name}</Text>
                                        <Text style = {styles.cardSubtitle}>ID: {colCenter.id}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress = {() => selectCC(colCenter)} style = {styles.buttonSelect}>
                                            <Text style = {styles.textButtonSelect}>Seleccionar</Text>
                                        </TouchableOpacity>
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
                    <View style = {styles.container}>
                        <Text style = {styles.titles}>Nombre centro de donación:</Text>
                        <Text style = {styles.textInfo}>{collectionCenterSelected.name}</Text>
                        <Text style = {styles.titles}>ID:</Text>
                        <Text style = {styles.textInfo}>{collectionCenterSelected.id}</Text>
                        <Text style = {styles.titles}>Dirección:</Text>
                        <Text style = {styles.textInfo}>{collectionCenterSelected.address}</Text>
                        <Text style = {styles.titles}>Email:</Text>
                        <Text style = {styles.textInfo}>{collectionCenterSelected.email}</Text>

                        <Text style = {styles.titles}>Desde:</Text>
                        <Text style = {styles.textInfo}>{intervalTime.beginDate}</Text>
                        <Text style = {styles.titles}>Hasta:</Text>
                        <Text style = {styles.textInfo}>{intervalTime.endDate}</Text>
                    </View>
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
        height: "100%",
        backgroundColor: "#fff",
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
        width: "100%",
    },
    button:{
        width: "45%",
        height: 40,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "orange",
        borderRadius: 10,
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
        color: "white",
    },
    box1:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 70,
        backgroundColor: "white",
    },
    cardContent:{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    cardBody: {
        flexDirection: "row"
    },
    cardTitle:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
    },
    cardSubtitle: {
        fontSize: 10,
        width: "100%",
    },
    cardButton:{
        color: "orange",
        height: 40,
        justifyContent: "center",
        flexDirection: "row",
        marginHorizontal: 10,
    },
    cardText:{
        width: "35%",
    },
    searchBar:{
        width: "100%",
        height: 70,
        backgroundColor: "#E8E8E8",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        backfaceVisibility: "hidden"
    },
    cardContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        padding: 10
    },
    buttonSelect:{
        backgroundColor: "#007CFF",
        width: "100%",
        height: 40,
        justifyContent: "center",
        borderRadius: 10,
        
    },
    textButtonSelect:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 5
    },
    titles:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
        marginTop: 10
    },
    textInfo:{
        fontSize: 18,
    },
    container:{
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 20,
    }
});

export default SearcherCC;
import React, {useEffect, useState} from "react"
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native'
import CardsMonetaryDonations from "../../components/cardsDonations/CardsMonetaryDonations";
import { collection, query, where, getDocs } from "firebase/firestore";
import { enviromentVariables } from "../../../utils/enviromentVariables";
import moment from "moment";

const CardsDonationAllUsers = () => {
    const [donationsInfo, setDonationsInfo] = useState(null)
    const {db} = enviromentVariables;

    const renderItem = ({item}) => (   
        <CardsMonetaryDonations
            idDonation = {item.idDonation}
            date = {item.date}
            name = {item.name}
            last4 = {item.last4}
            postalCode = {item.postalCode}
            amount = {item.amount}
        />
    )
    
    const getDonations = async () => {
        const donationInformation = [];
        const querySnapshot = await getDocs(collection(db, "monetary_donation"));
        querySnapshot.forEach((doc) => {
            const { date, name, last4, postalCode, amount } = doc.data()
            donationInformation.push({
                idDonation: doc.id, 
                date: moment(date).format("DD-MM-YY hh:mm:ss"), 
                name, 
                last4, 
                postalCode, 
                amount,
                dateTime: moment(date).valueOf() 
            })
        });
        const donationInformationSorted = [...donationInformation].sort((a, b) => b.dateTime - a.dateTime);
        setDonationsInfo(donationInformationSorted);
    }

    //Hooks
    useEffect(() => {
        getDonations()
    },[])

    return (
        <>
        {
            donationsInfo ? (
                <>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Donaciones</Text>
                    </View>
                    <FlatList
                        data={donationsInfo}
                        renderItem={renderItem}
                        keyExtractor={item => item.idDonation}
                    />     
                </>

            ) : (
                <>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
                    </View>
                </>
            )
        }
        </>
    )
  
}

const styles = StyleSheet.create({
        titleBar: {
        alignItems: "center",
        marginTop: "5%",
        backgroundColor: "#b0bdd0",
        },
        title: {
        fontSize: 25,
        }
    });



export default CardsDonationAllUsers;
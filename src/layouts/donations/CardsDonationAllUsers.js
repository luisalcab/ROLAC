import React, {useEffect, useState} from "react"
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native'
import CardsMonetaryDonations from "../../components/cardsDonations/CardsMonetaryDonations";
import { collection, query, where, getDocs } from "firebase/firestore";
import FBConnection from "../../contexts/FBConnection";
const CardsDonationAllUsers = () => {
    const [donationsInfo, setDonationsInfo] = useState(null)

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
        const querySnapshot = await getDocs(collection(FBConnection.db, "monetary_donation"));
        querySnapshot.forEach((doc) => {
            const { date, name, last4, postalCode, amount } = doc.data()
            donationInformation.push({
                idDonation: doc.id, 
                date, 
                name, 
                last4, 
                postalCode, 
                amount 
            })
        });
        setDonationsInfo(donationInformation);
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
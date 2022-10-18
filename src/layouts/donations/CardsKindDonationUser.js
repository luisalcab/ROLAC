import React, {useEffect, useState, useContext} from "react"
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native'
import CardsKindDonations from "../../components/cardsDonations/CardsKindDonations";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserInformation } from "../../contexts/userInformation";
import {enviromentVariables} from "../../../utils/enviromentVariables";
import moment from "moment";

const CardsKindDonationUser = ({navigation}) => {
    const [donationsInfo, setDonationsInfo] = useState(null)

    const {db} = enviromentVariables;
    
    //Contexts
    const { userInformation, setUserInformation } = useContext(UserInformation);

    const renderItem = ({item}) => (   
        <CardsKindDonations
            idDonation = {item.idDonation}
            date = {item.date}
            collectionCenterName = {item.collectionCenterName}
            items = {item.items}
        />
    )
    
    const getDonationsByID = async (idUser) => {
        const donationInformation = [];

        const q = query(collection(db, "donations_in_kind"), where("donor", "==", idUser));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const { dateTime, collectionCenterName , items } = doc.data()
            donationInformation.push({
                idDonation: doc.id, 
                date: moment(dateTime).format("DD-MM-YY hh:mm:ss"), 
                collectionCenterName,
                items,
                dateTime: moment(dateTime).valueOf()
            })
        });
        
        const donationInformationSorted = [...donationInformation].sort((a, b) => b.dateTime - a.dateTime);
        setDonationsInfo(donationInformationSorted);
    }
    //Hooks
    useEffect(() => {
        getDonationsByID(userInformation.id)
    },[])

    return (
        <>
        {
            donationsInfo ? (
                <>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Donaciones en especie pasadas</Text>
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
            marginTop: "5%"
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
        }
    });



export default CardsKindDonationUser;
import React, { useState, useEffect, useContext } from "react";
// import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const CardsMonetaryDonations = ({idDonation, date, name, last4, postalCode, amount }) => {

    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style = {styles.titleCard}>ID donacion: {idDonation}</Card.Title>
          <Card.Divider style = {styles.divider}/>
          <View>
            <View style={styles.containerRow}>
              <View>
                <Text style = {styles.infoText}>Fecha:</Text>
                <Text style={styles.verticalItems}>{date}</Text>
                <Text style = {styles.infoText}>Nombre:</Text>
                <Text>{name}</Text>
              </View>
              <Text style={styles.amountDonation}>${amount}</Text>
            </View>
            <Card.Divider style = {styles.divider}/>
            <View style={styles.containerRow}>
              <Text style = {styles.infoText}>
                Tarjeta: ...{last4}
              </Text>
              <Text style = {styles.infoText}>C.P: {postalCode}</Text>
            </View>
          </View>
        </Card>
      </View>
    )}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    verticalItems: {
      marginBottom: 3,
    },
    amountDonation: {
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      alignSelf: "center",
      color: "#FF0000",
    },
    containerRow: {
      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: "space-around",
      marginTop: -10,
    },
    card: {
      backgroundColor: "#FFE4D3",
      borderColor: "#EE5E00",
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
    titleBar: {
      alignItems: "center",
      marginTop: "5%",
    },
    title: {
      fontSize: 25,
    },
    divider: {
      borderWidth: 0.5,
      borderColor: "#EE5E00",
    },
    titleCard: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FF8300",
    },
    infoText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#FF8300",
    },
  });

export default CardsMonetaryDonations;
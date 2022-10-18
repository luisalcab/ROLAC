import React, { useState, useEffect, useContext } from "react";
// import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from '@rneui/themed';
import ListKindDonation from "./ListKindDonation";

const CardsKindDonations = ({idDonation, date, collectionCenterName, items }) => {
    const renderItem = ({item}) => (   
      <ListKindDonation
          name = {item.name}
          count = {item.count}
      />
    )

    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title>ID donacion: {idDonation}</Card.Title>
          <View>
            <View style={styles.containerRow}>
              <View>
                <Text>Fecha: {date}</Text>
                <Text style={styles.verticalItems}></Text>
                <Text>Nombre centro de acopio: {collectionCenterName}</Text>
                <Text></Text>
              </View>
            </View>
            <View>
              <Text>Productos</Text>
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={items => items.id}/>
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
      fontSize: 25
    },
    containerRow: {
      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: "space-around" 
    },
    card: {
      backgroundColor: "#bdc2d5",
      borderColor: "#bdc2d5",
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
      backgroundColor: "#b0bdd0",
    },
    title: {
      fontSize: 25,
    }
    });

export default CardsKindDonations;
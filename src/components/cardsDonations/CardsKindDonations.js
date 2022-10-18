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
          <Card.Title style = {styles.titleCard}>ID donacion: {idDonation}</Card.Title>
          <Card.Divider style = {styles.divider}/>
          <View>
            <View style={styles.containerRow}>
              <View>
                <Text style = {styles.infoText}>Fecha:</Text>
                <Text style={styles.verticalItems}>{date}</Text>
                <Text style = {styles.infoText}>Nombre centro de acopio:</Text>
                <Text style={styles.verticalItems}>{collectionCenterName}</Text>
              </View>
            </View>
            <View style = {styles.productsContainer}>
              <Text style = {styles.infoText}>Productos</Text>
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
      alignSelf: "center",
    },
    amountDonation: {
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 25
    },
    containerRow: {
      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: "space-around",
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
      fontSize: 16,
      fontWeight: "bold",
      color: "#FF8300",
      alignSelf: "center",
      marginBottom: 3,
    },
    productsContainer: {
      marginTop: 10,
    },
    });

export default CardsKindDonations;
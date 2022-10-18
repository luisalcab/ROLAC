import React, { useState, useEffect, useContext } from "react";
// import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { View, StyleSheet, Text } from 'react-native';

const ListKindDonation = ({ name, count }) => {
    return (
      <View >
        <Text style={styles.format}>{name}: {count}</Text>
      </View>
)}

const styles = StyleSheet.create({
    format: {
        textAlignVertical: "center",
        textAlign: "left",
        marginLeft: 5,
        fontSize: 16,
        alignSelf: "center",
      }
})    
export default ListKindDonation;
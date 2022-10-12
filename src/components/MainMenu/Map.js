import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { Dialog } from "@rneui/themed";

import firebaseConection from "../../contexts/FBConnection";

import * as Location from 'expo-location';
import { ConsoleSqlOutlined } from "@ant-design/icons";

const Map = () => {
  const [showDialog, setShowDialog] = useState({ state: false });
  const [dialogInformation, setDialogInformation] = useState({
    address: "",
    name: "",
    schedule: {}
  });

  const [collectionCenter, setCollectionCenter] = useState([]);

  const [initialPosition, setInitialPosition] = useState(null); 

  async function getColletionCenterPositions() {
    const collCenter = [];
    const querySnapshot = await getDocs(collection(firebaseConection.db, "collection_center"));

    querySnapshot.forEach((docs) => {
      const { address, dates, name, email, latitude, longitude } =
        docs.data();
      collCenter.push({
        id: docs.id,
        address,
        dates,
        name,
        email,
        latitude,
        longitude,
      });
    });
    
    setCollectionCenter(collCenter);
  }
  
  showPosition = (position) => { 
    setInitialPosition({
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  };

  findCoordinates = () => {
    Location.installWebGeolocationPolyfill()
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  useEffect(() => {
    function originCoordinates() {
      findCoordinates()  
    }

    getColletionCenterPositions();
    originCoordinates()
  }, []);

  const displayDialog = (data) => {
    setShowDialog({ state: true });
    setDialogInformation({
      address: data.address,
      name: data.name,
      schedule: data.dates
    });
  };

  const hideDialog = () => {
    setShowDialog({ state: false });
    setDialogInformation({
      address: "",
      name: "",
      schedule: {}
    });
  };

  const dialog = () => {
    
    var activeDays = "" 
    var daysInOrder = {
      lunes: { close: "", open: "", name: "Lunes" },
      martes: { close: "", open: "", name: "Martes" },
      miercoles: { close: "", open: "", name: "Miercoles" },
      jueves: { close: "", open: "", name: "Jueves" },
      viernes: { close: "", open: "", name: "Viernes" },
      sabado: { close: "", open: "", name: "Sabado" },
      domingo: { close: "", open: "", name: "Domingo" }
    }

    for (const iterator in dialogInformation.schedule) {
      if(dialogInformation.schedule[iterator].open != null){
        daysInOrder[iterator].open = dialogInformation.schedule[iterator].open 
        daysInOrder[iterator].close = dialogInformation.schedule[iterator].close 
      }
    }

    for (const iterator in daysInOrder) {
      if(daysInOrder[iterator].open != ""){
        activeDays += `- ${daysInOrder[iterator].name}: ${daysInOrder[iterator].open} a ${daysInOrder[iterator].close} \n`
      }
    }

    return (
      <Dialog isVisible={showDialog.state}>
        <Dialog.Title title={dialogInformation.name} />
        <View>
          <Text>
            {`
          Dirección: 
${dialogInformation.address}
          Horario:
${activeDays}
          `}
          </Text>
        </View>
        <Button
          title="Confirmar"
          onPress={() => hideDialog()}
          color="#0E4DA4"
        />
      </Dialog>
    );
  };

  return (
    <>
      {dialog()}
      {initialPosition ? (
        <MapView
          initialRegion={initialPosition}
          style={styles.map}>
          {collectionCenter.map((marker) => {
            return (
              <Marker
                title={marker.name}
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => {
                  displayDialog(marker);
                }}
              />
            );
          })}
        </MapView>
      ) : (
        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
      </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
    borderRadius: 10
  },
});

export default Map;
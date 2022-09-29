import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { Dialog } from "@rneui/themed";

import firebaseConection from "../../contexts/FBConnection";

const Map = () => {
  const [showDialog, setShowDialog] = useState({ state: false });
  const [dialogInformation, setDialogInformation] = useState({
    address: "",
    name: "",
    schedule: {}
  });
  const [origin, setOrigin] = useState({
    latitude: 20.677505759857546,
    longitude: -103.34068998874568,
  });

  const [collectionCenter, setCollectionCenter] = useState([]);

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

  useEffect(() => {
    getColletionCenterPositions();
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
      lunes: {
        close: "",
        open: "",
        name: "Lunes"
      },
      martes: {
        close: "",
        open: "",
        name: "Martes"
      },
      miercoles: {
        close: "",
        open: "",
        name: "Miercoles"
      },
      jueves: {
        close: "",
        open: "",
        name: "Jueves"
      },
      viernes: {
        close: "",
        open: "",
        name: "Viernes"
      },
      sabado: {
        close: "",
        open: "",
        name: "Sabado"
      },
      domingo: {
        close: "",
        open: "",
        name: "Domingo"
      }
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
      <MapView
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        {collectionCenter.map((marker) => {
          const data = `
            Dirección: ${marker.address}
        `;
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
    height: "60%",
  },
});

export default Map;

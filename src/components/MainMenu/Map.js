import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import firebaseConection from "../../contexts/FBConnection";

const Map = (props) => {
  const [origin, setOrigin] = useState({
    latitude: 20.677505759857546,
    longitude: -103.34068998874568,
  });

  const [collectionCenter, setCollectionCenter] = useState([]);

  async function getColletionCenterPositions() {
    const collCenter = [];
    const querySnapshot = await getDocs(
      collection(firebaseConection.db, "collection_center")
    );
    querySnapshot.forEach((docs) => {
      const { address, collection_center_name, email, latitude, longitude } =
        docs.data();
      collCenter.push({
        id: docs.id,
        address,
        collection_center_name,
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

  return (
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
        ` 
          return (
            <Marker
              title={marker.collection_center_name}
              description={
                `Dirección: ${marker.address}`
              }
              // description={`
              //   Dirección: ${marker.address}
              //   Horario:
              //     - Lunes: 8:00am a 3:00pm
              //     - Martes: 8:00am a 3:00pm
              //     - Viernes: 8:00am a 3:00pm
              //     - Sabados: 10:00am a 12:00pm 
              // `}
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          );
        })}
      </MapView>
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

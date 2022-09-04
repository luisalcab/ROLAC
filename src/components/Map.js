import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = (props) => {
    const [origin, setOrigin] = useState({
        latitude: 20.677505759857546, 
        longitude: -103.34068998874568
      })
    
      const [centrosAcopios, setCentrosAcopios] = useState(
        [
          {
            email: "condesa@gmail.com",
            nombre_centro_acopio: "Restaurante los mariscos",
            latitude: 20.675237951512248,
            longitude: -103.34186837792956,
            titulo: "Banco de alimentos, Av: Juarez #1154, Centro"
          },
          {
            email: "marisa@gmail.com",
            nombre_centro_acopio: "Pasteleria marisa",
            latitude: 20.682694457839702,
            longitude: -103.35111425100558,
            titulo: "Pasteleria marisa, Av: Carlomonte #1023, Centro"
          },
          {
            email: "bruh@gmail.com",
            nombre_centro_acopio: "Restaurante los bruh",
            latitude: 20.68193031405546,
            longitude: -103.34331164659167,
            direccion: "Bruh, Av: Garibaldi #4789, Agua azul"
          }
        ]
      )
      
      return (
        <View style={styles.container}>      
            <MapView
            initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            style = {styles.map}>    
                {
                    centrosAcopios.map(marker => {
                        return (
                        <Marker 
                        // title={centroAcopio.titulo}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        />
                        )
                    })
                }
            </MapView>    
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: '100%',
        height: '50%',
        flex: 1
    
      }
    })

export default Map
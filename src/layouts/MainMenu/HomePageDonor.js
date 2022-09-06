import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  Button,
  ViewStyle,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon, Overlay } from "@rneui/base";
import Map from "../../components/MainMenu/Map.js";

const HomePageDonor = (props) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)
  return (
    <View>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => alert("Vista para generar QR")}>
          <Icon name="qrcode" type="font-awesome" size={50} />
        </TouchableOpacity>

        <Text style={styles.title}>Hola {props.route.params.userAuth.currentUser.email}</Text>

        <TouchableOpacity
          onPress={() => 
              props.navigation.navigate('ManagerDonorComponent', {userId: props.route.params.userAuth})}
        >
          <Icon name="user" type="font-awesome" size={50} />
        </TouchableOpacity>
        {/* <Button 
                title="Foto para ir a administrar usuario"
                onPress={() => alert("Catalogo donacion")} />               */}
      </View>
      <View style={styles.positionTitle}>
        <Text style={styles.title}>Centros de acopio disponisbles</Text>
      </View>
      <Map style={styles.map} />
      <View>
        <View style={styles.positionTitle}>
          <Text style={styles.title}>Opciones de donaciones</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => alert("Catalogo donacion monetaria")}
          >
            <Icon name="fast-food-outline" type="ionicon" size={50} />
            <Text>Donacion monetaria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Catalogo donacion monetaria")}
          >
            <Icon name="basket-outline" type="ionicon" size={50} />
            <Text>Donacion en especie</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    height: "75%",
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    paddingTop: 5,
  },
  positionTitle: {
    alignItems: "center",
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomePageDonor;

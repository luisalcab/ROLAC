import React, {useContext} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/base";
import Map from "../../components/MainMenu/Map.js";
import { UserInformation } from "../../contexts/userInformation.js";
import { getAuth, signOut } from "firebase/auth";


const HomePageDonor = ({navigation}) => {
  const {userInformation, setUserInformation} = useContext(UserInformation);
  
  return (
    <View>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => { navigation.navigate('QRScanner', {navigation: navigation}) }}>
          <Icon name="qrcode" type="font-awesome" size={50} />
        </TouchableOpacity>

        <Text style={styles.title1}>Hola {userInformation.name}</Text>

        <TouchableOpacity
        onPress={() => {
          const auth = getAuth();
          signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Login', {navigation: navigation})
          }).catch((error) => {
            // An error happened.
            navigation.navigate('Login', {navigation: navigation})
          });

        }}
        >
          <Icon name="door-open" type="material-community" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('ManagerDonorComponent', {navigation: navigation})}
        >
          <Icon name="user" type="font-awesome" size={50} />
        </TouchableOpacity>
      </View>
      <View style={styles.positionTitle}>
        <Text style={styles.title2}>Centros de Donación disponibles</Text>
      </View>
      <Map style={styles.map} />
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ItemSelector", {kind: false})}
            style={styles.button}
          >
            <Icon name="fast-food-outline" type="ionicon" size={70} />
            <Text style={styles.textBt}>Donación monetaria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ItemSelector", {kind: true})}
            style={styles.button}
          >
            <Icon name="basket-outline" type="ionicon" size={70} />
            <Text style={styles.textBt}>Donación en especie</Text>
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
    justifyContent: "center"
  },
  map: {
    width: "100%",
    height: "60%",
    position: "relative",
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
  },
  title1: {
    fontSize: 25,
    paddingTop: 5,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  positionTitle: {
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
    top: 20,
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overlay: {
    backgroundColor: "#fff"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 150,
    height: 150,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
  },
  textBt: {
    fontSize: 20,
    textAlign: "center",
  }
});

export default HomePageDonor;

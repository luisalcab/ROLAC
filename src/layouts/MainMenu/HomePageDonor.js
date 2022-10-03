import React, {useContext, useEffect, useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon, Dialog, Overlay } from "@rneui/base";
import { Button } from "react-native";
import Map from "../../components/MainMenu/Map.js";
import { UserInformation } from "../../contexts/userInformation.js";
import { getAuth, signOut } from "firebase/auth";
import FBConnection from "../../contexts/FBConnection.js"; 
import { getDocs, collection } from "firebase/firestore";
import { ItemsContext } from "../../contexts/ItemsContext.js";
import { CartContext } from "../../contexts/CartContext.js";

const HomePageDonor = ({navigation}) => {
  const {cart, setCart} = useContext(CartContext);
  const {userInformation, setUserInformation} = useContext(UserInformation);
  const {items, setItems} = useContext(ItemsContext);


  const [showDialog, setShowDialog] = useState({ state: false });

  const getItems = async () => {
    const collectionItems = [];
    const querySnapshot = await getDocs(collection(FBConnection.db, "products"));

    querySnapshot.forEach(item => {
      const {values, imageURL} = item.data();
      collectionItems.push({
        id: item.id,
        name: values.name,
        source: imageURL,
        unit: values.unit,
        urgent: values.urgent,
        cost: values.cost
      })
    });
    
    setItems(collectionItems)
  }

  useEffect(() => {
    getItems();
  },[]);

  console.log("En homepage: ", userInformation);

  return (
    <View>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => { navigation.navigate('QRGenerator', {navigation: navigation}) }}>
          <Icon name="qrcode" type="font-awesome" size={50} />
        </TouchableOpacity>
        {/* {props.route.params.userAuth.currentUser.email} */}
        <Text style={styles.title}>Hola {userInformation.name}</Text>

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
        {/* <Button 
                title="Foto para ir a administrar usuario"
                onPress={() => alert("Catalogo donacion")} />               */}
      </View>
      <View style={styles.positionTitle}>
        <Text style={styles.title}>Centros de acopio disponibles</Text>
      </View>
      <Map style={styles.map} />
      <View>
        <View style={styles.positionTitle}>
          <Text style={styles.title}>Opciones de donaciones</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ItemSelector")}
          >
            <Icon name="fast-food-outline" type="ionicon" size={50} />
            <Text>Donación monetaria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Vista donacion especie")}
          >
            <Icon name="basket-outline" type="ionicon" size={50} />
            <Text>Donación en especie</Text>
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
  overlay: {
    backgroundColor: "#fff"
  }
});

export default HomePageDonor;

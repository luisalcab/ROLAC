import React, { useContext, useEffect } from "react";
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
import { getAuth, signOut } from "firebase/auth";
import { PdfDocDefinitionContext } from "../../contexts/PdfDocDefinitionContext";


const HomePageManagerBAMX = ({navigation}) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)

  return (
    <View>
        <Text>Vista adminstrador BAMX</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('ManagerAdminComponent', {navigation: navigation})}
        >
          <Icon name="user" type="font-awesome" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('AdminRegister', {navigation: navigation})}
        >
          <Icon name="user-plus" type="font-awesome" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Reports', {navigation: navigation})}
        >
          <Icon name="description" type="material" size={50} />
        </TouchableOpacity>
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

export default HomePageManagerBAMX;

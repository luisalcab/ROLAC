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

const HomePageCollectionCenter = (props) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)
  return (
    <View>
        <Text>Vista adminstrador BMAX</Text>
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

export default HomePageCollectionCenter;

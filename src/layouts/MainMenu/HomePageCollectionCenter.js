import React, {useContext} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon, Overlay } from "@rneui/base";
import { UserInformation } from "../../contexts/userInformation.js";
import { getAuth, signOut } from "firebase/auth";

const HomePageCollectionCenter = ({navigation}) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)
  const {userInformation, setUserInformation} = useContext(UserInformation);
  return (
    <View>
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
          }}>
        <Icon name="door-open" type="material-community" size={50} />
        </TouchableOpacity>
        <Text>Vista centro de acopio</Text>
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
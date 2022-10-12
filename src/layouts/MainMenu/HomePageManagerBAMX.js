import React, {useState, useContext} from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import { UserInformation } from "../../contexts/userInformation.js";

const HomePageManagerBAMX = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const {userInformation, setUserInformation} = useContext(UserInformation);

  return (
    <View>
        <View style={styles.containerNav}>
          <Text style={styles.title1}>Hola {userInformation.name}</Text>
          <Dropdown
            data={[
              {
                label: "Perfil",
                onPress: () => {
                  setRefresh(!refresh);
                  navigation.navigate('ManagerAdminComponent', {navigation: navigation})
                }
              },
              {
                label: "Cerrar sesión",
                onPress: () => {
                  setRefresh(!refresh);
                  const auth = getAuth();
                  signOut(auth).then(() => {
                    // Sign-out successful.
                    navigation.navigate('Login', {navigation: navigation})
                  }).catch((error) => {
                    // An error happened.
                    navigation.navigate('Login', {navigation: navigation})
                  });
                }
              }
            ]}
            style={styles.dropdown}
            labelField="label"
            value="label"
            onChange={(item) => item.onPress()}
            placeholder={
              <View style={styles.placeholderContainer}>
                <Icon name="user" type="font-awesome" />
                <Text style={styles.textDrop}>Cuenta</Text>
              </View>
            }
            valueField={
              <View style={styles.valueContainer}>
                <Icon name="user" type="font-awesome" />
                <Text style={styles.textDrop}>Cuenta</Text>
              </View>
            }
          />
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate('AdminRegister', {navigation: navigation})}
        style={styles.button}
        >
          <Icon name="user-plus" type="font-awesome" size={55}/>
          <Text style={styles.textButton}>Registrar administrador</Text>
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
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title1: {
    fontSize: 25,
    paddingTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
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
  dropdown: {
    width: 100,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
  },
  placeholderContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  textDrop: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 2,
  },
  button : {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: "row",
    width: "50%",
    height: 100,
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 10,
  },
});

export default HomePageManagerBAMX;

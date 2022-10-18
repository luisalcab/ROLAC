import React, {useContext, useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon} from "@rneui/base";
import {CCContext} from "../../contexts/CCContext";
import { getAuth, signOut } from "firebase/auth";
import { Dropdown } from "react-native-element-dropdown";

const HomePageCollectionCenter = ({navigation}) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)
  const {CCUser, getCCData} = useContext(CCContext);
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getInfo = async() => {
      const data = await getCCData();
      setName(data.name);
    }
    getInfo();
  }, [])

  return (
    <View>
      <Text style={styles.title1}>{name}</Text>
      <View style = {styles.containerNav}>
        <Text style={styles.title2}>Bienvenid@</Text>
        <Dropdown
          data={[
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
      <View style={styles.bttsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("CCEdit")
            setRefresh(!refresh);
          }}
        >
          <Icon
            name="edit"
            type="material"
            size={35}
            color="black"
          />
          <Text style={styles.textBt}>Editar información</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("QRScanner")
            setRefresh(!refresh);
          }}
        >
          <Icon
            name="qrcode" 
            type="font-awesome"
            size={35}
            color="black"
          />
          <Text style={styles.textBt}>Escanear código QR</Text>
        </TouchableOpacity>
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
  title1: {
    fontSize: 20,
    paddingTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    textAlign: "center",
    height: 40,
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
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
    height: 150,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    marginTop: 20,
    alignSelf: "center",
  },
  textBt: {
    fontSize: 25,
    textAlign: "center",
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
  bttsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
});

export default HomePageCollectionCenter;
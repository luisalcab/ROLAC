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
import { Alert, ScrollView } from "react-native";

const HomePageManagerBAMX = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const {userInformation, setUserInformation} = useContext(UserInformation);

  return (
    <View>
      <ScrollView>
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
        <View>
          <View style={styles.containerBox}>
            <TouchableOpacity
            onPress={() => navigation.navigate('AdminRegister', {navigation: navigation})}
            style={styles.button}
            >
              <Icon name="user-plus" type="font-awesome" size={55}/>
              <Text style={styles.textButton}>Registrar administrador</Text>
            </TouchableOpacity>
          </View>  
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Centros de Donación</Text>
            <View style={styles.containerBtt}>
              <TouchableOpacity
              onPress={() => Alert.alert('En construcción')}
              style={styles.button}
              >
                <Icon name="bookmark" type="font-awesome" size={55}/>
                <Text style={styles.textButton}>Solicitudes de registro</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => Alert.alert('En construcción')}
              style={styles.button}
              >
                <Icon name="update" type="material-community-icons" size={55}/>
                <Text style={styles.textButton}>Solicitudes de actualización</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBtt}>
              <TouchableOpacity
              onPress={() => Alert.alert('En construcción')}
              style={styles.button}
              >
                <Icon name="building" type="font-awesome-5" size={55}/>
                <Text style={styles.textButton}>Centros de Donación</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Donaciones</Text>
            <View style={styles.containerBtt}>
              <TouchableOpacity
              onPress={() => Alert.alert('En construcción')}
              style={styles.button}
              >
                <Icon name="money" type="font-awesome" size={55}/>
                <Text style={styles.textButton}>Donaciones monetarias</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => Alert.alert('En construcción')}
              style={styles.button}
              >
                <Icon name="text-document" type="entypo" size={55}/>
                <Text style={styles.textButton}>Reportes donaciones pendientes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBtt}>
                <TouchableOpacity
                onPress={() => Alert.alert('En construcción')}
                style={styles.button}
                >
                  <Icon name="text-document" type="entypo" size={55}/>
                  <Text style={styles.textButton}>Reportes por Centro</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Productos</Text>
            <View style={styles.containerBtt}>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Administración de productos', {navigation: navigation})
                setRefresh(!refresh)
              }}
              style={styles.button}
              >
                <Icon name="shopping-basket" type="font-awesome" size={50}/>
                <Text style={styles.textButton}>Administración de productos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: "49%",
    height: 100,
    alignItems: "center",
    marginTop: 10,
  },
  textButton: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 10,
    width: "60%",
  },
  title2: {
    fontSize: 25,
    paddingTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  containerBtt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  containerBox: {
    marginBottom: 20,
  },
});

export default HomePageManagerBAMX;

import React, {useState, useContext, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Icon } from "@rneui/base";
import { getAuth, signOut } from "firebase/auth";
import { Dropdown } from "react-native-element-dropdown";
import { UserInformation } from "../../contexts/userInformation.js";
import { Alert, ScrollView } from "react-native";
import {BAMXContext} from "../../contexts/BAMXContext";
import {Badge} from "react-native-elements";
import ReportColltionsPending from '../../components/PdfGenerator/ReportCollectionsPending';
const screen = Dimensions.get("window");


const HomePageManagerBAMX = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const {userInformation, setUserInformation} = useContext(UserInformation);
  const {docsNum, editRequestsNum} = useContext(BAMXContext);

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
            <View style={styles.containerBtts}>
              <TouchableOpacity
              onPress={() => navigation.navigate('AdminRegister', {navigation: navigation})}
              style={styles.button}
              >
                <Icon name="user-plus" type="font-awesome" size={55}/>
                <Text style={styles.textButton}>Registrar administrador</Text>
              </TouchableOpacity>
            </View>
          </View>  
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Centros de Donación</Text>
            <View style={styles.containerBtts}>
              <TouchableOpacity
              onPress={() => navigation.navigate("CCRequest")}
              style={styles.button}
              >
                {(docsNum !== null) ? (
                  <>
                    <Icon name="user-check" type="feather" size={55}/>
                    <Text style={styles.textButton}>Solicitudes de registro</Text>
                    <Badge
                      value={docsNum}
                      status="error"
                      containerStyle={styles.badge}
                    />
                  </>
                ) : (
                  <>
                    <Icon name="user-check" type="feather" size={55}/>
                    <Text style={styles.textButton}>Solicitudes de registro</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate("CCEditRequest")}
              style={styles.button}
              >
                {(editRequestsNum !== null) ? (
                  <>
                    <Icon name="update" type="material-community-icons" size={55}/>
                    <Text style={styles.textButton}>Solicitudes de actualización</Text>
                    <Badge
                      value={editRequestsNum}
                      status="error"
                      containerStyle={styles.badge}
                    />
                  </>
                ) : (
                  <>
                    <Icon name="update" type="material-community-icons" size={55}/>
                    <Text style={styles.textButton}>Solicitudes de actualización</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.containerBtts}>
              <TouchableOpacity
              onPress={() => navigation.navigate("ViewCC")}
              style={styles.button}
              >
                <Icon name="building" type="font-awesome-5" size={55}/>
                <Text style={styles.textButton}>Centros de Donación</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Productos</Text>
            <View style={styles.containerBtts}>
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
          <View style={styles.containerBox}>
            <Text style={styles.title2}>Donaciones</Text>
            <View style={styles.containerBtts}>
              <TouchableOpacity
              onPress={() => navigation.navigate("CardsDonationAllUsers", {navigation: navigation})}
              style={styles.button}
              >
                <Icon name="money" type="font-awesome" size={55}/>
                <Text style={styles.textButton}>Donaciones monetarias</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => ReportColltionsPending()}
              style={styles.button}
              >
                <Icon name="text-document" type="entypo" size={55}/>
                <Text style={styles.textButton}>Reportes donaciones pendientes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBtts}>
                <TouchableOpacity
                onPress={() => navigation.navigate("SearcherCC", {navigation: navigation})}
                style={styles.button}
                >
                  <Icon name="text-document" type="entypo" size={55}/>
                  <Text style={styles.textButton}>Reportes por Centro</Text>
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
    marginTop: screen.height * 0.01,
    marginHorizontal: screen.width * 0.03,
    marginBottom: screen.height * 0.01
  },
  title1: {
    fontSize: screen.fontScale * 25,
    paddingTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  positionTitle: {
    alignItems: "center",
  },
  buttonContainer: {
    margin: screen.width * 0.03,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    width: screen.width * 0.25,
    height: screen.height * 0.05,
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
    fontSize: screen.fontScale * 15,
    fontWeight: "bold",
    marginLeft: 2,
  },
  button : {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: "row",
    width: screen.width * 0.47,
    height: screen.height * 0.10,
    alignItems: "center",
    marginTop: screen.height * 0.01,
  },
  textButton: {
    fontSize: screen.fontScale * 14,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: screen.width * 0.02,
    width: screen.width * 0.26,
  },
  title2: {
    fontSize: screen.fontScale * 20,
    paddingTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: screen.height * 0.01,
  },
  containerBtts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: screen.width * 0.02,
  },
  containerBox: {
    marginBottom: screen.height * 0.02,
  },
  badge: {
    position: "absolute",
    zIndex: screen.width * 0.01,
    top: -4,
    right: -4,
  },
});

export default HomePageManagerBAMX;

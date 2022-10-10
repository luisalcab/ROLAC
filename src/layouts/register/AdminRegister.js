import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image
} from "react-native";
import AdminRegisterComponent from "../../components/registers/AdminRegisterComponent";

const AdminRegister = ({navigation}) => {
  return (
    <View style={styles.screen}>
        <Text style={styles.title}>Agregar administrador</Text>
        <AdminRegisterComponent navigation={ navigation }/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: "flex-start",
      width: "100%",
      height: "100%"
  },
  title: {
      fontSize: 25,
      marginLeft: "20%",
      marginTop: "5%",
      marginBottom: "10%"
  }
})

export default AdminRegister;
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions
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

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: "flex-start",
      width: screen.width*1,
      height: screen.height*1,
  },
  title: {
      fontSize: screen.fontScale*20,
      fontWeight: "bold",
      alignSelf: "center",
      marginTop: screen.height*0.02,
      marginBottom: screen.height*0.02
  }
})

export default AdminRegister;
import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Touchable,
  Text,
  
} from "react-native";
import { Formik } from "formik";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import firebaseConection from "../contexts/firebaseConection";

const ManagerCollectCenterComponent = (props) => {
  const [manager, setManager] = useState({
    id: "",
    email: "",
    lastName: "",
    name: "",
    password: "",
    status: "",
  });

  const weekDays = [
    "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" 
  ]

  useEffect(() => {
    async function getManagerById(id) {
      // console.log(id)
      const querySnapshot = await getDoc(
        doc(firebaseConection.db, "BAMXmanager", id)
      );
      const manager = querySnapshot.data();
  
      // console.log(manager)
      setManager({
        email: manager.email,
        lastName: manager.lastName,
        name: manager.name,
        password: manager.password,
        status: manager.status,
        id: querySnapshot.id,
      });
    }
    
    // getManagerById(props.route.params.managerId)
    getManagerById("Or6zy1CKR01sqwDaoZJL");
  }, []);

  

  const updateManager = async () => {
    await updateDoc(doc(firebaseConection.db, "BAMXmanager"));
  };

  console.log(weekDays)
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          latitude: '',
          longitude: '',
        }}
        onSubmit={(values) => alert("Actualizar")}
        >
        
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView>
            <View style={styles.container}>
              <Text>Nombre(s) actuales</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
              </View>
              <Text>Apellidos actuales</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Last name"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
              </View>
              <Text>Email actual</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <Text>Latitude</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Latitude"
                  onChangeText={handleChange("Latitude")}
                  onBlur={handleBlur("Latitude")}
                  value={values.Latitude}
                />
              </View>
              <Text>longitude</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Longitude"
                  onChangeText={handleChange("Longitude")}
                  onBlur={handleBlur("Longitude")}
                  value={values.password}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button color="#0E4DA4" onPress={handleSubmit} title="Submit" />
                <Button color="#E74C3C" onPress={() => alert("Hello world")} title="Eliminar cuenta" />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputGroup: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 3,
    marginTop: 5
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ManagerCollectCenterComponent;
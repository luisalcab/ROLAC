import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";

import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseConection from "../contexts/firebaseConection";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const ManagerAdminComponent = (props) => {
  const [manager, setManager] = useState(null);

  useEffect(() => {
    async function getManagerById(id) {
      const querySnapshot = await getDoc(
        doc(firebaseConection.db, "BAMXmanager", id)
      );
      
      const { email, lastName, name, password } = querySnapshot.data();
  
      setManager({
        id: querySnapshot.id,
        email,
        lastName,
        name,
        password,
      });
    }
    // getManagerById(props.route.params.managerId)
    getManagerById("rm4RUTDqRwe2hPiiMGy6");
  }, []);



  const updateManager = async (value) => {
    if(value.name!=''){ manager.name = value.name; }
    if(value.lastName!=''){ manager.lastName = value.lastName }
    if(value.email!=''){ manager.email = value.email }
    if(value.password!=''){ manager.password = value.password }

    await updateDoc(doc(firebaseConection.db, "BAMXmanager", "rm4RUTDqRwe2hPiiMGy6"),
    {
      name: manager.name,
      lastName: manager.lastName,
      email: manager.email,
      password: manager.password
    });

    alert("Se ha actualizado la información")
    
  };

  const removeManager = async() => {
    await deleteDoc(doc(firebaseConection.db, 'BAMXmanager', "rm4RUTDqRwe2hPiiMGy6"))
    alert('Usuario borrado exitosamente')
  }


  return (
    <>
    {
      (manager ? 
        <Formik
        initialValues={manager}
        onSubmit={(values) => updateManager(values)}
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
              <Text>Contraseña actual</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button color="#0E4DA4" onPress={handleSubmit} title="Actulizar" />
                <Button color="#E74C3C" onPress={() => removeManager()} title="Eliminar cuenta" />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
      :
      (        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
      </View>)        
        )
    }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },  
  loader: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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

export default ManagerAdminComponent;

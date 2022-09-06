import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import firebaseConection from "../../contexts/FBConnection";

const ManagerDonorComponent = (props) => {
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    async function getManagerById(id) {
      const querySnapshot = await getDoc(
        doc(firebaseConection.db, "donor", id)
      );
      const { email, lastName, name, password } = querySnapshot.data();

      setDonor({
        id: querySnapshot.id,
        email,
        lastName,
        name,
        password,
      });
    }
    // getManagerById(props.route.params.managerId)
    getManagerById(props.route.params.userId.currentUser.uid);
  }, []);

  const updateDonor = async (value) => {
    if (value.name != "") {
      donor.name = value.name;
    }
    if (value.lastName != "") {
      donor.lastName = value.lastName;
    }
    if (value.email != "") {
      donor.email = value.email;
    }

    await updateDoc(
      doc(firebaseConection.db, "donor", props.route.params.userId.currentUser.uid),
      {
        name: donor.name,
        lastName: donor.lastName,
        email: donor.email,
      }
    );

    alert("Se ha actualizado la información");
    // props.navigation.navigate('HomePageDonor');
  };

  const removeManager = async () => {
    await deleteDoc(doc(firebaseConection.db, "donor", props.route.params.userId.currentUser.uidr));
    alert("Usuario borrado exitosamente");
    props.navigation.navigate('HomePageDonor');
  };

  return (
    <>
      {donor ? (
        <Formik
          initialValues={donor}
          onSubmit={(values) => updateDonor(values)}
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
                <View style={styles.buttonContainer}>
                  <Button
                    color="#0E4DA4"
                    onPress={handleSubmit}
                    title="Actualizar"
                  />
                  <Button
                    color="#E74C3C"
                    onPress={() => removeManager()}
                    title="Eliminar cuenta"
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
        </View>
      )}
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
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 3,
    marginTop: 5,
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ManagerDonorComponent;

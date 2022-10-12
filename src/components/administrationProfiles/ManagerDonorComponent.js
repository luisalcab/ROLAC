import React, { useState, useEffect, useContext } from "react";
import {
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Input, Icon, Dialog, Button } from "@rneui/themed";
import { Formik } from "formik";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebaseConection from "../../contexts/FBConnection";
import { UserInformation } from "../../contexts/userInformation";
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from "react-native";

const ManagerDonorComponent = ({ navigation }) => {
  //Initialize auth instance
  const auth = getAuth();

  //Contexts
  const { userInformation, setUserInformation } = useContext(UserInformation);

  //useState
  const [donor, setDonor] = useState(null);
  const [userValidation, setUserValidation] = useState({
    email: "",
    password: "",
  });
  const [showDialog, setShowDialog] = useState({ state: false });

  //Functions
  const handleChangeText = (name, value) => {
    setUserValidation({ ...userValidation, [name]: value });
  };

  const displayDialog = () => {
    setShowDialog({ state: true });
  };

  const hideDialog = () => {
    setShowDialog({ state: false });
  };

  const getManagerById = async (id) => {
    await getDoc(doc(firebaseConection.db, "donor", id))
    .then((querySnapshot) => {
      const { lastName, name } = querySnapshot.data();
  
      setDonor({
        uid: querySnapshot.id,
        email: userInformation.auth.currentUser.email,
        lastName,
        name,
      });
    })
    .catch(() => {
      Alert.alert(
        "Error", 
        "Ha habido un error, intente de nuevo mas tarde",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
          }
        ]
      );
    });
  };

  const updateDonor = async (value) => {
    const { email, uid, lastName, name } = value;

    if(email != donor.email){
      updateEmail(userInformation.auth.currentUser, email).catch(() => {
        Alert.alert(
          "Error",
          "Ha habido un error, intente de nuevo mas tarde",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
            }
          ]
        );
      });
    }

    if(name != donor.name || lastName != donor.lastName){
      await updateDoc(doc(firebaseConection.db, "donor", uid), {
        name: name,
        lastName: lastName,
      })
      .then(() => {
          setUserInformation({
            ...userInformation,
            name: name,
            lastName: lastName,
          });
        })
        .catch((error) => {
          Alert.alert(
            "Error",
            "Ha habido un error al actualizar los datos, intente de nuevo mas tarde",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
              }
            ]
          );
        });
    } 
    
    Alert.alert(
      "Información actualizada",
      "Se ha actualizado la información",
      [
        {
          text: "ACEPTAR",
          onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
        }
      ]
    );
  };

  const removeManager = async () => {
    hideDialog();
    const { email, password } = userValidation;

    const credential = await EmailAuthProvider.credential(email, password);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then((userCredential) => {
        userCredential.user.delete().then(() => {
          deleteDoc(
            doc(firebaseConection.db, "donor", userInformation.uid)
          ).then(() => {
            Alert.alert(
              "Usuario borrado exitosamente",
              "Se ha borrado el usuario",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Login")
                }
              ]
            );
          });
        });
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Ha ocurrido un error durante el proceso de eliminación del usuario",
          [
            {
              text: "OK",
            }
          ]
        );
      });
  };

  const sendEmailRecoverPassword = () => {
    //Por alguna razón no funciona con el correo institucional "@tec"
    sendPasswordResetEmail(
      userInformation.auth,
      userInformation.auth.currentUser.email
    )
      .then(() => {
        Alert.alert(
          "Correo enviado",
          `Se ha enviado un correo a ${userInformation.auth.currentUser.email} para actualizar tu contraseña, revisa tu bandeja de spam`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
            }
          ]
        );
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Ha ocurrido un error durante el proceso de actualización de contraseña",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomePageDonor", { navigation: navigation })
            }
          ]
        );
      });
  };

  const pastDonation = () => {
    navigation.navigate('CardsDonationUser', {navigation: navigation})
  }
  //Hooks
  useEffect(() => {
    getManagerById(userInformation.uid);
  }, []);

  return (
    <>
      <Dialog isVisible={showDialog.state}>
        <Dialog.Title title="Verificación de usuario" />
        <View>
          <TextInput
            placeholder="Email actual"
            placeholderTextColor={"#000"}
            onChangeText={(value) => handleChangeText("email", value)}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View>
          <TextInput
            placeholder="Contraseña actual"
            placeholderTextColor={"#000"}
            onChangeText={(value) => handleChangeText("password", value)}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Borrar"
            onPress={() => removeManager()}
            color="#E74C3C"
            style={styles.button}
            titleStyle={{ color: "#fff", fontWeight: "bold" }}
          />
          <Button
            title="Cancelar"
            onPress={() => hideDialog()}
            color="#0E4DA4"
            style={styles.button}
            titleStyle={{ color: "#fff", fontWeight: "bold" }}
          />
        </View>
      </Dialog>
      {donor ? (
        <Formik
          initialValues={donor}
          onSubmit={(values) => updateDonor(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll = {true}
            extraHeight = {10}
            extraScrollHeight = {10}>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre(s) actual(es)</Text>
                  <Input
                    placeholder="Name"
                    leftIcon={<Icon type="material" name="person"/>}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <Text style={styles.label}>Apellido(s) actual(es)</Text>
                  <Input
                    placeholder="Last name"
                    leftIcon={<Icon type="material" name="people"/>}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  <Text style={styles.label}>Email actual</Text>
                  <Input
                    placeholder="Email"
                    leftIcon={<Icon type="material" name="mail"/>}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    buttonStyle = {{
                      borderRadius: 10,
                      backgroundColor: "#0E4DA4",
                      width: 200,
                      elevation: 24,
                    }}
                    onPress={handleSubmit}
                    title="Actualizar"
                    titleStyle={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <Button
                    buttonStyle = {{
                      borderRadius: 10,
                      backgroundColor: "#E74C3C",
                      shadowColor: "#000"
                    }}
                    onPress={() => displayDialog()}
                    title="Eliminar cuenta"
                    titleStyle={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View>
                  <Button
                    buttonStyle = {{
                      borderRadius: 10,
                      backgroundColor: "#0E4DA4",
                      marginHorizontal: "5%",
                      shadowColor: "#000"
                    }}
                    onPress={() => sendEmailRecoverPassword()}
                    title="Actualizar contraseña"
                    titleStyle={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <Button
                    buttonStyle = {{
                      borderRadius: 10,
                      backgroundColor: "#0E4DA4",
                      marginHorizontal: "5%",
                      shadowColor: "#000",
                      marginTop: 10
                    }}
                    onPress={() => pastDonation()}
                    title="Ver donaciones pasadas"
                    titleStyle={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
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
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "bold",
  },
  loader: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  inputContainer: {
    marginHorizontal: "5%",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 3,
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default ManagerDonorComponent;

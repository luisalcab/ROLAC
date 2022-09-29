import React, { useState, useEffect, useContext } from "react";
import {
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";

import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseConection from "../../contexts/FBConnection";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Dialog, Input, Icon, Button } from "@rneui/themed";
import { UserInformation } from "../../contexts/userInformation";

const ManagerAdminComponent = ({ navigation }) => {
  //Initialize auth instance
  const auth = getAuth();

  //Contexts
  const { userInformation, setUserInformation } = useContext(UserInformation);

  //useState
  const [manager, setManager] = useState(null);
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
    await getDoc(doc(firebaseConection.db, "BAMXmanager", id))
      .then((querySnapshot) => {
        const { lastName, name } = querySnapshot.data();

        setManager({
          uid: querySnapshot.id,
          email: userInformation.auth.currentUser.email,
          lastName,
          name,
        });
      })
      .catch(() => {
        alert("Ha habido un error, intente de nuevo mas tarde");
        navigation.navigate("HomePageManagerBAMX", { navigation: navigation });
      });
  };

  const updateManager = async (value) => {
    const { email, uid, lastName, name } = value;

    if (email != manager.email) {
      updateEmail(userInformation.auth.currentUser, email).catch(() => {
        alert("Ha habido un error a la hora de actualizar el usuario");
        navigation.navigate("HomePageManagerBAMX", { navigation: navigation });
      });
    }

    if(lastName != manager.lastName || name != manager.name){
      await updateDoc(
        doc(firebaseConection.db, "BAMXmanager", uid),
        {
          name: name,
          lastName: lastName,
        }
      )
      .then(() => {
        setUserInformation({
          ...userInformation,
          name: name,
          lastName: lastName,
        });
      })
      .catch(() => {
        alert("Ha habido un error a la hora de actualizar el usuario");
        navigation.navigate("HomePageManagerBAMX", { navigation: navigation });
      });
    }
    // alert("Se ha actualizado la información");
    navigation.navigate("HomePageManagerBAMX", { navigation: navigation });
  };

  const removeManager = async () => {
    hideDialog();
    const { email, password } = userValidation;

    const credential = await EmailAuthProvider.credential(email, password);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then((userCredential) => {
        userCredential.user.delete().then(() => {
          deleteDoc(
            doc(firebaseConection.db, "BAMXmanager", userInformation.uid)
          ).then(() => {
            alert("Usuario borrado exitosamente");
            navigation.navigate("Login");
          });
        });
      })
      .catch((error) => {
        alert(
          "Ha ocurrido un error durante el proceso de eliminación del usuario"
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
        alert(
          `Se ha enviado un correo a ${userInformation.auth.currentUser.email} para actualizar tu contraseña, revisa tu bandeja de spam`
        );
      })
      .catch((error) =>
        alert("Ha ocurrido un error, intente de nuevo mas tarde")
      );
  };

  //Hooks
  useEffect(() => {
    getManagerById(userInformation.uid);
  }, []);

  return (
    <>
      <Dialog isVisible={showDialog.state}>
        <Dialog.Title title="Autenticacion de usuario" />
        <View>
          <TextInput
            placeholder="Email actual"
            onChangeText={(value) => handleChangeText("email", value)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Contraseña actual"
            onChangeText={(value) => handleChangeText("password", value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar"
            onPress={() => removeManager()}
            color="#0E4DA4"
          />
          <Button
            title="Cancelar"
            onPress={() => hideDialog()}
            color="#E74C3C"
          />
        </View>
      </Dialog>
      {manager ? (
        <Formik
          initialValues={manager}
          onSubmit={(values) => updateManager(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ScrollView>
              <View style={styles.container}>
                  <Text style={styles.label}>Nombre(s) actuales</Text>                
                  <Input
                    placeholder="Name"
                    leftIcon={<Icon type="material" name="person"/>}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <Text style={styles.label}>Apellidos actuales</Text>
                  <Input
                    placeholder="Last name"
                    leftIcon={<Icon type="material" name="person"/>}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  <Text style={styles.label}>Email actual</Text>
                  <Input
                    placeholder="Email"
                    leftIcon={<Icon type="material" name="person"/>}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      color="#0E4DA4"
                      onPress={handleSubmit}
                      title="Actualizar"
                    />
                    <Button
                      color="#E74C3C"
                      onPress={() => displayDialog()}
                      title="Eliminar cuenta"
                    />
                  </View>
                  <View>
                    <Button
                      color="#0E4DA4"
                      buttonStyle = {{
                        borderRadius: 5,
                        backgroundColor: "#0E4DA4",
                        marginHorizontal: "5%",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        
                        elevation: 24,
                      }}

                      onPress={() => sendEmailRecoverPassword()}
                      title="Actualizar contraseña"
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
    marginTop: 35,
  },
  label: {
    fontSize: 20,
    marginLeft: 5
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
});

export default ManagerAdminComponent;

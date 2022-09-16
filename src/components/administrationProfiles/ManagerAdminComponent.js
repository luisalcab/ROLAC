import React, { useState, useEffect, useContext } from "react";
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
import firebaseConection from "../../contexts/FBConnection";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendPasswordResetEmail } from "firebase/auth"
import { Dialog } from "@rneui/themed";
import { UserInformation } from "../../contexts/userInformation";


const ManagerAdminComponent = ({navigation}) => {
  const [manager, setManager] = useState(null);
  const { userInformation, setUserInformation } = useContext(UserInformation);
  const [userValidation, setUserValidation] = useState({
    email: '',
    password: ''
  })
  const [showDialog, setShowDialog] = useState({state: false})
  const auth = getAuth()


  useEffect(() => {
    async function getManagerById(id) {
      const querySnapshot = await getDoc(
        doc(firebaseConection.db, "BAMXmanager", id)
      );
      
      const { lastName, name } = querySnapshot.data();
      setManager({
        id: querySnapshot.id,
        email: userInformation.auth.currentUser.email,
        lastName,
        name,
      });
    }

    getManagerById(userInformation.uid);
  }, []);

  const handleChangeText = (name, value) => { setUserValidation({ ... userValidation, [name]: value}); }

  const displayDialog = () => { setShowDialog({state: true})}
  const hideDialog = () => {setShowDialog({state: false})} 

  const sendEmailRecoverPassword = () => {
    //Por alguna razón no funciona con el correo institucional "@tec"
    sendPasswordResetEmail(userInformation.auth, userInformation.auth.currentUser.email)
    .then(() => {
      alert(`Se ha enviado un correo a ${userInformation.auth.currentUser.email} para actualizar tu contraseña, revisa tu bandeja de spam`);
    })
    .catch((error) => alert("Ha ocurrido un error, intente de nuevo mas tarde"))
  }

  const updateManager = async (value) => {
    const {email, name, lastName } = value;
    if (email != "") {
      updateEmail(userInformation.auth.currentUser, email)
      .catch(() => {
        alert("Ha habido un error a la hora de actualizar el usuario")
        navigation.navigate('HomePageManagerBAMX', {navigation: navigation});
      });
    }

    if (name != "") {
      manager.name = name;
    }
    if (lastName != "") {
      manager.lastName = lastName;
    }

    await updateDoc(
      doc(firebaseConection.db, "BAMXmanager", userInformation.uid),
      {
        name: manager.name,
        lastName: manager.lastName
      }
    )
    .then(() => {
      setUserInformation({...userInformation, name: donor.name, lastName: donor.lastName})
      console.log("Despues de actualizar usuario: ", userInformation)
    })
    .catch(() => {
      alert("Ha habido un error a la hora de actualizar el usuario")
      navigation.navigate('HomePageManagerBAMX', {navigation: navigation}); 
    });
    

    alert("Se ha actualizado la información");
    navigation.navigate('HomePageManagerBAMX', {navigation: navigation});    
  };

  const removeManager = async () => {
    hideDialog()
    const {email, password} = userValidation;
  
    const credential = await EmailAuthProvider.credential(email, password);
    
    reauthenticateWithCredential(auth.currentUser, credential)
    .then((userCredential) => {      
      userCredential.user.delete()
      .then(() => {
          deleteDoc(doc(firebaseConection.db, "BAMXmanager", userInformation.uid))
          .then(() => {
            alert("Usuario borrado exitosamente");
            navigation.navigate('Login');
          });
      })
      })
    .catch((error) => {
      alert("Ha ocurrido un error durante el proceso de eliminación del usuario");
    });
  };

  return (
    <>
            <Dialog
          isVisible={showDialog.state}
        >
          <Dialog.Title title="Autenticacion de usuario"/>
          <View>
            <TextInput
            placeholder = "Email actual"
            onChangeText={(value) => handleChangeText('email', value)}
            />
          </View>
          <View>
            <TextInput
            placeholder = "Contraseña actual"
            onChangeText={(value) => handleChangeText('password', value)}
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
                  onPress={() => sendEmailRecoverPassword()}
                  title="Actualizar contraseña"
                  />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
      :
      (        
      <View style={styles.loader}>
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

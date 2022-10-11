import React, { useContext } from "react";
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
import { PdfDocDefinitionContext } from "../../contexts/PdfDocDefinitionContext";


const HomePageManagerBAMX = ({navigation}) => {
  // console.log("Desde homepage: ", props.route.params.userAuth.currentUser.email)
  const docDefinition = {
    content: [
        {
            stack: [
                'Reporte de donaciones pendientes por recolectar',
                {text: 'Fecha: 10-10-35', style: 'subheader'},
            ],
            style: 'mainHeader'
        },
        {text: 'Restaurante 1', style: 'header'},
        'ID de centro: b7udBAstoa4Y8qUdnOe2',
        {
            style: 'tableExample',
            table: {
                body: [
                    ['ID producto', 'Nombre producto', 'Cantidad'],
                    ['0IVndm3s95cmMm3QpI9q', 'Uvas', '2'],
                    ['5XGC9v8eBeVQverEFWWw', 'Limón', '2'],
                    ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '2'],
                ]
            }
        },
        {text: 'Restaurante 2', style: 'header'},
        'ID de centro: Gtby7XqEHATkb4En7oNmgTHrxq12',
        {
            style: 'tableExample',
            table: {
                body: [
                    ['ID producto', 'Nombre producto', 'Cantidad'],
                    ['0IVndm3s95cmMm3QpI9q', 'Uvas', '5'],
                    ['5XGC9v8eBeVQverEFWWw', 'Limón', '3'],
                    ['bAUXf4zrhIgqhfLOIiRy', 'Papas', '4'],
                ]
            }
        },
        {text: 'Donaciones en especie tomadas en cuenta para el reporte', style: 'header'},
        {
            style: 'tableExample',
            table: {
                body: [
                    ['Entregada', 'ID donación', 'Realizado'],
                    ['Restaurante 1','asdsdOBlYHAZSbQmkpXY', '2022-10-01 12:58:51'],
                    ['Restaurante 1','MtdVBOBlYHAZSbQmkpXY', '2022-10-05 13:25:51'],
                    ['Restaurante 2','MtdVBOBlYHAZSbQmasdS', '2022-10-10 15:30:51'],
                ]
            }
        },
    ],
    styles: {
        mainHeader: {
               fontSize: 18,
            bold: true,
            alignment: 'right',
            
        },
        subheader: {
            fontSize: 14
        },
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        }
    },
    defaultStyle: {
        // alignment: 'justify'
    }	
  }

  const { pdfDocDefinition, setPdfDocDefinition } = useContext(PdfDocDefinitionContext);

  setPdfDocDefinition(docDefinition);

  console.log(docDefinition)
  return (
    <View>
        <Text>Vista adminstrador BAMX</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('ManagerAdminComponent', {navigation: navigation})}
        >
          <Icon name="user" type="font-awesome" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('AdminRegister', {navigation: navigation})}
        >
          <Icon name="user-plus" type="font-awesome" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('PdfGenerator', {navigation: navigation})}
        >
          <Icon name="description" type="material" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          const auth = getAuth();
          signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Login', {navigation: navigation})
          }).catch((error) => {
            // An error happened.
            navigation.navigate('Login', {navigation: navigation})
          });

        }}
        >
          <Icon name="door-open" type="material-community" size={50} />
        </TouchableOpacity>
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
  map: {
    width: "100%",
    height: "75%",
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    paddingTop: 5,
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
});

export default HomePageManagerBAMX;

import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'

const ViewCCCard = ({data}) => {
    const {name, email, address, dates, latitude, longitude} = data;
    const {Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo} = dates;

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.label}>Dirección</Text>
            <Text style={styles.generalData}>{address}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.generalData}>{email}</Text>
            <Text style={styles.label}>Latitud</Text>
            <Text style={styles.generalData}>{latitude}</Text>
            <Text style={styles.label}>Longitud</Text>
            <Text style={styles.generalData}>{longitude}</Text>
            <Text style={styles.label}>Horarios</Text>
            <Text style={styles.generalData}>Lunes: {Lunes.open}--{Lunes.close}</Text>
            <Text style={styles.generalData}>Martes: {Martes.open}--{Martes.close}</Text>
            <Text style={styles.generalData}>Miércoles: {Miercoles.open}--{Miercoles.close}</Text>
            <Text style={styles.generalData}>Jueves: {Jueves.open}--{Jueves.close}</Text>
            <Text style={styles.generalData}>Viernes: {Viernes.open}--{Viernes.close}</Text>
            <Text style={styles.generalData}>Sábado: {Sabado.open}--{Sabado.close}</Text>
            <Text style={styles.generalData}>Domingo: {Domingo.open}--{Domingo.close}</Text>
        </View>
    )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    card:{
        maxWidth: screen.width *.9,
        minWidth: screen.width *.9,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "white",
        flex:1,
        flexWrap: "wrap",
        alignContent: "stretch",
        flexGrow:1
    },
    label:{
        flex:2,
        fontSize: screen.fontScale * 20,
        fontWeight: "500",
        marginLeft: 5,
        marginBottom:5
    },
    name:{
        textDecorationLine: "underline",
        fontSize: screen.fontScale * 40,
        fontWeight: "500",
        marginLeft: 5,
        marginBottom: 10
    },
    generalData:{
        flex:1,
        fontStyle: "italic",
        fontSize: screen.fontScale * 20,
        marginLeft: 5
    },
    title:{
        color: "black",
        fontSize:screen.fontScale * 15
    }
})

export default ViewCCCard;
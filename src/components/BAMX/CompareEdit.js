import {View, ScrollView, StyleSheet, Dimensions, Text} from "react-native";

const CompareEdit = ({route}) => {
    const {fullData} = route.params;

    const {name, email, address, dates, latitude, longitude} = fullData;
    console.log(fullData)

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
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
                <Text style={styles.generalData}>Lunes: {dates.Lunes.open}--{dates.Lunes.close}</Text>
                <Text style={styles.generalData}>Martes: {dates.Martes.open}--{dates.Martes.close}</Text>
                <Text style={styles.generalData}>Miércoles: {dates.Miercoles.open}--{dates.Miercoles.close}</Text>
                <Text style={styles.generalData}>Jueves: {dates.Jueves.open}--{dates.Jueves.close}</Text>
                <Text style={styles.generalData}>Viernes: {dates.Viernes.open}--{dates.Viernes.close}</Text>
                <Text style={styles.generalData}>Sábado: {dates.Sabado.open}--{dates.Sabado.close}</Text>
                <Text style={styles.generalData}>Domingo: {dates.Domingo.open}--{dates.Domingo.close}</Text>
            </View>
            <View style={styles.card}>

            </View>
        </ScrollView>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    screen:{
        width: "100%",
        height: "100%",
        flex:1
    },
    list:{
        alignItems: "center"
    },
    card:{
        width: screen.width * .9,
        height: screen.height *.9,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "white",
        flex:1,
        flexWrap: "wrap",
        alignContent: "space-between"
    },
    label:{
        fontSize: screen.fontScale * 20,
        fontWeight: "300",
        marginLeft: 5,
        marginBottom: 5
    },
    name:{
        textDecorationLine: "underline",
        fontSize: screen.fontScale * 40,
        fontWeight: "500",
        marginLeft: 5,
        marginBottom: 10
    },
    generalData:{
        fontStyle: "italic",
        fontSize: screen.fontScale * 20,
        marginBottom: 10,
        marginLeft: 5,
    }

})
    


export default CompareEdit;
import {View, ScrollView, StyleSheet, Dimensions, Text} from "react-native";
import {useState, useEffect, useContext} from "react";
import {Button} from "@rneui/themed"
import {BAMXContext} from "../../contexts/BAMXContext";
import LottieView from 'lottie-react-native';
    
const CompareEdit = ({route}) => {
    const {getCurrentCC, setUpdatedCCData} = useContext(BAMXContext);

    const [currentCC, setCurrentCC] = useState(null);
    
    const {fullData, id} = route.params;
    const {name, email, address, dates, latitude, longitude, CCUser} = fullData;
    console.log("FULLDATA",fullData)
    console.log("CURRENTCC", currentCC)
    console.log("IDDD", id)

    useEffect(() => {
        const getData = async() => {
            if(currentCC === null){
                const CCC = await getCurrentCC(CCUser);
                setCurrentCC(CCC);
            }
        }

        getData();
    }, [])

    return(
        <View>
            {(currentCC !== null) ? (
                <ScrollView styles={styles.screen} contentContainerStyle={styles.list}>
                    <View style={styles.card}>
                        <Text style={styles.name}>{currentCC.name}</Text>
                        <Text style={styles.label}>Dirección</Text>
                        <Text style={styles.generalData}>{currentCC.address}</Text>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.generalData}>{currentCC.email}</Text>
                        <Text style={styles.label}>Latitud</Text>
                        <Text style={styles.generalData}>{currentCC.latitude}</Text>
                        <Text style={styles.label}>Longitud</Text>
                        <Text style={styles.generalData}>{currentCC.longitude}</Text>
                        <Text style={styles.label}>Horarios</Text>
                        <Text style={styles.generalData}>Lunes: {currentCC.dates.Lunes.open}--{currentCC.dates.Lunes.close}</Text>
                        <Text style={styles.generalData}>Martes: {currentCC.dates.Martes.open}--{currentCC.dates.Martes.close}</Text>
                        <Text style={styles.generalData}>Miércoles: {currentCC.dates.Miercoles.open}--{currentCC.dates.Miercoles.close}</Text>
                        <Text style={styles.generalData}>Jueves: {currentCC.dates.Jueves.open}--{currentCC.dates.Jueves.close}</Text>
                        <Text style={styles.generalData}>Viernes: {currentCC.dates.Viernes.open}--{currentCC.dates.Viernes.close}</Text>
                        <Text style={styles.generalData}>Sábado: {currentCC.dates.Sabado.open}--{currentCC.dates.Sabado.close}</Text>
                        <Text style={styles.generalData}>Domingo: {currentCC.dates.Domingo.open}--{currentCC.dates.Domingo.close}</Text>
                    </View>
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
                    <Button
                        title="Aceptar cambio"
                        onPress={() => setUpdatedCCData(CCUser, id, fullData)}
                        buttonStyle={styles.button}
                        titleStyle={styles.title}
                    />
                </ScrollView>
                ) : (
                    <View style={[styles.screen, styles.list]}>
                        <LottieView
                            source={require("../../animations/122764-circle-loading.json")}
                            autoPlay
                        />
                    </View>
            )}
        </View>
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
    },
    button:{
        width: screen.width * .8,
        height: screen.height * .08,
        backgroundColor:"white",
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000"
    },
    title:{
        color:"black",
        fontSize:screen.fontScale * 15
    }

})

export default CompareEdit;
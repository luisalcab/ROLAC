import {useContext} from 'react';
import {BAMXContext} from '../../contexts/BAMXContext';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {Button} from "@rneui/themed"
import Toast from 'react-native-root-toast';

const CCItem = ({params}) => {
    const {delD, addUser} = useContext(BAMXContext);

    const {name, address, id, email, data} = params;

    return(
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonFlex}>
                    <Button
                        onPress={() => {addUser(email, data, id);Toast.show("Centro de Acopio Aceptado")}}
                        title="Aceptar"
                        buttonStyle={styles.btnA}
                        titleStyle={styles.btnT}
                    />
                    <Button
                        title="Rechazar"
                        onPress={() => {delD(id);Toast.show("Centro de Acopio Borrado")}}
                        buttonStyle={styles.btnR}
                        titleStyle={styles.btnT}
                    />
                </View>
            </View>
        </View>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    card:{
        width: screen.width * .9,
        height: screen.height * .20,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "white",
        flex:1,
        flexWrap: "wrap",
        alignContent: "space-between",
        flexGrow:1,
        padding: 16,
        marginTop: 10,
    },
    info:{
        width: screen.width * .5,
        height: screen.height * 1,
    },
    name:{
        fontSize: screen.fontScale * 26,
        fontWeight: "500",
        marginLeft: 5,
    },
    address:{
        marginLeft: 5
    },
    buttonContainer:{
        width: screen.width * .28,
        height: screen.height * 0.16,
        marginRight: 5,
    },
    buttonFlex:{
        width: screen.width *0.28,
        height: screen.height * 1,
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    btnA:{
        width: screen.width * .28,
        minWidth: screen.width * .3,
        maxWidth: screen.width * .3,
        borderRadius: 10,
        margin: 5,
    },
    btnR:{
        width: screen.width * .28,
        minWidth: screen.width * .3,
        maxWidth: screen.width * .3,
        borderRadius: 10,
        backgroundColor: "red",
        margin: 5,
    },
    btnT:{
        fontSize: screen.fontScale * 15,
        margin: 5,
    }
})

export default CCItem;
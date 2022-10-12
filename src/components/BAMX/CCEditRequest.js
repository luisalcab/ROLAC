import {useContext} from "react";
import {BAMXContext} from "../../contexts/BAMXContext";
import {StyleSheet, ScrollView, View, Text, Dimensions} from "react-native";
import CCEditItem from "./CCEditItem";

const CCEditRequest = ({navigation}) => {
    const {editRequests} = useContext(BAMXContext);

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
            {(editRequests.length !== 0) ? (
                editRequests.map(doc => (<CCEditItem key={doc.id} params={{name: doc.data.name, address: doc.data.address, id: doc.id ,fullData:doc.data}} navigation={navigation}/>))
            ) : (
                <View style={styles.textView}>
                    <Text styele={styles.text}>No hay Solicitudes Pendientes</Text>
                </View>
            )}
        </ScrollView>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    screen:{
        width: "100%",
        height: "100%",
        flex: 1
    },
    list:{
        alignItems: "center"
    },
    textView:{
        width: screen.width * .9,
        height: screen.height * .9,
        flex:0,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        width:"100%",
        height:"100%",
        fontSize: screen.fontScale * 100,
        fontWeight: "900",
    }
}) 

export default CCEditRequest;
import {useContext} from "react";
import {BAMXContext} from "../../contexts/BAMXContext";
import {View, StyleSheet, ScrollView} from "react-native";
import CCItem from "./CCItem";

const CCRequest = () => {
    const {docsData} = useContext(BAMXContext);

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
            {docsData.map(doc => (<CCItem params={{name: doc.data.name, address: doc.data.address}}/>))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        width: "100%",
        height: "100%",
        flex: 1
    },
    list:{
        alignItems: "center"
    }
}) 

export default CCRequest;
import CCItem from "./CCItem";
import {View, StyleSheet, ScrollView} from "react-native";

const CCRequest = () => {
    return(
        <ScrollView style={styles.screen}>
            <CCItem params={{name: "Erectus", address: "asssssasssasaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"}}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        width: "100%",
        height: "100%"
    }
}) 

export default CCRequest;
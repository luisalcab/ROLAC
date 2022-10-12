import {useContext} from "react";
import {BAMXContext} from "../../contexts/BAMXContext";
import {StyleSheet, ScrollView} from "react-native";
import CCDeleteItem from "./CCDeleteItem";

const CCDeleteList = () => {
    const {CCData} = useContext(BAMXContext);

    console.log(CCData)

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
            {CCData.map(doc => (<CCDeleteItem key={doc.id} params={{name: doc.data.name, address: doc.data.address, email: doc.data.email, id: doc.id, data: doc.data }}/>))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    list:{
        alignItems: "center"
    }
}) 

export default CCDeleteList;
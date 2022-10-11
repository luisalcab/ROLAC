import {useContext} from "react";
import {BAMXContext} from "../../contexts/BAMXContext";
import {StyleSheet, ScrollView} from "react-native";
import CCEditItem from "./CCEditItem";

const CCEditRequest = ({navigation}) => {
    const {editRequests} = useContext(BAMXContext);

    return(
        <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
            {editRequests.map(doc => (<CCEditItem key={doc.id} params={{name: doc.data.name, address: doc.data.address, id: doc.id ,fullData:doc.data}} navigation={navigation}/>))}
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

export default CCEditRequest;
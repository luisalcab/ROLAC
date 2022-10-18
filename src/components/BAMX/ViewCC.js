import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useContext} from 'react';
import {BAMXContext} from '../../contexts/BAMXContext';
import ViewCCCard from "./ViewCCCard";

const ViewCC = () => {
    const {CCData} = useContext(BAMXContext);
    //console.log(CCData);
    //data={CC.data}

    return (
        <View style={styles.container}>
            <ScrollView styles={styles.screen} contentContainerStyle={styles.list}>
                {CCData.map(CC => (<ViewCCCard key={CC.id} data={CC.data}/>))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%"
    },
    screen:{
        flex:1
    },
    list:{
        alignItems: "center"
    }
})

export default ViewCC;
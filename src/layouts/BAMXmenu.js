import {useContext} from "react"
import {View, StyleSheet} from 'react-native'
import {BAMXContext} from "../contexts/BAMXContext";
import BtnCCRequest from '../components/BAMX/BtnCCRequest';
import BtnCCEditRequest from "../components/BAMX/BtnCCEditRequest";

const BAMXmenu = ({navigation}) => {
    const {docsNum} = useContext(BAMXContext);

    return (
        <View style={styles.screen}>
            <BtnCCRequest navigation={navigation}/>
            <BtnCCEditRequest navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        width:"100%",
        height:"100%"
    }
})

export default BAMXmenu
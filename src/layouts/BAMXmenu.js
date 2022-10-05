import {useContext} from "react"
import {View, StyleSheet} from 'react-native'
import {BAMXContext} from "../contexts/BAMXContext";
import BtnCCRequest from '../components/BAMX/BtnCCRequest';

const BAMXmenu = ({navigation}) => {
    const {docsNum} = useContext(BAMXContext);

    return (
        <View style={styles.screen}>
            <BtnCCRequest navigation={navigation} text="Centros de Acopio Pendientes" docEnum={docsNum}/>
            <BtnCCRequest navigation={navigation} text="Solicitudes de Edidición Centro de Acopio" docEnum={docsNum}/>
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
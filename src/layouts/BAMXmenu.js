import {View, StyleSheet} from 'react-native'
import BtnCCRequest from '../components/BAMX/BtnCCRequest';

const BAMXmenu = () => {
    return (
        <View style={styles.screen}>
            <BtnCCRequest/>
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
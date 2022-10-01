import {View, StyleSheet} from 'react-native'
import BtnCCRequest from '../components/BAMX/BtnCCRequest';

const BAMXmenu = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <BtnCCRequest navigation={navigation}/>
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
import {useContext} from 'react';
import {CCContext} from '../../contexts/CCContext';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button} from "@rneui/themed"

const BtnEditCC = ({navigation}) => {
    const {setCCEditViewS} = useContext(CCContext);

    return(
        <View>
            <Button
                title="Editar Información"
                onPress={() => setCCEditViewS(true)}
                buttonStyle={styles.button}
                titleStyle={styles.title}
            />
        </View>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    button:{
        width: screen.width * .8,
        height: screen.height * .08,
        backgroundColor:"white",
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000"
    },
    title:{
        color:"black",
        fontSize:screen.fontScale * 15
    }
})

export default BtnEditCC;

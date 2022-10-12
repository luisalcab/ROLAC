import {View, StyleSheet, Dimensions} from 'react-native';
import {Button, Icon} from "@rneui/themed"

const BtnDeleteCC = ({navigation}) => {
    return(
        <View>
            <Button
                title="Borrar Centro de Acopio"
                onPress={() => navigation.navigate("CCDeleteList")}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                icon={<Icon name="delete" type="antdesing"/>}
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

export default BtnDeleteCC;
import {useContext} from "react"
import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from "nachos-ui";
import {Button} from "@rneui/themed"
import {BAMXContext} from "../../contexts/BAMXContext";

const BtnCCRequest = ({navigation}) => {
    const {docsNum} = useContext(BAMXContext);

    const handleClick = () => {
        navigation.navigate("CCRequest");
    }

    return(
        <View>
            <Indicator
                position='right top'
                value={docsNum}
                type="normal"
                style={{marginLeft: 20, marginTop: 20}}
            >
                <Button
                    title="Centros de Acopio Pendientes"
                    onPress={handleClick}
                    buttonStyle={styles.button}
                    titleStyle={styles.title}
                    loading={(docsNum === null) ? true : false}
                    loadingStyle={styles.loading}
                />
            </Indicator>
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
    },
    loading:{
        backgroundColor: "black"
    }
})

export default BtnCCRequest;
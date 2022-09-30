import {useContext} from "react"
import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from "nachos-ui";
import {Button} from "@rneui/themed"
import {BAMXContext} from "../../contexts/BAMXContext";

const screen = Dimensions.get("screen");

const BtnCCRequest = () => {
    const {docsNum} = useContext(BAMXContext);

    const handleClick = () => {
        console.log("ola");
    }

    return(
        <View>
            <Indicator
                position='right top'
                value={docsNum}
                type="normal"
                style={styles.indicator}
            >
                <Button
                    title="Centros de Acopio Pendientes"
                    onPress={handleClick}
                    buttonStyle={styles.button}
                    titleStyle={styles.title}
                />
            </Indicator>
        </View>
    )
}

const styles = StyleSheet.create({
    indicator:{
        marginLeft: 30,
        marginTop: 50
    },
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

export default BtnCCRequest;
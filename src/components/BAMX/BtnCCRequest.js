import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from "nachos-ui";
import {Button} from "@rneui/themed"


const screen = Dimensions.get("screen");

const BtnCCRequest = () => {

    const handleClick = () => {
        console.log("ola");
    }

    return(
        <View>
            <Indicator
                position='right top'
                value="5"
                type="normal"
                style={styles.indicator}
            >
                <Button
                    title="Centros de Acopio Pendientes"
                    onPress={handleClick}
                    buttonStyle={styles.button}
                    titleStyle={styles.title}
                />
                {/* <Button
                    onPress={handleClick}
                    iconPosition="right"
                    iconName="ios-arrow-forward"
                    style={styles.button}
                    textStyle={styles.title}
                    >Centros de Acopio Pendientes
                </Button> */}
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
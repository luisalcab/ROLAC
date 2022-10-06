import {useContext} from "react"
import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from "nachos-ui";
import {Button} from "@rneui/themed"
import {BAMXContext} from "../../contexts/BAMXContext";
import LottieView from 'lottie-react-native';

const BtnCCEditRequest  = ({navigation}) => {
    const {editRequestsNum} = useContext(BAMXContext);

    return(
        <View>
            {(editRequestsNum !== null) ? (
                <Indicator
                    position='right top'
                    value={editRequestsNum}
                    type="normal"
                >
                    <Button
                        title="Modificaciones a Centros de Acopio"
                        onPress={() => navigation.navigate("CCRequest")}
                        buttonStyle={styles.button}
                        titleStyle={styles.title}
                    />
                </Indicator>
            ) : (
                <LottieView
                    source={require("../../animations/97203-loader.json")}
                    autoPlay
                />
            )}
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

export default BtnCCEditRequest ;
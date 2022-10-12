import {View, StyleSheet, Dimensions, Text} from "react-native";
import LottieView from 'lottie-react-native';

const ConnectionFail = ({isConnected}) => {
    return(
        <>
            {(isConnected === null) ? (
                <View style={styles.screen}>
                    <LottieView
                        source={require("../animations/120096-ai-assistant-animation.json")}
                        autoPlay
                    />
                </View>
            ) : (
                <View styles={styles.screen}>
                    <Text style={styles.text}>No Tiene Conección a Internet. Intente más tarde</Text>
                    <LottieView
                        source={require("../animations/110238-melt.json")}
                        autoPlay
                        style={styles.icon}
                    />
                </View>
            )}
        </>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    screen:{
        width: screen.width,
        height: screen.height,
        flex: 0,
        alignContent: "center",
        justifyContent: "center"
    },
    text:{
        width: "100%",
        height: "30%",
        flex: 0,
        fontSize: screen.fontScale * 30,
        marginTop: "20%"
    },
    icon:{
        flex:0,
        width: screen.width * .5,
        height: screen.height * .5
    }
})

export default ConnectionFail;
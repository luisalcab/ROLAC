import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Icon, Button } from "@rneui/base";



const PaymentMessage = (props) => {
    // var {idCase, navigation} = props.route.params.props;
    // console.log("En props: ", props.route.params.props)
    console.log("Esto es idCase: ", idCase)
    // const returnHome = () => { navigation.navigate('HomePageDonor', {navigation: navigation}) }
    const idCase = 0;

    return (
        <View style={styles.container}>
            {
                idCase === 0 ? 
                (
                    <View style={styles.conatinerSucces}>
                        <View style={styles.iconPosition}>
                            <Icon color={"#fff"} size={100} name="done" type="material"/>                    
                        </View>
                        <View style={styles.textPosition}>
                            <Text style={styles.message}>
                                Se ha completado la donación exitosamente
                            </Text> 
                        </View>
                        <View style={styles.containerBottom}>
                            <Button
                                onPress={() => {returnHome()}}
                                style={styles.bottom}
                                title="Aceptar"
                                />
                        </View>
                    </View>
                ) :
                (
                    <View style={styles.conatinerFail}>
                        <View style={styles.iconPosition}>
                            <Icon color={"#fff"} size={100} name="close" type="material"/>                    
                        </View>
                        <View style={styles.textPosition}>
                            {
                                idCase === 1 ?
                                (
                                    <Text style={styles.message}>
                                        Hubo un error durante la donación, intente nuevamente
                                    </Text> 
                                ) : 
                                (
                                    <Text style={styles.message}>
                                        Se ha cancelado la donación
                                    </Text> 
                                )
                            }
                        </View>
                        <View style={styles.containerBottom}>
                            <Button
                                onPress={() => returnHome()}
                                style={styles.bottom}
                                color="#e67e22"
                                title="Aceptar"
                                />
                        </View>
                    </View> 
                )
            }            
        </View>
    );
}


const screen = Dimensions.get("screen");

styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: "black",
    },
    conatinerSucces: {
        width: screen.width,
        height: screen.height,
        backgroundColor: "green",
    },
    // conatinerFail: {
    //     backgroundColor: "#E74C3C",
    //     height: "100%",
    //     width: "100%",
    // },
    // iconPosition: {
    //     marginTop: "20%"
    // },
    // textPosition: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: "25%",
    //     marginHorizontal: "10%"
    // },
    // message: {
    //     fontSize: 30,
    //     color: "#fff",
    //     textAlign: "center"
    // },
    // containerBottom: {
    //     marginTop: "30%",
    //     marginHorizontal: "25%",
    // },
})
export default PaymentMessage;
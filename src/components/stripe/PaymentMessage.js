import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Icon, Button } from "@rneui/base";



const PaymentMessage = (props) => {
    const {idCase, navigation} = props.route.params.props;

    const returnHome = () => { navigation.navigate('HomePageDonor', {navigation: navigation}) }

    return (
        <View style={styles.container}>
            {
                idCase === 0 ? 
                (
                    <View style={{
                        width: screen.width,
                        height: screen.height,
                        backgroundColor: "green"
                    }}>
                        <View style={{ marginTop: "20%" }}>
                            <Icon color={"#fff"} size={100} name="done" type="material"/>                    
                        </View>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "25%",
                            marginHorizontal: "10%"
                        }}>
                            <Text style={{
                                fontSize: 30,
                                color: "#fff",
                                textAlign: "center"
                            }}>
                                Se ha completado la donación exitosamente
                            </Text> 
                        </View>
                        <View style={{
                            marginTop: "30%",
                            marginHorizontal: "25%",
                        }}>
                            <Button
                                onPress={() => {returnHome()}}
                                style={styles.bottom}
                                title="Aceptar"
                                />
                        </View>
                    </View>
                ) :
                (
                    <View style={{
                        backgroundColor: "#E74C3C",
                        width: screen.width,
                        height: screen.height,
                    }}>
                        <View style={{ marginTop: "20%" }}>
                            <Icon color={"#fff"} size={100} name="close" type="material"/>                    
                        </View>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "25%",
                            marginHorizontal: "10%"
                        }}>
                            {
                                idCase === 1 ?
                                (
                                    <Text style={{
                                        fontSize: 30,
                                        color: "#fff",
                                        textAlign: "center"
                                    }}>
                                        Hubo un error durante la donación, intente nuevamente
                                    </Text> 
                                ) : 
                                (
                                    <Text style={{
                                        fontSize: 30,
                                        color: "#fff",
                                        textAlign: "center"
                                    }}>
                                        Se ha cancelado la donación
                                    </Text> 
                                )
                            }
                        </View>
                        <View style={{
                            marginTop: "30%",
                            marginHorizontal: "25%",
                        }}>
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
    // container: {
    //     width: screen.width,
    //     height: screen.height,
    // },
    // conatinerSucces: {
    //     width: screen.width,
    //     height: screen.height,
    //     backgroundColor: "green",
    // },
    // conatinerFail: {
    //     backgroundColor: "#E74C3C",
    //     width: screen.width,
    //     height: screen.height,
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
        // fontSize: 30,
        // color: "#fff",
        // textAlign: "center"
    // },
    // containerBottom: {
        // marginTop: "30%",
        // marginHorizontal: "25%",
    // },
})
export default PaymentMessage;
import {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';

const screen = Dimensions.get("screen");

const DatePicker = ({day, setSchedule, schedule}) => {

    const [setUp, setSetUp] = useState({
        date: false,
        openDate: "00:00",
        closeDate: "00:00",
        open: false,
        close: false
    });

    const handleConfirm = (d) => {
        if(setUp.open){
            setSetUp({...setUp, openDate: Moment(d).format("HH:mm"), open: false, date: false});
            setSchedule({...schedule, [day]: {...schedule[day], open: Moment(d).format("HH:mm")}});
        }else{
            setSetUp({...setUp, closeDate: Moment(d).format("HH:mm"), close: false, date: false});
            setSchedule({...schedule, [day]: {...schedule[day], close: Moment(d).format("HH:mm")}});
        }
    };

  return (
    <View style={styles.item}>
        <Text style = {styles.day}>{day}</Text>
        <View style={styles.line}></View>
        <Button
            onPress={() => setSetUp({...setUp, date: true, open: true})}
            title={setUp.openDate}
            buttonStyle={{
                backgroundColor:"transparent",
            }}
            titleStyle={{
                color:"black"
            }}
        />
        <Button
            onPress={() => setSetUp({...setUp, date: true, close: true})}
            title={setUp.closeDate}
            buttonStyle={{
                backgroundColor:"transparent",
            }}
            titleStyle={{
                color:"black"
            }}
        />
        <DateTimePickerModal isVisible={setUp.date} mode="time" onConfirm={handleConfirm} onCancel={() => setSetUp({...setUp, date: false, open: false, close: false})}/>
        <View style={styles.line}></View>
        <Button
            onPress={() => {
                setSetUp({...setUp, openDate: "---", closeDate: "---"});
                setSchedule({...schedule, [day]: {open: null, close: null}})
                }}
            title="Cerrado"
            buttonStyle={{
                backgroundColor:"transparent",
            }}
            titleStyle={{
                color:"red"
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    item:{
        width: screen.width*.8,
        borderColor:"black",
        borderWidth:1,
        borderRadius:5,
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        marginBottom: screen.height*.01,
        alignSelf:"center"
    },
    line:{
        width:1,
        height:screen.height*0.06,
        backgroundColor:"black",
        alignSelf:"center"
    },
    day:{
        fontSize:screen.fontScale*16,
        fontWeight:"bold",
        width:screen.width*0.2
    }
})

export default DatePicker
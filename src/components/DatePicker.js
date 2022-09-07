import {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Button} from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';

const DatePicker = ({day, setSchedule, schedule}) => {
    const [date, setDate] = useState(false);
    const [dateText, setDateText] = useState("00:00 am");

    
    const handleConfirm = (d) => {
        
        const s = Moment(d).format("hh:mm");
        setDateText(s);
        console.log(s)
        console.log(dateText)

        const aux = schedule;
        setSchedule({
            ...aux,
            [day]:dateText
        });

        console.log(day)
        console.log("---------------------------")

        setDate(false);
    };

  return (
    <View style={styles.item}>
        <Text>{day}</Text>
        <View style={styles.line}></View>
        <Button
            onPress={() => setDate(true)}
            title={dateText}
            buttonStyle={{
                backgroundColor:"transparent",
            }}
            titleStyle={{
                color:"black"
            }}
        />
        <DateTimePickerModal isVisible={date} mode="time" onConfirm={(d) => handleConfirm(d)} onCancel={() => setDate(false)}/>
        <View style={styles.line}></View>
        <Button
            onPress={() => setDateText("ola")}
            title="Closed"
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
        width:"95%",
        height:50,
        borderColor:"black",
        borderWidth:1,
        borderRadius:5,
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:"1%",
        marginHorizontal:10
    },
    line:{
        width:1,
        borderWidth:2
    }
})

export default DatePicker
import {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import object from 'react-native-ui-lib/src/style/colorName';

const BtnCCuserConfig = ({func, datas}) => {
    const [dropDown, setDropDown] = useState(true);
    const [value, setValue] = useState(0);

    //Default Values
    datas = datas ? datas : [{ label: '', value: '', func:()=>null}]

    func = func ? func : ()=>{console.log("Function!!")}

    const data = [
        { label: 'Item 1', value: '1', func:() => null, type: "", component: object},
        { label: 'Item 2', value: '2', func:() => null, type: "", component: object},
        { label: 'Item 3', value: '3', func:() => null, type: "", component: object},
        { label: 'Item 4', value: '4', func:() => null, type: "", component: object},
        { label: 'Item 5', value: '5', func:() => null, type: "", component: object},
        { label: 'Item 6', value: '6', func:() => null, type: "", component: object},
        { label: 'Item 7', value: '7', func:() => null, type: "", component: object},
        { label: 'Item 8', value: '8', func:() => null, type: "", component: object},
      ];

    const handleClick = async() => {
        await func();
        Dropdown.op
    }

    const renderElements = item => {
        const set = new Set(["Configuración", "Borrar", ])

        return (<Button/>)
    }

    return (
        <View style={styles.view}>
            <Button
                onPress={() => func()}
                radius="xl" 
                buttonStyle={styles.btn}
                icon={<Icon name="user" type="feather" iconStyle={styles.icon} containerStyle={styles.iconContainer}/>}
                iconContainerStyle={styles.btnIconContainer}
                iconPosition="top"
            />
            {dropDown && 
            <Dropdown
                data={data}
                valueField= {value}
                placeholder=""
                renderItem={items => renderElements(items)}
            />}
        </View>
    )
}

export default BtnCCuserConfig

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    view:{
        width: "40%",
        height: "100%"
    },
    btn:{
        widht: "100%",
        height: screen.height * .07,
        marginVertical: "5%",
        backgroundColor: "#D9D9D9"
    },
    btnIconContainer:{
        flex:1,
        justifyContent: "center",
        alignContent: "center"
    },
    iconContainer:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    icon:{
        widht: "100%"
    }
})
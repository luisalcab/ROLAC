import {useContext} from 'react';
import {CCContext} from '../contexts/CCContext';
import {View, StyleSheet} from 'react-native';
import BtnEditCC from "../components/CC/BtnEditCC";
import CCEdit from "../components/CC/CCEdit";

const CCmenu = () => {
    const {CCEditViewS} = useContext(CCContext);

    return(
        <View style={styles.screen}>
            {!CCEditViewS ? (
                <BtnEditCC/>
               ) : (
                   <CCEdit/>
                )}            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%"
    }
})

export default CCmenu;
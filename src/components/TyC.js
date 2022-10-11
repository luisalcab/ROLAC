import {View} from 'react-native';
import { WebView } from 'react-native-webview';

const TerminosyCondiciones = ({navigation}) => {

    const nav2Login = () => {
        navigation.navigate("Login");
    }

    return (
        <View style={{flex: 1}}>
            <WebView
                source={{ uri: 'https://drive.google.com/file/d/120lHn9CA2mP4HtJZMyCyanzJTTkPXzNJ/view?usp=sharing' }}
            />
        </View>
    )
};

export default TerminosyCondiciones;
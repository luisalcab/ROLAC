import {sendPasswordResetEmail} from 'firebase/auth'
import {getAuth} from 'firebase/auth'
import {useState} from 'react'
import {View, Text, Alert, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import {Input} from "@rneui/themed";
import {StyleSheet} from 'react-native'

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    const handleSubmit = async () => {
        setLoading(true);
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert(
                "Correo enviado", 
                `Se ha enviado un correo a ${email} para restablecer la contraseña`,
                [
                    {
                        text: "Aceptar",
                        onPress: () => navigation.navigate("Login")
                    }
                ]
                );
            setLoading(false);
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                setError('No hay ningún usuario registrado con este correo');
                setLoading(false);
            } else if (error.code === 'auth/invalid-email') {
                setError('El correo no es válido');
                setLoading(false);
            } else if (error.code === 'auth/missing-email') {
                setError('El correo es requerido');
                setLoading(false);
            } else {
                setError('Error desconocido');
                setLoading(false);
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.text}>Ingresa tu correo electrónico para restablecer tu contraseña</Text>
            <Input
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <Text style={styles.error}>{error}</Text>
            <Spinner
                visible={loading}
                textContent={'Cargando...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    message: {
        color: 'green',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default ForgotPassword;
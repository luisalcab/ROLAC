import { useContext, useState } from 'react';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserInformation } from '../../contexts/userInformation';
import * as Location from 'expo-location';
import { addDoc, collection } from 'firebase/firestore';
import firebaseConection from '../../contexts/FBConnection';
import { CartContext } from '../../contexts/CartContext';
import { styled } from 'tailwindcss-react-native';
import moment from 'moment';

function PaymentScreen({grandTotal, navigation}) {    
    //Contexts
    const { userInformation, setUserInformation } = useContext(UserInformation);    
    const {cart, setCart} = useContext(CartContext);

    // Initialization confirm payment
    const {confirmPayment, loading} = useConfirmPayment();

    //Variables
    const { email } = userInformation.auth.currentUser;
    const grandTotalFormat = ((Math.round(grandTotal * 100)/ 100).toFixed(2)) * 100; // Become to stripe 
    const API_URL = 'https://us-central1-rolac-f16b1.cloudfunctions.net';
    const props = {
      navigation: navigation,
      idCase: 1
    }

    // Use state
    const [payment, setPayment] = useState({
      last4: '',
      postalCode: '',
      name: `${userInformation.name} ${userInformation.lastName}`,
      amount: grandTotal,
      id: userInformation.uid
    });


    handleError = () => {
      setCart([]);
      props.idCase = 1;
      navigation.navigate("PaymentMessage", { props: props });
      
    }

    const fetchPaymentIntentClientSecret = async () => {
        /*|
          Formato para donar:
          2000 = 20.00
          1099 = 10.99
        */
       return axios.post(`${API_URL}/create_payment_intent`, 
       { "amount": grandTotalFormat, "currency": "mxn" })
       .then((response) => {
          const {paymentIntent} = JSON.parse(JSON.stringify(response.data))
          return paymentIntent;
       })
       .catch((err) => { handleError() });
      };
    
      const handlePayPress = async () => {
        Location.installWebGeolocationPolyfill()
        navigator.geolocation.getCurrentPosition(async (position) => {
              // Gather the customer's billing information (for example, email)
              const billingDetails = {
                email: email,
              };
    
              // Fetch the intent client secret from the backend
              const clientSecret = await fetchPaymentIntentClientSecret();
          
              // Confirm the payment with the card details
              const {paymentIntent, error} = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                  billingDetails,
                },
              });

              if (error) {
                // console.log('Payment confirmation error', error);
                handleError()
              } else if (paymentIntent) {
                // let today = new Date();
                // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
                let date = moment().format()
                console.log("Esto es date: ", date)
                addDoc(collection(firebaseConection.db,"monetary_donation"), {
                  last4: payment.last4,
                  postalCode: payment.postalCode,
                  name: payment.name,
                  amount: payment.amount,
                  idUser: payment.id,
                  idStripe: paymentIntent.id,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  date: date
                })
                .then(() => {
                  // console.log('Success from promise', paymentIntent);
                  setCart([]);
                  props.idCase = 0;
                  navigation.navigate("PaymentMessage", { props: props });
                  
                })
                .catch(() => { setCart([]); handleError(); }); 
              }
            },
            error => { handleError() },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
      };

      const handleCancelPayPress = async() => {
        setCart([]);
        props.idCase = 2;
        navigation.navigate("PaymentMessage", { props: props });
      }

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setPayment({
            ...payment,
            last4: cardDetails.last4,
            postalCode: cardDetails.postalCode,
          });
        }}
        // onFocus={(focusedField) => {
        //   console.log('focusField', focusedField);
        // }}
      />

      <Button 
        onPress={handlePayPress} 
        title="Donar" 
        disabled={loading} />

      <View style={styles.cancelButtonStyle}>
        <Button 
          color="#E74C3C" 
          onPress={handleCancelPayPress} 
          title="Cancelar" 
          disabled={loading} />
      </View>

    </View>
  );
}

styles = StyleSheet.create({
  cancelButtonStyle: {
    marginTop: "5%",
  }
})
export default PaymentScreen;
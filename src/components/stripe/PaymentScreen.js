import { useContext, useState } from 'react';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, Button  } from 'react-native';
import axios from 'axios';
import { UserInformation } from '../../contexts/userInformation';
import * as Location from 'expo-location'

function PaymentScreen({grandTotal}) {
    const {confirmPayment, loading} = useConfirmPayment();
    
    grandTotal *= 100; // Become to stripe format

    const API_URL = 'https://us-central1-rolac-f16b1.cloudfunctions.net';
    
    //Contexts
    const { userInformation, setUserInformation } = useContext(UserInformation);    

    const { email } = userInformation.auth.currentUser;

    const [payment, setPayment] = useState({
      last4: '',
      postalCode: '',
      latitude: '',
      longitude: '',
      name: '',
      amount: grandTotal
    });

    const fetchPaymentIntentClientSecret = async () => {
        /*|
          Formato para donar:
          2000 = 20.00
          1099 = 10.99
        */
       
       return axios.post(`${API_URL}/create_payment_intent`, { "amount": grandTotal, "currency": "mxn" })
       .then((response) => {
          const {paymentIntent} = JSON.parse(JSON.stringify(response.data))
          return paymentIntent;
       })
       .catch((err) => console.log("Error: ", err));
      };
    
      const handlePayPress = async () => {
        Location.installWebGeolocationPolyfill()
        navigator.geolocation.getCurrentPosition(async (position) => {
          console.log("Longuitud: ", position.coords.latitude)
          console.log("Latitud: ", position.coords.latitude)
              setPayment({
                ...payment,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })

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
          
              console.log("Informacion de usuario: ", userInformation)
              console.log("Informacion de pago: ",payment)

              if (error) {
                console.log('Payment confirmation error', error);
              } else if (paymentIntent) {
                console.log('Success from promise', paymentIntent);
              }
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
      };

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
          // console.log('cardDetails', cardDetails);
        }}
        // onFocus={(focusedField) => {
        //   console.log('focusField', focusedField);
        // }}
      />
       <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

export default PaymentScreen;
import { useContext, useState } from 'react';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, Button, Alert  } from 'react-native';
import axios from 'axios';
import { UserInformation } from '../../contexts/userInformation';
import * as Location from 'expo-location';
import { addDoc, collection } from 'firebase/firestore';
import firebaseConection from '../../contexts/FBConnection';

function PaymentScreen({grandTotal, navigation}) {
    const {confirmPayment, loading} = useConfirmPayment();
    
    const grandTotalFormat = ((Math.round(grandTotal * 100)/ 100).toFixed(2)) * 100; // Become to stripe 

    const API_URL = 'https://us-central1-rolac-f16b1.cloudfunctions.net';
    
    //Contexts
    const { userInformation, setUserInformation } = useContext(UserInformation);    

    const { email } = userInformation.auth.currentUser;

    const [payment, setPayment] = useState({
      last4: '',
      postalCode: '',
      name: `${userInformation.name} ${userInformation.lastName}`,
      amount: grandTotal,
      id: userInformation.uid
    });

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
       .catch((err) => {
          // console.log("Error: ", err)
          alert("0Hubo un error durante la operación, intente nuevamente");
          navigation.navigate("HomePageDonor", { navigation: navigation });
        });
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
                alert("1Hubo un error durante la operación, intente nuevamente");
                navigation.navigate("HomePageDonor", { navigation: navigation });
              } else if (paymentIntent) {
                addDoc(collection(firebaseConection.db,"monetary_donation"), {
                  last4: payment.last4,
                  postalCode: payment.postalCode,
                  name: payment.name,
                  amount: payment.amount,
                  idUser: payment.id,
                  idStripe: paymentIntent.id,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                })
                .then(() => {
                  // console.log('Success from promise', paymentIntent);
                  alert("El pago se registro exitosamente");
                  navigation.navigate("HomePageDonor", { navigation: navigation });
                })
                .catch(() => {
                  alert("2Hubo un error durante la operación, intente nuevamente");
                  navigation.navigate("HomePageDonor", { navigation: navigation });
                });

              }
            },
            error => {
              // Alert.alert(error.message)
              alert("3Hubo un error durante la operación, intente nuevamente");
              navigation.navigate("HomePageDonor", { navigation: navigation });
            },
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
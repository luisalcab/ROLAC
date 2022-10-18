import { useContext, useEffect, useState } from 'react';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserInformation } from '../../contexts/userInformation';
import * as Location from 'expo-location';
import { addDoc, collection } from 'firebase/firestore';
import firebaseConection from '../../contexts/FBConnection';
import { CartContextMonetary } from '../../contexts/CartContextMonetary';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

function PaymentScreen({grandTotal, navigation}) {    
    //Contexts
    const { userInformation, setUserInformation } = useContext(UserInformation);    
    const {cartMonetary, setCartMonetary} = useContext(CartContextMonetary);
    const [load, isLoad] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
      if(grandTotal >= 10){
        setActive(true);
      } else {
        setActive(false);
      }
    }, [grandTotal]);

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
      id: userInformation.id
    });


    handleError = () => {
      setCartMonetary([]);
      props.idCase = 1;
      isLoad(false);
      navigation.navigate("PaymentMessage", { props: props });
      
    }

    const fetchPaymentIntentClientSecret = async () => {
        /*
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
        isLoad(!load);
        Location.installWebGeolocationPolyfill()
        navigator.geolocation.getCurrentPosition(async (position) => {
              // Gather the customer's billing information (for example, email)
              const billingDetails = {
                email: email,
              };
    
              // Fetch the intent client secret from the backend
              if(grandTotalFormat < 1099){
                handleError()
              } else {
                const  clientSecret = await fetchPaymentIntentClientSecret();
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
                  let date = moment().format()
                  
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
                    setCartMonetary([]);
                    props.idCase = 0;
                    isLoad(false);
                    navigation.navigate("PaymentMessage", { props: props });
                    
                  })
                  .catch(() => { setCartMonetary([]); handleError(); }); 
                }
              }
            },
            error => { handleError() },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              
        );
      };

      const handleCancelPayPress = async() => {
        setCartMonetary([]);
        props.idCase = 2;
        navigation.navigate("PaymentMessage", { props: props });
      }

  return (
    <>
    <Spinner
      visible={load}
      textContent={'Cargando...'}
      textStyle={styles.spinnerTextStyle}
    />
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

      <View style = {styles.Button}>
        <View style = {styles.ButtonDonation}>
          <Button 
            onPress={handlePayPress} 
            title="Donar" 
            disabled={
              !payment.last4 ||
              !payment.postalCode ||
              loading ||
              !active
            }
            color="#fff"
          />
        </View>
        <View style = {styles.ButtonCancel}>
          <Button 
            color={"white"}
            style = {{fontSize: 20}}
            onPress={handleCancelPayPress} 
            title="Cancelar" 
            disabled={loading}
          />
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  ButtonDonation: {
    width: 200,
    height: 40,
    backgroundColor: '#1d5dec',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10
  },
  ButtonCancel: {
    width: 200,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})
export default PaymentScreen;
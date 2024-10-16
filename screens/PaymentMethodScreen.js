import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaymentGatewayAction } from '../store/actions/paymentActions';
import { getAllPaymentMethodsAction, selectPaymentMethodAction } from '../store/actions/paymentMethodActions';

const PaymentMethodScreen = ({ navigation }) => {
  const [paymentOption, setPaymentOption] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const plan = useSelector((state) => state.plans.selectedPlan);
  const paymentMethods = useSelector((state) => state.paymentMethod.paymentMethods);

  useEffect(() => {
    dispatch(getAllPaymentMethodsAction());
  }, [dispatch]);

  console.log('my plan', paymentMethods);

  const filteredPaymentMethods = paymentMethods?.filter(
    (paymentMethod) => paymentMethod.isVisible === true
  );

  const handleContinue = () => {
    dispatch(selectPaymentGatewayAction(paymentOption));
    dispatch(selectPaymentMethodAction(selectedPaymentMethod));
  
    if (paymentOption === 'stripe') {
      navigation.navigate('BillingInfo');
    } else if (paymentOption === 'paypal') {
      navigation.navigate('PayPalBilling');
    } else if (paymentOption === 'cryptocurrency') {
      navigation.navigate('CryptoCheckout');
    } else if (paymentOption === 'Link') {
      navigation.navigate('PaymentBillingForm', { paymentMethod: selectedPaymentMethod });
    }
    else if (paymentOption === 'Cashapp') {
      navigation.navigate('CashAppBilling', { paymentMethod: selectedPaymentMethod });
    }
    else if (paymentOption === 'ZellePay') {
      navigation.navigate('PaymentBillingForm', { paymentMethod: selectedPaymentMethod });
    }
    else if (paymentOption === 'Venmo') {
      navigation.navigate('PaymentBillingForm', { paymentMethod: selectedPaymentMethod });
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Payment Method</Text>

      {filteredPaymentMethods?.map((paymentMethod) => (
        <TouchableOpacity
          key={paymentMethod._id}
          style={styles.option}
          onPress={() => {
            setSelectedPaymentMethod(paymentMethod);
            setPaymentOption(paymentMethod.type);
          }}
        >
          {paymentMethod.imageUrl && (
            <Image source={{ uri: paymentMethod.imageUrl }} style={styles.image} />
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.optionText}>{paymentMethod.type}</Text>
          </View>
          <RadioButton
            value={paymentMethod.type}
            status={paymentOption === paymentMethod.type ? 'checked' : 'unchecked'}
            onPress={() => {
              setSelectedPaymentMethod(paymentMethod);
              setPaymentOption(paymentMethod.type);
            }}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, !paymentOption && { backgroundColor: '#ccc' }]}
        onPress={handleContinue}
        disabled={!paymentOption}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },
  subText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6200b3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentMethodScreen;

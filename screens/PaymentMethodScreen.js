import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaymentGatewayAction } from '../store/actions/paymentActions';
import { getAllPaymentMethodsAction, selectPaymentMethodAction } from '../store/actions/paymentMethodActions';

const PaymentMethodScreen = ({ navigation }) => {
  const [paymentOption, setPaymentOption] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // New state for entire object
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Assuming this is the correct selection
  const plan = useSelector((state) => state.plans.selectedPlan);
  const paymentMethods = useSelector((state) => state.paymentMethod.paymentMethods);

  useEffect(() => {
    dispatch(getAllPaymentMethodsAction());
  }, [dispatch]);

  console.log('my plan', plan);

  const filteredPaymentMethods = paymentMethods?.filter(
    (paymentMethod) => paymentMethod.isVisible === true
  );

  const handleContinue = () => {
    dispatch(selectPaymentGatewayAction(paymentOption.type)); // Update state with selected payment method type (optional)

    // Choose between dispatching type or entire object
    // Option 1: Dispatch payment method type (simpler approach)
    // dispatch(selectPaymentMethodAction(paymentOption));

    // Option 2: Dispatch entire payment method object (more information)
    dispatch(selectPaymentMethodAction(selectedPaymentMethod));

    if (paymentOption === 'stripe') {
      navigation.navigate('BillingInfo'); // Navigate to BillingInfo screen
    } else if (paymentOption === 'paypal') {
      navigation.navigate('PayPalBilling'); // Navigate to PayPal checkout screen
    } else if (paymentOption === 'cryptocurrency') {
      navigation.navigate('CryptoCheckout'); // Navigate to Cryptocurrency checkout screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Payment Method</Text>

      {filteredPaymentMethods?.map((paymentMethod) => (
        <TouchableOpacity
          key={paymentMethod._id} // Use a unique key for each payment method
          style={styles.option}
          onPress={() => {
            setSelectedPaymentMethod(paymentMethod); // Set selectedPaymentMethod state with the entire object
            setPaymentOption(paymentMethod.type); // Update paymentOption for further use (optional)
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
              setSelectedPaymentMethod(paymentMethod); // Set selectedPaymentMethod state with the entire object
              setPaymentOption(paymentMethod.type); // Update paymentOption for further use (optional)
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
    flex: 1, // Allow text to fill available space
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align text and radio button at opposite ends
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 10, // Add padding to create space between text and button
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
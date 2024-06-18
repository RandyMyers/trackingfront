import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Alert, StyleSheet, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { usePaymentSheet, StripeProvider, loading } from '@stripe/stripe-react-native';


const UpdatePayMethodScreen = ({ navigation }) => {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const customer = useSelector((state) => state.subscription.customerId);
  const setupIntent = useSelector((state) => state.subscription.setupIntent);
  const ephemeralKey = useSelector((state) => state.subscription.ephemeralKey);
  const publishableKey = useSelector((state) => state.subscription.publishableKey);


  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const initialisePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: 'Tracking App Inc',
      allowsDelayedPaymentMethods: true,
      returnUrl: ''
    });
    if (error) {
      Alert.alert('Error', error.message || 'Failed to initialize payment');
    } else {
      setReady(true);
    }
  };

  const handlePaymentSuccess = async () => {
    
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error');
    } else {
      

      Alert.alert('Success', 'Payment Method was added successfully');
      navigation.navigate('Checkout');
      setReady(false);
    }
  };

  return (
    <View style={styles.container}>
        

      <StripeProvider publishableKey={publishableKey}>
      <TouchableOpacity 
        onPress={handlePaymentSuccess} 
        disabled={!ready } 
        style={[styles.payButton]}
      >
        <Text style={styles.buttonText}>Add Payment Method</Text>
      </TouchableOpacity>
      </StripeProvider>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  payButton: {
    marginTop: 20,
    width: '80%',
    backgroundColor: '#6200b3',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledPayButton: {
    backgroundColor: '#ccc', // Change the background color of disabled button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  termsLink: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6200b3',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default UpdatePayMethodScreen;

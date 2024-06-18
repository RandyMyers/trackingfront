import React, { useEffect, useState } from 'react';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { TouchableOpacity, Text, View, Alert, StyleSheet, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { changeSubscriptionPlanAction, fetchUsedTracksAction, renewSubscriptionAction } from '../../store/actions/subscriptionActions';

import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import SubscriptionTerms from './SubscriptionTerms';
import { updatePaymentAction } from '../../store/actions/paymentActions';

const PaymentForm = () => {
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const subscription = useSelector((state) => state.subscription.subscriptionDetails);
  const userId = useSelector((state) => state.auth.user);
  const plan = useSelector((state) => state.plans.selectedPlan);
  const customer = useSelector((state) => state.payments.customerId);
  const ephemeralKey = useSelector((state) => state.payments.ephemeralKey);
  const clientSecret = useSelector((state) => state.payments.clientSecret);
  const publishableKey = useSelector((state) => state.payments.publishableKey);
  const subscriptionAction = useSelector((state) => state.subscription.subscriptionAction);
  const paymentId = useSelector((state) => state.payments.paymentId);
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const navigation = useNavigation();

  

  useEffect(() => {
    if (customer && ephemeralKey && clientSecret) {
      initialisePaymentSheet();
    }
  }, [customer, ephemeralKey, clientSecret]);

  const initialisePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      customerId: customer.id,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Your App Name',
      allowsDelayedPaymentMethods: true,
    });

    if (error) {
      console.error('Error initializing payment sheet:', error);
    } else {
      console.log('Payment sheet initialized successfully');
      setReady(true);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!checked) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const subscriptionData = {
        subscriptionId: subscription._id,
        
      };

      if (subscriptionAction === 'renew') {
        dispatch(renewSubscriptionAction(subscriptionData));
      } else {
        const newPlanData = {
          ...subscriptionData,
          newPlanId: plan._id
        };
        dispatch(changeSubscriptionPlanAction(newPlanData));
      }

      const paymentData = {
        status: 'paid'
      }

      dispatch(updatePaymentAction(paymentId, paymentData ));
      dispatch(fetchUsedTracksAction(userId));

      Alert.alert('Success', 'The payment was confirmed successfully');
      setReady(false);

      // Navigate to the home screen
      navigation.navigate('Main');
    }
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <SubscriptionTerms />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color="#6200b3" />
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color="#6200b3" // Ensure the checkbox has a visible color
            uncheckedColor="#6200b3" // Set the color for the unchecked state
          />
          <View>
            <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.termsLink}>View Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePaymentSuccess}
          disabled={!ready || loading}
          style={[styles.payButton, !checked && styles.disabledPayButton]}
        >
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
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
    backgroundColor: '#ccc',
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
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default PaymentForm;

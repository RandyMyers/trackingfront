import React from 'react';
import { View, StyleSheet } from 'react-native';
import PaymentForm from '../components/payment/PaymentForm';
import OrderSummary from '../components/payment/OrderSummary';
import BillingSummary from '../components/payment/BillingSummary';


const PaymentScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <BillingSummary/>
      <OrderSummary/>
      <PaymentForm route={route} /> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
  },
});

export default PaymentScreen;

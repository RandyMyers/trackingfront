import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SubscriptionTerms = ({ onPress }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Terms and Conditions</Text>
      <ScrollView style={styles.modalTextContainer}>
        <Text style={styles.modalText}>
          <Text style={styles.sectionTitle}>1. Subscription and Billing:</Text>{'\n'}
          By subscribing, you agree to pay a recurring fee of [amount] every [billing period] (e.g., monthly, annually).
          Your payment method will be automatically charged on the [billing date] of each billing period.
          You can cancel your subscription at any time through your account settings.
          {'\n\n'}
          <Text style={styles.sectionTitle}>2. Terms of Service:</Text>{'\n'}
          By using our service, you agree to our full Terms of Service, available at [link to terms]. These terms govern your use of our service and outline your rights and responsibilities.
          {'\n\n'}
          <Text style={styles.sectionTitle}>3. Cancellation and Refunds:</Text>{'\n'}
          You can cancel your subscription at any time, but refunds are not available for past charges.
          Cancellations will take effect at the end of your current billing period.
          {'\n\n'}
          <Text style={styles.sectionTitle}>4. Changes to Terms and Pricing:</Text>{'\n'}
          We reserve the right to modify these terms and conditions or our pricing at any time.
          We will notify you of any changes in advance. Your continued use of the service after the effective date of the changes constitutes your acceptance of the revised terms.
          {'\n\n'}
          <Text style={styles.sectionTitle}>5. Governing Law:</Text>{'\n'}
          These terms and conditions are governed by and construed in accordance with the laws of [your jurisdiction].
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.modalCloseButton} onPress={onPress}>
        <Text style={styles.modalCloseButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200b3',
  },
  modalTextContainer: {
    flex: 1,
    maxWidth: '100%', // Ensure text stays within screen width
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#6200b3',
    textDecorationLine: 'underline',
  },
});

export default SubscriptionTerms;

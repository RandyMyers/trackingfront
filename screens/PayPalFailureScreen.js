import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PaymentFailureScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment Failed!</Text>
      <Button
        title="Try Again"
        onPress={() => navigation.navigate('YourPaymentInitiationScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebee',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PaymentFailureScreen;

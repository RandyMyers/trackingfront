import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethodAction } from '../../store/actions/paymentActions';

const CreditCardForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.auth.user)
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    // Validate the input fields
    if (!cardNumber || !expMonth || !expYear || !cvv) {
      alert('Please fill in all fields');
      return;
    }

    // Prepare payment data
    const paymentData = {
      userId,
      Number: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      CVV: cvv
    };

    // Dispatch the addPaymentMethodAction with credit card details
    dispatch(addPaymentMethodAction(paymentData));

    // Clear the form fields after submission
    setCardNumber('');
    setExpMonth('');
    setExpYear('');
    setCvv('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Credit Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Month (MM)"
        value={expMonth}
        onChangeText={setExpMonth}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Year (YY)"
        value={expYear}
        onChangeText={setExpYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreditCardForm;

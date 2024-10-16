import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateUserAction } from '../store/actions/userActions';
import { logoutUserAction } from '../store/actions/authActions'; // Ensure this path is correct

const DeactivationScreen = () => {
  const [deactivationReason, setDeactivationReason] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Ensure this path is correct

  const handleDeactivate = () => {
    if (!deactivationReason) {
      Alert.alert('Reason Required', 'Please provide a reason for deactivation.');
      return;
    }

    Alert.alert(
      'Confirm Deactivation',
      'Are you sure you want to deactivate your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deactivation cancelled'),
          style: 'cancel',
        },
        {
          text: 'Deactivate',
          onPress: () => {
            dispatch(deactivateUserAction(userId, deactivationReason))
              .then(() => {
                // After successful deactivation, log out the user
                dispatch(logoutUserAction());
              })
              .catch((error) => {
                console.error('Deactivation failed:', error);
              });
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleCancel = () => {
    console.log('Deactivation cancelled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deactivate Account</Text>
      <Text style={styles.warningText}>
        Are you sure you want to deactivate your account? This action cannot be undone.
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Please provide your reason for deactivation"
        value={deactivationReason}
        onChangeText={setDeactivationReason}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivate}>
          <Text style={styles.buttonText}>Deactivate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  warningText: {
    color: '#d9534f',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#5bc0de',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  deactivateButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeactivationScreen;

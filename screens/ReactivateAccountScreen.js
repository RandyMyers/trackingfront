import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reactivateUserAction } from '../store/actions/userActions';
import { logoutUserAction } from '../store/actions/authActions'; // Ensure the path is correct

const ReactivateAccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Ensure this path is correct
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleReactivate = () => {
    dispatch(reactivateUserAction(userId))
      .then(() => {
        Alert.alert(
          'Account Reactivated',
          'Your account has been successfully reactivated. You will now be logged out for security reasons.',
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(logoutUserAction());
              },
            },
          ]
        );
      })
      .catch((error) => {
        console.error('Reactivation failed:', error);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200b3" />
      ) : (
        <>
          <Text style={styles.title}>Account Deactivated</Text>
          <Text style={styles.subtitle}>
            Your account is currently deactivated. Please reactivate your account to continue using our services.
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <TouchableOpacity style={styles.button} onPress={handleReactivate}>
            <Text style={styles.buttonText}>Reactivate Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200b3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReactivateAccountScreen;

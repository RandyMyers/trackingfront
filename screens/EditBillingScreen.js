import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdAction, updateUserAction } from '../store/actions/userActions';

const EditBillingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Assuming user object contains _id
  const userProfile = useSelector((state) => state.user.selectedUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdAction(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userProfile) {
      setStreet(userProfile.address?.street || '');
      setCity(userProfile.address?.city || '');
      setPostalCode(userProfile.address?.postalCode || '');
      setState(userProfile.address?.state || '');
      setCountry(userProfile.address?.country || '');
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!isModified) return;

    try {
      await dispatch(updateUserAction(userId, { 
        address: { 
          street, 
          city, 
          postalCode, 
          state, 
          country 
        }
      }));

      // Dispatch getUserByIdAction to get updated user details
      dispatch(getUserByIdAction(userId));
      Alert.alert('Success', 'Billing information updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update billing information');
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setIsModified(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Street"
        placeholderTextColor="#000"
        value={street}
        onChangeText={handleInputChange(setStreet)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#000"
        value={city}
        onChangeText={handleInputChange(setCity)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        placeholderTextColor="#000"
        value={postalCode}
        onChangeText={handleInputChange(setPostalCode)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#000"
        value={state}
        onChangeText={handleInputChange(setState)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="#000"
        value={country}
        onChangeText={handleInputChange(setCountry)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isModified ? '#6200b3' : '#ccc' }]}
        onPress={handleSave}
        disabled={!isModified}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#e9ecef'
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '80%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditBillingScreen;

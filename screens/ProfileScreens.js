import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdAction } from '../store/actions/userActions';
import { logoutUserAction } from '../store/actions/authActions';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user); // Assuming user object contains _id
  
  useEffect(() => {
    dispatch(getUserByIdAction(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.user.selectedUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToEditBilling = () => {
    navigation.navigate('EditBilling');
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const navigateToNotificationsSettings = () => {
    navigation.navigate('NotificationsSettings');
  };

  const navigateToPayments = () => {
    navigation.navigate('Payments');
  };

  const navigateToDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };

  const navigateToCouriersScreen = () => {
    navigation.navigate('CouriersList');
  };

  const navigateToProfileSettings = () => {
    navigation.navigate('ProfileSettings');
  };

  const navigateToFeedbackList = () => {
    navigation.navigate('FeedbackList');
  };

  // Add navigation to DeactivationScreen
  const navigateToDeactivateAccount = () => {
    navigation.navigate('DeactivateAccount');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6200b3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <AntDesign name="user" size={54} color="black" />
        </View>
        <Text style={styles.emailText}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={navigateToProfileSettings}>
        <MaterialIcons name="settings" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Profile Settings</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToPayments}>
        <MaterialIcons name="credit-card" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Payments</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToCouriersScreen}>
        <MaterialIcons name="local-shipping" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Couriers List</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToFeedbackList}>
        <MaterialIcons name="feedback" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Feedback</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToDeactivateAccount}>
        <MaterialIcons name="remove-circle" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Deactivate Account</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 18,
    marginTop: 10,
    color: '#10002b',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '95%',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#10002b',
    fontSize: 16,
  },
});

export default ProfileScreen;

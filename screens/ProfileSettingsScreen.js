import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileSettingsScreen = ({ navigation }) => {
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

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToEditProfile}>
        <MaterialIcons name="person" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Edit Profile</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToEditBilling}>
        <MaterialIcons name="payment" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Edit Billing</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToChangePassword}>
        <MaterialIcons name="lock" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Change Password</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

      

      <TouchableOpacity style={styles.button} onPress={navigateToNotificationsSettings}>
        <MaterialIcons name="notifications" size={24} color="#10002b" />
        <Text style={styles.buttonText}>Notifications Settings</Text>
        <MaterialIcons name="chevron-right" size={24} color="#10002b" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#10002b',
    fontSize: 16,
  },
});

export default ProfileSettingsScreen;

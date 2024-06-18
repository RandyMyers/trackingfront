import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreens';
import ProfileOverviewScreen from '../screens/ProfileOverviewScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationsSettingsScreen from '../screens/NotificationsSettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import ConnectedAccountsScreen from '../screens/ConnectedAccountsScreen';

import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import EditBillingScreen from '../screens/EditBillingScreen';
import CouriersScreen from '../screens/CouriersScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#6200b3', // Header background color
      },
      headerTintColor: '#fff', // Text color of header title and buttons
      
    }}>
      <Stack.Screen name="ProfileOverview" component={ProfileScreen} options={{ title: 'Profile Overview' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="EditBilling" component={EditBillingScreen} options={{ title: 'Edit Billing'  }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} options={{ title: 'Notifications Settings' }} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{title: 'PrivacySettings' }} />
      <Stack.Screen name="CouriersList" component={CouriersScreen} options={{title: 'Couriers List' }} />
      
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ title: 'Delete Account' }} />
    </Stack.Navigator>
  );

  };

export default ProfileStack;

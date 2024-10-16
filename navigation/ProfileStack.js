import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreens';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationsSettingsScreen from '../screens/NotificationsSettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import ConnectedAccountsScreen from '../screens/ConnectedAccountsScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import EditBillingScreen from '../screens/EditBillingScreen';
import CouriersScreen from '../screens/CouriersScreen';
import DeactivationScreen from '../screens/DeactivationScreen';
// Import feedback-related screens
import FeedbackListScreen from '../screens/FeedbackListScreen';
import FeedbackDetailScreen from '../screens/FeedbackDetailScreen';
import SubmitFeedbackScreen from '../screens/SubmitFeedbackScreen';

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
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ title: 'Profile Settings' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="EditBilling" component={EditBillingScreen} options={{ title: 'Edit Billing'  }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} options={{ title: 'Notifications Settings' }} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{title: 'PrivacySettings' }} />
      <Stack.Screen name="CouriersList" component={CouriersScreen} options={{title: 'Couriers List' }} />
      
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ title: 'Delete Account' }} />
      <Stack.Screen
        name="DeactivateAccount"
        component={DeactivationScreen} // Add DeactivationScreen to the stack
        options={{ title: 'Deactivate Account' }}
      />
      {/* Feedback-related screens */}
      <Stack.Screen name="FeedbackList" component={FeedbackListScreen} options={{ title: 'My Feedback' }} />
      <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} options={{ title: 'Feedback Detail' }} />
      <Stack.Screen name="SubmitFeedback" component={SubmitFeedbackScreen} options={{ title: 'Submit Feedback' }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

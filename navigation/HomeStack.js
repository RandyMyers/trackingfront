import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'; // Import necessary icons
import { View, Text } from 'react-native'; // Import View and Text components
import HomeScreen from '../screens/HomeScreens';
import PaymentScreen from '../screens/PaymentScreens';
import AddPackageScreen from '../screens/AddPackageScreen'; // Import the AddPackageScreen
import SettingsScreen from '../screens/SettingsScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import BillingInfoScreen from '../screens/BillingInfoScreen';
import UpdatePayMethodScreen from '../screens/UpdatePayMethodScreen';
import { getNotificationsAction, countUnreadNotificationsAction } from '../store/actions/notificationActions';
import NotificationsScreen from '../screens/NotificationScreens';
import PayPalBillingScreen from '../screens/PaypalBillingScreen'; // Import PayPalBillingScreen
import PayPalCheckoutScreen from '../screens/PayPalCheckoutScreen'; // Import PayPalCheckoutScreen
import PaymentSuccessScreen from '../screens/PayPalSuccessScreen';
import PaymentFailureScreen from '../screens/PayPalFailureScreen';
import { logoutUserAction } from '../store/actions/authActions';

const Stack = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user);
  const count = useSelector(state => state.note.unreadCount);

  console.log('the user id is present here', userId);

  
   useEffect(() => {
    if (!userId) {
      dispatch(logoutUserAction()); 
    } else {
      dispatch(getNotificationsAction(userId));
      dispatch(countUnreadNotificationsAction(userId));
    }
  }, [dispatch, userId]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200b3', // Header background color
        },
        headerTintColor: '#fff', // Text color of header title and buttons
        headerTitleAlign: 'center', // Align header title center
      }}
    >
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="box" size={24} color="#fb8500" />
              <Text style={{ color: '#fff', marginLeft: 3, fontSize: 20, fontWeight: 'bold' }}>Track48</Text>
            </View>
          ),
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <Ionicons
                name="notifications"
                size={30}
                color="#fff"
                onPress={() => {
                  // Handle notifications icon press (e.g., open notifications screen)
                  navigation.navigate('Notifications');
                }}
              />
              {count > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {count}
                  </Text>
                </View>
              )}
            </View>
          ),
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('Settings')} // Navigate to SettingsScreen
            />
          ),
        })}
      />
      
      <Stack.Screen
        name="AddPackage"
        component={AddPackageScreen}
        options={{
          title: 'Add Package', // Set the title for AddPackage screen
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings', // Set the title for Settings screen
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: 'View Plans', // Set the title for Settings screen
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen} // Set component to PaymentMethodScreen
        options={{
          title: 'Payment Method', // Set the title for PaymentMethod screen
        }}
      />
      <Stack.Screen
        name="BillingInfo"
        component={BillingInfoScreen} // Set component to BillingInfoScreen
        options={{
          title: 'Billing Information', // Set the title for BillingInfo screen
        }}
      />
      <Stack.Screen
        name="CreditCardInfo"
        component={UpdatePayMethodScreen}
        options={{
          title: 'Your Payment Details', // Set the title for Payment screen
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={PaymentScreen}
        options={{
          title: 'Checkout', // Set the title for Payment screen
        }}
      />
      <Stack.Screen
        name="Notifications" // Corrected the screen name
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="PayPalBilling"
        component={PayPalBillingScreen}
        options={{
          title: 'PayPal Billing', // Set the title for PayPal Billing screen
        }}
      />
      <Stack.Screen
        name="PayPalCheckout"
        component={PayPalCheckoutScreen}
        options={{
          title: 'PayPal Checkout', // Set the title for PayPal Checkout screen
        }}
      />

<Stack.Screen
        name="PayPalSuccess"
        component={PaymentSuccessScreen}
        options={{
          title: 'PayPal Checkout', // Set the title for PayPal Checkout screen
        }}
      />

<Stack.Screen
        name="PayPalFailure"
        component={PaymentFailureScreen}
        options={{
          title: 'PayPal Checkout', // Set the title for PayPal Checkout screen
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // Importing the StatusBar
import HomeScreen from '../screens/HomeScreens';
import PaymentScreen from '../screens/PaymentScreens';
import AddPackageScreen from '../screens/AddPackageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import BillingInfoScreen from '../screens/BillingInfoScreen';
import UpdatePayMethodScreen from '../screens/UpdatePayMethodScreen';
import { getNotificationsAction, countUnreadNotificationsAction } from '../store/actions/notificationActions';
import NotificationsScreen from '../screens/NotificationScreens';
import PayPalBillingScreen from '../screens/PaypalBillingScreen';
import PayPalCheckoutScreen from '../screens/PayPalCheckoutScreen';
import PaymentSuccessScreen from '../screens/PayPalSuccessScreen';
import PaymentFailureScreen from '../screens/PayPalFailureScreen';
import { logoutUserAction } from '../store/actions/authActions';
import PaymentLinkScreen from '../screens/PaymentLinkScreen';
import PaymentBillingFormScreen from '../screens/PaymentLinkBillingFormScreen';
import CashAppBillingScreen from '../screens/CashappBillingScreen';
import CashAppCheckoutScreen from '../screens/CashappCheckoutScreen';
import PaymentsScreen from '../screens/PaymentListScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user);
  const count = useSelector(state => state.note.unreadCount);

  useEffect(() => {
    if (!userId) {
      dispatch(logoutUserAction()); 
    } else {
      dispatch(getNotificationsAction(userId));
      dispatch(countUnreadNotificationsAction(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <StatusBar style="light" /> 
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200b3',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="box" size={24} color="#fb8500" />
                <Text style={{ color: '#fff', marginLeft: 3, fontSize: 20, fontWeight: 'bold' }}>Track4u</Text>
              </View>
            ),
            headerLeft: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Ionicons
                  name="notifications"
                  size={30}
                  color="#fff"
                  onPress={() => {
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
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPackage"
          component={AddPackageScreen}
          options={{
            title: 'Add Package',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            title: 'View Plans',
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodScreen}
          options={{
            title: 'Payment Method',
          }}
        />
        <Stack.Screen
          name="PaymentLink"
          component={PaymentLinkScreen}
          options={{
            title: 'Payment Form',
          }}
        />
        <Stack.Screen
          name="PaymentBillingForm"
          component={PaymentBillingFormScreen}
          options={{
            title: 'Payment Details',
          }}
        />
        <Stack.Screen
          name="BillingInfo"
          component={BillingInfoScreen}
          options={{
            title: 'Billing Information',
          }}
        />
        <Stack.Screen
          name="CreditCardInfo"
          component={UpdatePayMethodScreen}
          options={{
            title: 'Update Payment Method',
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="PayPalBilling"
          component={PayPalBillingScreen}
          options={{
            title: 'PayPal Billing',
          }}
        />
        <Stack.Screen
          name="PayPalCheckout"
          component={PayPalCheckoutScreen}
          options={{
            title: 'PayPal Checkout',
          }}
        />
        <Stack.Screen
          name="CashAppBilling"
          component={CashAppBillingScreen}
          options={{
            title: 'CashApp Billing',
          }}
        />
        <Stack.Screen
          name="CashappCheckout"
          component={CashAppCheckoutScreen}
          options={{
            title: 'CashApp Checkout',
          }}
        />
        <Stack.Screen
          name="PayPalSuccess"
          component={PaymentSuccessScreen}
          options={{
            title: 'Payment Success',
          }}
        />
        <Stack.Screen
          name="PaymentFailure"
          component={PaymentFailureScreen}
          options={{
            title: 'Payment Failure',
          }}
        />

        <Stack.Screen
          name="Payments"
          component={PaymentsScreen} 
          options={{
            title: 'My Payments',
          }}
        />

        <Stack.Screen
          name="Checkout"
          component={PaymentScreen} 
          options={{
            title: 'Checkout',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;

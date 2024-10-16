import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CouponScreen from '../screens/CouponScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CouponDetailScreen from '../screens/CouponDetailScreen';

const Stack = createStackNavigator();

const DealStack = () => {
  return (
    <Stack.Navigator initialRouteName="Coupon"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6200b3',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
    >
       <Stack.Screen 
        name="Coupon" 
        component={CouponScreen} 
        options={{ 
          title: 'Deals', 
          headerShown: false // Hide the header on the CouponScreen
        }} 
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{ title: 'Categories' }} 
      />
      <Stack.Screen 
        name="CouponDetail" 
        component={CouponDetailScreen} 
        options={{ title: 'Coupon Details' }} 
      />
    </Stack.Navigator>
  );
};

export default DealStack;

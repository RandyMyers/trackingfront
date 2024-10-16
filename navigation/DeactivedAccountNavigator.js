// navigation/DeactivatedAccountNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReactivateAccountScreen from '../screens/ReactivateAccountScreen';


const Stack = createStackNavigator();

const DeactivatedAccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReactivateAccount"
        component={ReactivateAccountScreen}
        options={{ title: 'Reactivate Account' }}
      />
     
    </Stack.Navigator>
  );
};

export default DeactivatedAccountNavigator;

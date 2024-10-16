import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import PackageStack from './PackageStack';
import DealStack from './DealStack';  // Import DealStack
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: route.name === 'Home' ? '#6200b3' : '#000', // Set the active tab bar icon color to purple for the 'Home' tab, otherwise set it to black
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Packages') {
            iconName = 'box';
          } else if (route.name === 'Deals') {
            iconName = 'tag';  // Use an appropriate icon for Deals
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          // Return the appropriate icon component
          if (iconName === 'home') {
            return <MaterialIcons name={iconName} color={color} size={size} />;
          } else if (iconName === 'box') {
            return <FontAwesome5 name={iconName} color={color} size={size} />;
          } else if (iconName === 'tag') {
            return <FontAwesome name={iconName} color={color} size={size} />;
          } else {
            return <FontAwesome name={iconName} color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Packages" 
        component={PackageStack} 
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Deals" 
        component={DealStack}  // Add the DealStack here
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

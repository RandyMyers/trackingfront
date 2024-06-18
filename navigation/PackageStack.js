import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PackageListScreen from '../screens/PackageListScreens';
import PackageDetailsScreen from '../screens/PackageDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import AddPackageScreen from '../screens/AddPackageScreen';
import AddBulkPackageScreen from '../screens/AddBulkPackagesScreen';

const Stack = createStackNavigator();

const PackageStack = () => {
  const activePlan = useSelector((state) => state.subscription.plan);

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#6200b3', // Header background color
      },
      headerTintColor: '#fff', // Text color of header title and buttons
      headerTitleAlign: 'center', // Align the header title in the center
    }}>
      <Stack.Screen 
        name="Shipments" 
        component={PackageListScreen} 
        options={({ navigation }) => ({
          title: 'Shipments', // Set the title of the header
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('AddPackage')}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Search')} // Navigate to the search screen when the search icon is pressed
            >
              <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="AddPackage" 
        component={AddPackageScreen} 
        options={({ navigation }) => ({
          title: 'Add Package',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {['Standard', 'Premium'].includes(activePlan) && (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate('AddBulkPackage')}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Bulk</Text>
                </TouchableOpacity>
              )}
            </View>
          ),
        })}
      />
      <Stack.Screen 
        name="AddBulkPackage" 
        component={AddBulkPackageScreen} 
        options={({ navigation }) => ({
          title: 'Add Bulk Package',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('AddPackage')}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Single</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="PackageDetails" component={PackageDetailsScreen} />
      {/* Add more screens related to the package stack as needed */}
    </Stack.Navigator>
  );
};

export default PackageStack;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PackageDetailsScreen = ({ route }) => {
  const { trackingNumber, status } = route.params;

  return (
    <View style={styles.container}>
      <Text>Package Details Screen</Text>
      <Text>{`Tracking Number: ${trackingNumber}`}</Text>
      <Text>{`Status: ${status}`}</Text>
      {/* Add more package details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PackageDetailsScreen;

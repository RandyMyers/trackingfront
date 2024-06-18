import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo Vector Icons
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const SearchResults = () => {
  const searchResults = useSelector(state => state.package.searchResults);

  const statusIconMap = {
    all: { label: 'All', color: '#fca311', icon: 'filter', library: 'MaterialIcons' },
    pending: { label: 'Pending', color: '#2ec4b6', icon: 'downloading', library: 'MaterialIcons' },
    transit: { label: 'Transit', color: '#36a2eb', icon: 'plane', library: 'FontAwesome' },
    pickup: { label: 'Pickup', color: '#03045e', icon: 'local-shipping', library: 'MaterialIcons' },
    delivered: { label: 'Delivered', color: '#4CAF50', icon: 'check-circle', library: 'MaterialIcons' },
    InfoReceived: { label: 'Info Received', color: '#607D8B', icon: 'sync', library: 'MaterialIcons' },
    notfound: { label: 'Not Found', color: '#FFC300', icon: 'info', library: 'MaterialIcons' },
    expired: { label: 'Expired', color: '#795548', icon: 'warning', library: 'MaterialIcons' },
    undelivered: { label: 'Undelivered', color: '#E53935', icon: 'error', library: 'MaterialIcons' },
    exception: { label: 'Exception', color: '#9C27B0', icon: 'error-outline', library: 'MaterialIcons' }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results</Text>
      {searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {searchResults.map(packageItem => (
            <View key={packageItem._id} style={styles.resultItem}>
              <View style={[styles.leftBorder, { backgroundColor: statusIconMap[packageItem.deliveryStatus].color }]}></View> 
              <View style={styles.textContainer}>
                <Text style={styles.trackingNumber}>{packageItem.trackingNumber}</Text>
                <Text style={styles.status}>Status: {packageItem.deliveryStatus}</Text>
              </View>
              <MaterialIcons name={statusIconMap[packageItem.deliveryStatus].icon} color={statusIconMap[packageItem.deliveryStatus].color} size={24} />
            </View>
          ))}
        </View>
      ) : (
        <Text>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsContainer: {
    marginTop: 5,
  },
  resultItem: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  leftBorder: {
    width: 5,
    height: '100%',
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take up remaining space
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
  },
});

export default SearchResults;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';



const SearchScreen = () => {

  return (
    <View style={styles.container}>
      <SearchBar  />
      <SearchResults />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchPackagesByTrackingNumberAction } from '../../store/actions/packageActions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const token = useSelector((state)=> state.auth.token);
  const userId = useSelector((state)=> state.auth.user);

  const onChangeSearch = query => setSearchQuery(query);
  console.log(userId);

  const handleSearch = () => {
    dispatch(searchPackagesByTrackingNumberAction(searchQuery, token, userId));
    // Clear input after search
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by tracking number"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        placeholderTextColor="#888"
      />
      <SearchButton onPress={handleSearch} />
    </View>
  );
};

const SearchButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Search</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchBar;

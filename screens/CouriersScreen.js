import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getAllCouriersAction } from '../store/actions/packageActions';
import CourierItem from '../components/package/CouriersList';

const ScreenContainer = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #f8f8f8;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-color: #cccccc;
  border-width: 1px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const FloatingButtonContainer = styled.View`
  position: absolute;
  background-color: #f8f8f8;
  right: 10px;
  top: 50px;
  height: 80%; 
  border-radius: 10px;
  margin-top:15px;
  justify-content: space-around;
  padding: 5px 0;
`;

const FloatingButton = styled.TouchableOpacity`
  padding: 5px; 
  margin-vertical: 1px; 
`;

const ButtonText = styled.Text`
  color: #000;
  font-size: 12px; 
  font-weight: bold;
`;

const CouriersScreen = () => {
  const dispatch = useDispatch();
  const { couriers, loading, error, hasMore } = useSelector(state => state.package);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); // Track the current page for lazy loading
  const [filterLetter, setFilterLetter] = useState('');

  useEffect(() => {
    dispatch(getAllCouriersAction(page)); // Fetch initial couriers
  }, [dispatch, page]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); // Update page for next fetch
    }
  }, [hasMore, loading]);

  const filteredCouriers = couriers
    ?.sort((a, b) => a.courier_name.localeCompare(b.courier_name)) // Sort alphabetically
    .filter(courier =>
      (courier.courier_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (courier.courier_type?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (courier.country_code?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(courier =>
      filterLetter ? courier.courier_name?.toLowerCase().startsWith(filterLetter.toLowerCase()) : true
    ) || []; // Handle case where couriers is initially null

  if (loading && page === 1) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text>{error}</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SearchInput
        placeholder="Search couriers..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredCouriers}
        renderItem={({ item }) => <CourierItem courier={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore} // Call handleLoadMore on reaching the end
        onEndReachedThreshold={0.5} // Trigger onEndReached when the end is 50% visible
        ListFooterComponent={hasMore && <ActivityIndicator size="small" color="#0000ff" />} // Show loading indicator for next page
      />
      <FloatingButtonContainer>
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
          <FloatingButton key={letter} onPress={() => setFilterLetter(letter)}>
            <ButtonText>{letter}</ButtonText>
          </FloatingButton>
        ))}
      </FloatingButtonContainer>
    </ScreenContainer>
  );
};

export default CouriersScreen;

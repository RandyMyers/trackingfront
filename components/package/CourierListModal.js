import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, TextInput, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCouriersAction } from '../../store/actions/packageActions';

const screenHeight = Dimensions.get('window').height;

const CourierSelectionModal = ({ visible, onSelectCourier, onClose }) => {
  const dispatch = useDispatch();
  const { couriers, loading, error, hasMore } = useSelector(state => state.package);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (visible) {
      dispatch(getAllCouriersAction(page)); // Fetch initial couriers when modal is opened
    }
  }, [dispatch, page, visible]);

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
    ) || [];

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Courier</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search couriers..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {loading && page === 1 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <FlatList
              data={filteredCouriers}
              renderItem={({ item }) => {
                const logoUrl = item.courier_logo.startsWith('//') ? `https:${item.courier_logo}` : item.courier_logo;
                return (
                  <TouchableOpacity
                    style={styles.courierButton}
                    onPress={() => onSelectCourier(item)}
                  >
                    <Image source={{ uri: logoUrl }} style={styles.logo} />
                    <Text style={styles.courierButtonText}>{item.courier_name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={hasMore && <ActivityIndicator size="small" color="#0000ff" />}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: screenHeight * 0.65, 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  courierButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  courierButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CourierSelectionModal;

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPackagesAction, getPackagesForUserAction } from '../../store/actions/packageActions';
import CourierSelectionModal from './CourierListModal'; // Import the modal

const AddPackageForm = ({ setIsUpgradeModalVisible, setIsRenewModalVisible, used, total, plan, remainingDays }) => {
  const dispatch = useDispatch();
  const [trackingNumbers, setTrackingNumbers] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courier, setCourier] = useState(null); // State for selected courier
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const userId = useSelector((state) => state.auth.user);

  const handleSave = () => {
    if (plan === 'Trial' && (remainingDays === 0 || used >= total)) {
      setIsUpgradeModalVisible(true);
      return;
    } else if (remainingDays === 0 || used >= total) {
      setIsRenewModalVisible(true);
      return;
    }

    if (!courier) {
      Alert.alert('Error', 'Please select a courier');
      return;
    }

    const trackingNumbersArray = trackingNumbers.split('\n').filter(trackingNumber => trackingNumber.trim() !== '');

    const packagesData = trackingNumbersArray.map(trackingNumber => ({
      userId,
      trackingNumber,
      packageDescription,
      selectedCategory,
      courier: courier.courier_code // Include the selected courier code
    }));

    // Dispatch addPackagesAction with packagesData
    dispatch(addPackagesAction(packagesData));
    dispatch(getPackagesForUserAction(userId));

    // Reset form fields after saving
    setTrackingNumbers('');
    setPackageDescription('');
    setSelectedCategory(null);
    setCourier(null); // Reset courier

    // Alert the client that the packages have been added successfully
    Alert.alert('Success', 'Packages added successfully');
  };

  const categories = [
    'Clothing Apparel',
    'Home And Gardening',
    'Mother & Kids',
    'Sports',
    'Outdoor & Travel',
    'Food',
    'Health & Beauty',
    'Flower & Gifts',
    'Games, Toys & Books',
    'Others'
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={trackingNumbers}
        onChangeText={setTrackingNumbers}
        placeholder="Enter tracking numbers (one per line)"
        multiline
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={packageDescription}
        onChangeText={setPackageDescription}
        placeholder="Enter package description"
        multiline
      />
      <TouchableOpacity
        style={styles.selectCourierButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectCourierButtonText}>
          {courier ? `Courier: ${courier.courier_name}` : 'Select Courier'}
        </Text>
      </TouchableOpacity>
      <View style={styles.categoriesContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.categoryButtonsContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <CourierSelectionModal
        visible={isModalVisible}
        onSelectCourier={(selectedCourier) => {
          setCourier(selectedCourier);
          setIsModalVisible(false);
        }}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
  },
  selectCourierButton: {
    backgroundColor: '#ddd',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectCourierButtonText: {
    fontSize: 16,
    color: '#000',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginRight: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#000814',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddPackageForm;

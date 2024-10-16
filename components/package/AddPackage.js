import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addPackageAction } from '../../store/actions/packageActions';
import CourierSelectionModal from './CourierListModal'; // Import the modal

const AddPackageForm = ({ setIsUpgradeModalVisible, setIsRenewModalVisible, used, total, plan, remainingDays }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = useState('');
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
      Alert.alert(t('error'), t('please_select_courier'));
      return;
    }

    const packageData = {
      userId,
      trackingNumber,
      packageDescription,
      selectedCategory,
      courier: courier.courier_code // Include the selected courier code
    };

    console.log(packageData);

    // Dispatch addPackageAction with packageData
    dispatch(addPackageAction(packageData));

    // Reset form fields after saving
    setTrackingNumber('');
    setPackageDescription('');
    setSelectedCategory(null);
    setCourier(null); // Reset courier

    // Alert the client that the package has been added successfully
    Alert.alert(t('success'), t('package_added_successfully'));
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
        style={styles.input}
        value={trackingNumber}
        onChangeText={setTrackingNumber}
        placeholder={t('enter_tracking_number')}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={packageDescription}
        onChangeText={setPackageDescription}
        placeholder={t('enter_package_description')}
        multiline
      />
      <TouchableOpacity
        style={styles.selectCourierButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectCourierButtonText}>
          {courier ? `${t('courier')}: ${courier.courier_name}` : t('select_courier')}
        </Text>
      </TouchableOpacity>
      <View style={styles.categoriesContainer}>
        <Text style={styles.label}>{t('select_category')}:</Text>
        <View style={styles.categoryButtonsContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>
                {t(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{t('save')}</Text>
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, Image, TextInput, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentAction } from '../store/actions/paymentActions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { changeSubscriptionPlanAction, fetchUsedTracksAction, renewSubscriptionAction } from '../store/actions/subscriptionActions';

const PaymentLinkScreen = ({ route, navigation }) => {
  const { paymentLink } = route.params;
  const dispatch = useDispatch();
  const paymentId = useSelector((state) => state.payments.paymentId);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const userId = useSelector((state) => state.auth.user);
    const subscriptionAction = useSelector((state) => state.subscription.subscriptionAction);
    const subscription = useSelector((state) => state.subscription.subscriptionDetails);
    const plan = useSelector((state) => state.plans.selectedPlan);

  // Function to handle navigation state changes
  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes('your-app-domain.com/payment-confirmation')) {
      const paymentData = {
        paymentId,
        status: 'paid',
      };

      dispatch(updatePaymentAction(paymentId, paymentData))
        .then(() => {
          Alert.alert('Payment Successful', 'Thank you for your payment!');
          navigation.navigate('Home'); // Navigate to an appropriate screen
        })
        .catch((error) => {
          console.error('Payment status update failed', error);
          Alert.alert('Payment Error', 'There was an issue confirming your payment.');
        });

      setLoading(false);
    }
  };

  // Function to pick an image from the device
  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  // Function to handle the screenshot upload
  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert('No image selected', 'Please select a screenshot to upload.');
      return;
    }


    // Convert image URI to base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const paymentData = {
      status: 'paid',
      paymentScreenshot: `data:image/jpeg;base64,${base64Image}`,
    };

    dispatch(updatePaymentAction(paymentId, paymentData))
      .then(() => {
        Alert.alert('Upload Successful', 'Your screenshot has been uploaded.');
        setModalVisible(false);
        setImageUri(null);
        
      })
      .catch((error) => {
        console.error('Screenshot upload failed', error);
        Alert.alert('Upload Error', 'There was an issue uploading your screenshot.');
      });

      const subscriptionData = { subscriptionId: subscription._id };

      if (subscriptionAction === 'renew') {
          dispatch(renewSubscriptionAction(subscriptionData));
      } else {
          const newPlanData = { ...subscriptionData, newPlanId: plan._id };
          dispatch(changeSubscriptionPlanAction(newPlanData));
      }

      dispatch(fetchUsedTracksAction(userId));

  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          After completing the payment, please take a screenshot and click the "I Have Paid - Upload Screenshot" button.
        </Text>
       
      </View>
      
      <WebView 
        source={{ uri: paymentLink }} 
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#6200b3" />}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>I Have Paid - Upload Screenshot</Text>
      </TouchableOpacity>
      {/* Modal for uploading screenshot */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Upload Payment Screenshot</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={openImagePicker}>
              <Text style={styles.uploadButtonText}>Select Screenshot</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
            
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={!imageUri}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    padding: 5,
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  infoText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#6200b3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#6200b3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentLinkScreen;

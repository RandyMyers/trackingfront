import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentAction } from '../store/actions/paymentActions';
import { changeSubscriptionPlanAction, fetchUsedTracksAction, renewSubscriptionAction } from '../store/actions/subscriptionActions';
import * as FileSystem from 'expo-file-system';

const CashappCheckoutScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { paymentData } = route.params;
    const [paymentLink, setPaymentLink] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ status: 'paid' });
    const [imageUri, setImageUri] = useState(null);
    const userId = useSelector((state) => state.auth.user);
    const paymentId = useSelector((state) => state.payments.paymentId);
    const subscriptionAction = useSelector((state) => state.subscription.subscriptionAction);
    const subscription = useSelector((state) => state.subscription.subscriptionDetails);
    const plan = useSelector((state) => state.plans.selectedPlan);

    useEffect(() => {
        dispatch(fetchUsedTracksAction(userId));

        if (paymentData) {
            const link = paymentData.paymentLinks[0];
            setPaymentLink(link);
        }
    }, [paymentData]);

    if (!paymentLink) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading payment information...</Text>
            </View>
        );
    }

    const copyToClipboard = () => {
        Clipboard.setString(paymentLink.cashAppId);
        Alert.alert('Copied to Clipboard', 'CashApp ID has been copied to the clipboard.');
    };

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

    const handleUploadScreenshot = () => {
        setModalVisible(true);
    };

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

        dispatch(updatePaymentAction(paymentId, paymentData));
        
        
        const subscriptionData = { 
            subscriptionId: subscription._id, 
            paymentStatus: 'paid' 
        };
          
        if (subscriptionAction === 'renew') {
            dispatch(renewSubscriptionAction(subscriptionData));
        } else {
            const newPlanData = { ...subscriptionData, newPlanId: plan._id };
            dispatch(changeSubscriptionPlanAction(newPlanData));
        }

        dispatch(fetchUsedTracksAction(userId));

        setModalVisible(false);
        navigation.navigate('Confirmation');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>CashApp ID: {paymentData?.paymentLinks[0]?.cashAppId}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.copyButtonText}>Copy CashApp ID</Text>
            </TouchableOpacity>
            <Image source={{ uri: paymentData?.paymentLinks[0]?.cashAppBarcode }} style={styles.barcode} />
            <Text style={styles.label}>Scan the barcode above to pay</Text>
            <TouchableOpacity style={styles.button} onPress={handleUploadScreenshot}>
                <Text style={styles.buttonText}>I have paid</Text>
            </TouchableOpacity>

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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
    },
    barcode: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#6200b3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    copyButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    copyButtonText: {
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

export default CashappCheckoutScreen;

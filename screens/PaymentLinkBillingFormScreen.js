import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createPaymentAction, createPaymentIntentAction } from '../store/actions/paymentActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdAction, updateAddressAction } from '../store/actions/userActions';
import { fetchUsedTracksAction } from '../store/actions/subscriptionActions';
import { fetchSubscriptionPlanDetailsAction } from '../store/actions/subscriptionPlanActions';

const PaymentBillingFormScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { paymentMethod } = route.params;
    const userId = useSelector((state) => state.auth.user);
    const plan = useSelector((state) => state.plans.selectedPlan);
    const activePlanId = useSelector((state) => state.subscription.activePlan);
    
   
    const loading = useSelector((state) => state.subscription.loading);
    const error = useSelector((state) => state.subscription.error);
    const user = useSelector((state) => state.user.selectedUser);



    const [fullName, setFullName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const paymentMethodId = paymentMethod._id;

    

    useEffect(() => {
        if (userId) {
            dispatch(fetchUsedTracksAction(userId));
        }
    }, [userId, dispatch]);

    useEffect(() => {
        if (userId) {
            dispatch(getUserByIdAction(userId));
        }
    }, [userId, dispatch]);

    useEffect(() => {
        if (!plan && activePlanId) {
            dispatch(fetchSubscriptionPlanDetailsAction(activePlanId));
        }
    }, [plan, activePlanId, dispatch]);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setStreet(user.address?.street || '');
            setCity(user.address?.city || '');
            setZipCode(user.address?.postalCode || '');
            setState(user.address?.state || '');
            setCountry(user.address?.country || '');
            setPhoneNumber(user.phoneNumber ? user.phoneNumber.toString() : '');
        }
    }, [user]);

    const handleContinue = async () => {
        if (!fullName || !street || !city || !state || !country || !phoneNumber) {
          alert('Please fill in all fields');
          return;
        }
    
        if (!plan) {
          alert('Subscription plan details are not available. Please try again later.');
          return;
        }
    
        const address = {
          street,
          city,
          zipCode,
          state,
          country,
        };
    
        const addressData = {
          fullName,
          phoneNumber,
          address,
        };
    
        const paymentLink = paymentMethod.paymentLinks.find(
          (link) => link.planId.toString() === plan._id.toString()
        );
    
        if (!paymentLink) {
          console.error('No payment link found for the selected plan.');
          return;
        }
    
        const paymentData = {
          userId,
          planId: plan._id,
          amount: plan.monthlyPrice,
          currency: plan.currency,
          name: fullName,
          phone: phoneNumber,
          address: addressData.address,
          paymentMethodId: paymentMethod._id,
          paymentLinkId: paymentLink._id, // Include paymentLinkId
        };
    
        await dispatch(createPaymentAction(paymentData));
        await dispatch(updateAddressAction(userId, addressData));
    
        navigation.navigate('PaymentLink', { paymentLink: paymentLink.paymentLink });
      };
    
      

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#000"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Street"
                placeholderTextColor="#000"
                value={street}
                onChangeText={setStreet}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#000"
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Zip Code"
                placeholderTextColor="#000"
                value={zipCode}
                onChangeText={setZipCode}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                placeholderTextColor="#000"
                value={state}
                onChangeText={setState}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                placeholderTextColor="#000"
                value={country}
                onChangeText={setCountry}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#000"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleContinue}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    title: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#e9ecef'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#6200b3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '80%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default PaymentBillingFormScreen;

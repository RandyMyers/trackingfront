import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentAction } from '../../store/actions/paymentActions';
import { getUserByIdAction } from '../../store/actions/userActions';

const BillingSummary = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user);
    const user = useSelector((state) => state.user.selectedUser);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    console.log('Selected User',user);


    useEffect(() => {
        // Dispatch action to get packages for the user
        dispatch(getUserByIdAction(userId));
      }, [dispatch, userId]);

    

      if (loading) {
        return (
          <View style={[styles.container, styles.loadingContainer]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
    
      if (error) {
        Alert.alert('Error', 'An error occurred while fetching packages.');
        return (
          <View style={[styles.container, styles.errorContainer]}>
            <Text>Error occurred. Please try again later.</Text>
          </View>
        );
      }

      if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.summaryTitle}>No user found</Text>
            </View>
        );
    }

    if (!user.address) {
      return (
        <View style={styles.container}>
          <Text style={styles.summaryTitle}>No address information found</Text>
        </View>
      );
    }

    return (
        <View style={styles.container}>
          
            <Text style={styles.summaryTitle}>Billing Details</Text>

            <View style={styles.item}>
                <Text style={styles.label}> Name:</Text>
                <Text>{user.fullName}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Address:</Text>
                <Text>{user.address.street}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>City:</Text>
                <Text>{user.address.city}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Zip Code</Text>
                <Text>{user.address.postalCode}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>State:</Text>
                <Text>{user.address.state}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Country:</Text>
                <Text>{user.address.country}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 20,
        marginLeft: 15,
        marginTop: 25,
        padding: 10,
        borderRadius: 10,
        width: '90%',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    loadingContainer: {
        backgroundColor: '#f0f0f0',
      },
      errorContainer: {
        backgroundColor: '#ffebee',
      },
});

export default BillingSummary;

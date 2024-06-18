import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SubscriptionPlans from '../components/home/SubscriptionPlans';
import { fetchSubscriptionPlansAction } from '../store/actions/subscriptionPlanActions';


const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.subscriptionPlans);
  const loading = useSelector((state) => state.plans.loading);
  const error = useSelector((state) => state.plans.error);

  

  useEffect(() => {
    dispatch(fetchSubscriptionPlansAction());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        // If loading is true, display loading indicator
        <ActivityIndicator size="large" color="#6200b3" style={styles.loader} />
      ) : error ? (
        // If there's an error, display the error message
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        // If loading is false and there's no error, render the subscription plans component
        <View style={styles.section}>
          <SubscriptionPlans plans={plans} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 13, // Add horizontal padding
  },
  section: {
    marginTop: 20, // Add margin between sections
  },
  loader: {
    marginTop: 50, // Adjust loader margin from top
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 50, // Adjust error message margin from top
  },
});

export default SubscriptionScreen;

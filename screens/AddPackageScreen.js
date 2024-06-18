import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AddPackageForm from '../components/package/AddPackage';
import UpgradeModal from '../components/home/UpgradeModal';
import RenewSubscriptionModal from '../components/home/renewSubscriptionModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsedTracksAction } from '../store/actions/subscriptionActions';

const AddPackageScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const usedTrackingNumbers = useSelector((state) => state.subscription.usedTracks);
  const totalTrackingNumbers = useSelector((state) => state.subscription.allowedTracks);
  const subscriptionPlan = useSelector((state) => state.subscription.plan);
  const remainingDays = useSelector((state) => state.subscription.remainingDays);
  const loading = useSelector((state) => state.subscription.loading);
  const error = useSelector((state) => state.subscription.error);

  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
  const [isRenewModalVisible, setIsRenewModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsedTracksAction(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (subscriptionPlan === 'Trial' && remainingDays <= 0) {
      setIsUpgradeModalVisible(true);
    } else if (remainingDays <= 0 && subscriptionPlan !== 'Trial') {
      setIsRenewModalVisible(true);
    }
  }, [subscriptionPlan, remainingDays]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (
    usedTrackingNumbers === null ||
    totalTrackingNumbers === null ||
    subscriptionPlan === null ||
    remainingDays === null
  ) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Data is null</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AddPackageForm
          setIsUpgradeModalVisible={setIsUpgradeModalVisible}
          setIsRenewModalVisible={setIsRenewModalVisible}
          used={usedTrackingNumbers}
          total={totalTrackingNumbers}
          plan={subscriptionPlan}
          remainingDays={remainingDays}
        />
        <UpgradeModal
          isVisible={isUpgradeModalVisible}
          onClose={() => setIsUpgradeModalVisible(false)}
        />
        <RenewSubscriptionModal
          isVisible={isRenewModalVisible}
          onClose={() => setIsRenewModalVisible(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddPackageScreen;

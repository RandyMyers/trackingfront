import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import UsageTracker from '../components/home/UsageTracker';
import AddPackage from '../components/home/AddPackage';
import UpgradeModal from '../components/home/UpgradeModal';
import RenewSubscriptionModal from '../components/home/renewSubscriptionModal';
import { useNavigation } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';
import DrawerMenu from '../components/home/DrawerMenu';
import SubscriptionCard from '../components/subscription/SubscriptionCard';
import { fetchUsedTracksAction } from '../store/actions/subscriptionActions';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsAction } from '../store/actions/notificationActions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const usedTracks = useSelector((state) => state.subscription.usedTracks);
  const allowedTracks = useSelector((state) => state.subscription.allowedTracks);
  const plan = useSelector((state) => state.subscription.plan);
  const remainingDays = useSelector((state) => state.subscription.remainingDays);
  const loading = useSelector((state) => state.subscription.loading);
  const error = useSelector((state) => state.subscription.error);

  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
  const [isRenewModalVisible, setIsRenewModalVisible] = useState(false);

  console.log(usedTracks, allowedTracks, remainingDays, plan);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsedTracksAction(userId));

    }
  }, [userId, dispatch]);

  useEffect(() => {
    if ((plan === 'Trial' && remainingDays === 0) || (plan === 'Trial' && usedTracks >= allowedTracks)) {
      setIsUpgradeModalVisible(true);
    } else if (remainingDays === 0 && plan !== 'Trial' || (plan !== 'Trial' && usedTracks >= allowedTracks)) {
      setIsRenewModalVisible(true);
    } else {
      setIsUpgradeModalVisible(false);
      setIsRenewModalVisible(false);
    }
  }, [plan, remainingDays, usedTracks, allowedTracks]);

  //useEffect(() => {
  //  const interval = setInterval(() => {
  //    if (userId) {
   //     dispatch(fetchUsedTracksAction(userId));
  //    }
  //  }, 300000); // 300000 milliseconds = 5 minutes

  //  return () => clearInterval(interval); // Cleanup on unmount
 // }, [userId, dispatch]);

  

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
    usedTracks === null ||
    allowedTracks === null ||
    plan === null ||
    remainingDays === null
  ) {
    return (
      <View style={styles.nullDataContainer}>
        <Text style={styles.nullDataText}>Data not available</Text>
      </View>
    );
  }

  return (
    <Drawer.Section drawerContent={<DrawerMenu />}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Usage Tracker</Text>
          <UsageTracker
            used={usedTracks}
            total={allowedTracks}
            plan={plan}
            remainingDays={remainingDays}
          />
        </View>
        <View style={styles.section}>
          <AddPackage />
        </View>
        <View style={styles.section}>
          <SubscriptionCard />
        </View>
      </ScrollView>

      <UpgradeModal
        isVisible={isUpgradeModalVisible}
        onClose={() => setIsUpgradeModalVisible(false)}
      />
      <RenewSubscriptionModal
        isVisible={isRenewModalVisible}
        onClose={() => setIsRenewModalVisible(false)}
      />
    </Drawer.Section>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#10002b',
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
  nullDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nullDataText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;

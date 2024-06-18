import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import PackageList from '../components/package/PackageLists';
import { useDispatch, useSelector } from 'react-redux';
import { getPackagesForUserAction } from '../store/actions/packageActions';

const PackageListScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.package.loading);
  const error = useSelector(state => state.package.error);
  const packages = useSelector(state => state.package.packages);

  useEffect(() => {
    if (userId) {
      dispatch(getPackagesForUserAction(userId));
    }
  }, [dispatch, userId]);

  const onPressPackage = (packageItem) => {
    // Add navigation logic or any other action here
  };

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

  if (!packages || packages.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No packages available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PackageList packages={packages} onPressPackage={onPressPackage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loadingContainer: {
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
  },
});

export default PackageListScreen;

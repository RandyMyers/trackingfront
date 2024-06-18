import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo Vector Icons
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useDispatch, useSelector } from 'react-redux';
import { getPackagesForUserAction } from '../../../store/actions/packageActions';

const AllTabs = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.package.loading);
    const error = useSelector(state => state.package.error);
    const packages = useSelector(state => state.package.packages);

    useEffect(() => {
        // Dispatch action to get packages for the user
        dispatch(getPackagesForUserAction(userId));
    }, []);

    // Dummy onPressPackage function for testing
    const onPressPackage = (packageItem) => {
        console.log('Pressed package:', packageItem);
        // Add navigation logic or any other action here
    };

    // Define mapping of delivery statuses to their corresponding colors and icons
    const statusIconMap = {
        pending: { color: '#FF5733', icon: 'plane', library: 'FontAwesome' },
        notfound: { color: '#FFC300', icon: 'info', library: 'MaterialIcons' },
        transit: { color: '#36a2eb', icon: 'directions-transit', library: 'MaterialIcons' },
        pickup: { color: '#FF5733', icon: 'local-shipping', library: 'MaterialIcons' },
        delivered: { color: '#4CAF50', icon: 'check-circle', library: 'MaterialIcons' },
        expired: { color: '#795548', icon: 'warning', library: 'MaterialIcons' },
        undelivered: { color: '#E53935', icon: 'error', library: 'MaterialIcons' },
        exception: { color: '#9C27B0', icon: 'error-outline', library: 'MaterialIcons' },
        InfoReceived: { color: '#607D8B', icon: 'sync', library: 'MaterialIcons' }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorText>{error}</ErrorText>;
    }

    return (
        <Container>
            {packages.map((packageItem, index) => (
                <PackageCard
                    key={index}
                    onPress={() => onPressPackage(packageItem)}
                >
                    <PackageInfo>
                        <DeliveryStatus >
                            <StatusIcon>
                                {statusIconMap[packageItem.deliveryStatus].library === 'FontAwesome' ? (
                                    <FontAwesome name={statusIconMap[packageItem.deliveryStatus].icon} size={24} color={statusIconMap[packageItem.deliveryStatus].color} />
                                ) : (
                                    <MaterialIcons name={statusIconMap[packageItem.deliveryStatus].icon} size={24} color={statusIconMap[packageItem.deliveryStatus].color} />
                                )}
                            </StatusIcon>
                            <StatusText style={{ color: statusIconMap[packageItem.deliveryStatus].color }}>{packageItem.deliveryStatus}</StatusText>
                        </DeliveryStatus>
                        <TrackingNumber>{packageItem.trackingNumber}</TrackingNumber>
                        <Location>{packageItem.latest_event || 'Latest event is pending or yet to update. Check in later after some hours.'}</Location>
                    </PackageInfo>
                    <PackageImage
                        source={require('../../../images/package.png')}
                    />
                </PackageCard>
            ))}
        </Container>
    );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const PackageCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  width: 95%;
  margin-top: 10px;
`;

const PackageInfo = styled.View`
  flex: 1;
`;

const TrackingNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DeliveryStatus = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e9ecef;
  border-radius: 15px;
  width: 40%;
  padding: 3px;
`;

const StatusIcon = styled.View`
  margin-right: 5px;
`;

const StatusText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

const Location = styled.Text`
  font-size: 12px;
  color: #888;
`;

const PackageImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const LoadingIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

const ErrorText = styled.Text`
  font-size: 16px;
  color: red;
`;

export default AllTabs;

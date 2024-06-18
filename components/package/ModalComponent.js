import React from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome and MaterialIcons
import PackageTimeline from './PackageTimeline';
import { updatePackageStatusAction } from '../../store/actions/packageActions';

const statusIconMap = {
  all: { label: 'All', color: '#fca311', icon: 'filter', library: 'MaterialIcons' },
  pending: { label: 'Pending', color: '#2ec4b6', icon: 'downloading', library: 'MaterialIcons' },
  transit: { label: 'Transit', color: '#36a2eb', icon: 'plane', library: 'FontAwesome' },
  pickup: { label: 'Pickup', color: '#03045e', icon: 'local-shipping', library: 'MaterialIcons' },
  delivered: { label: 'Delivered', color: '#4CAF50', icon: 'check-circle', library: 'MaterialIcons' },
  InfoReceived: { label: 'Info Received', color: '#607D8B', icon: 'sync', library: 'MaterialIcons' },
  notfound: { label: 'Not Found', color: '#FFC300', icon: 'info', library: 'MaterialIcons' },
  expired: { label: 'Expired', color: '#795548', icon: 'warning', library: 'MaterialIcons' },
  undelivered: { label: 'Undelivered', color: '#E53935', icon: 'error', library: 'MaterialIcons' },
  exception: { label: 'Exception', color: '#9C27B0', icon: 'error-outline', library: 'MaterialIcons' }
};

const ModalComponent = ({ visible, onClose, packageItem }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.auth.user);
    
    const handleUpdateStatus = (packageItem) => {
        // Dispatch the action to update the package status here
        const packageId = packageItem._id;
        dispatch(updatePackageStatusAction(packageId, userId));

        // Refresh the screen by updating the state or refetching the data
        // Example: setRefresh(!refresh);
    };
  // Check if packageItem is null
  if (!packageItem) {
    return null; // Return null if packageItem is null
  }

  // Get the status icon and color based on the delivery status
  const { icon, color, label, library } = statusIconMap[packageItem.deliveryStatus] || {};

  return (
    <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
    >
        <StyledModalContent>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Reload button */}
                <ReloadButton onPress={() => handleUpdateStatus(packageItem)}>
                    <MaterialIcons name="refresh" size={24} color="#000" />
                </ReloadButton>
                <ModalHeader>
                    <HeaderText>Tracking Information</HeaderText>
                </ModalHeader>
                <DetailsContainer>
                    <DetailLabel>Tracking Number:</DetailLabel>
                    <DetailText>{packageItem.trackingNumber}</DetailText>
                    <DetailLabel>Latest Event:</DetailLabel>
                    <DetailText>{packageItem.latest_event}</DetailText>
                </DetailsContainer>
                <DeliveryStatusContainer backgroundColor={color}>
                    {library === 'MaterialIcons' ? (
                        <MaterialIcons name={icon} size={24} color="#fff" />
                    ) : (
                        <FontAwesome name={icon} size={24} color="#fff" />
                    )}
                    <StatusText>{label}</StatusText>
                </DeliveryStatusContainer>
                {packageItem.destination_info[0].trackinfo.length > 0 ? (
                    <PackageTimeline
                        trackinfo={packageItem.destination_info[0].trackinfo}
                        location={packageItem.origin_info[0].location}
                    />
                ) : (
                    <PackageTimeline
                        trackinfo={packageItem.origin_info[0].trackinfo}
                        location={packageItem.origin_info[0].location}
                    />
                )}
            </ScrollView>
            <CloseButton onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#000" />
            </CloseButton>
        </StyledModalContent>
    </Modal>
);
};

const StyledModalContent = styled.View`
flex: 1;
background-color: #f0f0f0; /* Light grey */
padding: 20px;
`;

const ModalHeader = styled.View`
align-items: center;
margin-bottom: 20px;
`;

const HeaderText = styled.Text`
font-size: 18px;
font-weight: bold;
`;

const DetailsContainer = styled.View`
margin-bottom: 20px;
background-color: #fff;
border-radius: 10px;
padding: 15px;
`;

const DeliveryStatusContainer = styled.View`
margin-bottom: 20px;
background-color: ${({ backgroundColor }) => backgroundColor || '#fff'}; /* Use the provided background color */
border-radius: 8px;
padding: 10px;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const DetailLabel = styled.Text`
font-weight: bold;
margin-bottom: 5px;
`;

const DetailText = styled.Text`
margin-bottom: 10px;
`;

const StatusText = styled.Text`
color: #fff;
margin-left: 2px;
`;

const CloseButton = styled.TouchableOpacity`
position: absolute;
top: 20px;
right: 20px;
`;

// Styled component for the reload button
const ReloadButton = styled.TouchableOpacity`
position: absolute;
top: 1px;
left: 5px;

`;

export default ModalComponent;
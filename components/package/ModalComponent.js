import React from 'react';
import { Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
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
  const userId = useSelector((state) => state.auth.user);

  const handleUpdateStatus = (packageItem) => {
    const packageId = packageItem._id;
    dispatch(updatePackageStatusAction(packageId, userId));
  };

  if (!packageItem) {
    return null;
  }

  const { icon, color, label, library } = statusIconMap[packageItem.deliveryStatus] || {};

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <StyledModalContent>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ReloadButton onPress={() => handleUpdateStatus(packageItem)}>
            <MaterialIcons name="refresh" size={24} color="#000" />
          </ReloadButton>
          <ModalHeader>
            <HeaderText>Tracking Information</HeaderText>
          </ModalHeader>
          <DetailsContainer>
            <DetailItem>
                <DetailItemHeader >
                   <MaterialIcons name="local-shipping" size={20} color="#000" />
                   <DetailLabel>Tracking Number:</DetailLabel>
                </DetailItemHeader>
              
              <DetailText>{packageItem.trackingNumber}</DetailText>
            </DetailItem>
            <Divider />
            <DetailItem>
                <DetailItemHeader>
                    <MaterialIcons name="event" size={20} color="#000" />
                    <DetailLabel>Latest Event:</DetailLabel>
                </DetailItemHeader>
              
              <DetailText>{packageItem.latest_event}</DetailText>
            </DetailItem>
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
  background-color: #f0f0f0;
  padding: 20px;
`;

const ModalHeader = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const DetailsContainer = styled.View`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  shadow-color: #000;
  
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  margin-bottom: 20px;
`;

const DetailItem = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
`;

const DetailItemHeader = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const DetailLabel = styled.Text`
  font-weight: bold;
  margin-left: 10px;
  color: #333;
  font-size: 16px;
`;

const DetailText = styled.Text`
  margin-left: auto;
  color: #555;
  font-size: 15px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #ddd;
  margin-vertical: 10px;
`;

const DeliveryStatusContainer = styled.View`
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: 8px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StatusText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ReloadButton = styled.TouchableOpacity`
  position: absolute;
  top: 1px;
  left: 5px;
`;

export default ModalComponent;

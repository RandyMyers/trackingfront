import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ModalComponent from './ModalComponent';
import { useTranslation } from 'react-i18next';

const PackageList = ({ packages, onPressPackage }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const statusIconMap = {
    all: { label: t('All'), color: '#fca311', icon: 'filter', library: 'MaterialIcons' },
    pending: { label: t('Pending'), color: '#2ec4b6', icon: 'downloading', library: 'MaterialIcons' },
    transit: { label: t('Transit'), color: '#36a2eb', icon: 'plane', library: 'FontAwesome' },
    pickup: { label: t('Pickup'), color: '#03045e', icon: 'local-shipping', library: 'MaterialIcons' },
    delivered: { label: t('Delivered'), color: '#4CAF50', icon: 'check-circle', library: 'MaterialIcons' },
    InfoReceived: { label: t('Info Received'), color: '#607D8B', icon: 'sync', library: 'MaterialIcons' },
    notfound: { label: t('Not Found'), color: '#FFC300', icon: 'info', library: 'MaterialIcons' },
    expired: { label: t('Expired'), color: '#795548', icon: 'warning', library: 'MaterialIcons' },
    undelivered: { label: t('Undelivered'), color: '#E53935', icon: 'error', library: 'MaterialIcons' },
    exception: { label: t('Exception'), color: '#9C27B0', icon: 'error-outline', library: 'MaterialIcons' },
  };

  const handleViewDetails = (packageItem) => {
    setSelectedPackage(packageItem);
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const filteredPackages = selectedTab === 'all' ? packages : packages.filter(packageItem => packageItem.deliveryStatus === selectedTab);

  return (
    <Container>
      {packages.length > 0 && (
        <TabBar horizontal>
          {Object.keys(statusIconMap).map((status, index) => (
            <TabButton
              key={index}
              onPress={() => setSelectedTab(status)}
              active={selectedTab === status}
            >
              {statusIconMap[status].library === 'FontAwesome' ? (
                <FontAwesome name={statusIconMap[status].icon} size={20} color={statusIconMap[status].color} />
              ) : (
                <MaterialIcons name={statusIconMap[status].icon} size={20} color={statusIconMap[status].color} />
              )}
              <TabButtonText active={selectedTab === status}>
                {statusIconMap[status].label}
              </TabButtonText>
            </TabButton>
          ))}
        </TabBar>
      )}

      <ScrollView>
        {filteredPackages.length > 0 ? (
          filteredPackages.map((packageItem, index) => (
            <PackageCard key={index}>
              <PackageInfo>
                <DeliveryStatus>
                  <StatusIcon>
                    {statusIconMap[packageItem.deliveryStatus].library === 'FontAwesome' ? (
                      <FontAwesome name={statusIconMap[packageItem.deliveryStatus].icon} size={24} color={statusIconMap[packageItem.deliveryStatus].color} />
                    ) : (
                      <MaterialIcons name={statusIconMap[packageItem.deliveryStatus].icon} size={24} color={statusIconMap[packageItem.deliveryStatus].color} />
                    )}
                  </StatusIcon>
                  <StatusText style={{ color: statusIconMap[packageItem.deliveryStatus].color }}>
                    {statusIconMap[packageItem.deliveryStatus].label}
                  </StatusText>
                </DeliveryStatus>
                <TrackingNumber>{packageItem.trackingNumber}</TrackingNumber>
                <Location>{packageItem.latest_event || t('Latest event is pending or yet to update. Check in later after some hours.')}</Location>
                <UpdateButton onPress={() => handleViewDetails(packageItem)}>
                  <ButtonText>{t('View Details')}</ButtonText>
                </UpdateButton>
              </PackageInfo>
              <PackageImage source={require('../../images/package1.png')} />
            </PackageCard>
          ))
        ) : (
          <Text>{t('No packages available')}</Text>
        )}
      </ScrollView>

      <ModalComponent
        visible={!!selectedPackage}
        onClose={handleCloseModal}
        packageItem={selectedPackage}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const TabBar = styled.ScrollView`
  flex-grow: 0;
  margin-bottom: 10px;
`;

const TabButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  background-color: ${({ active }) => (active ? '#6200b3' : '#fff')};
  border-radius: 20px;
  margin-right: 10px;
`;

const TabButtonText = styled.Text`
  color: ${({ active }) => (active ? '#fff' : '#000')};
  font-weight: bold;
  margin-left: 5px;
  padding: 2px;
`;

const PackageCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
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
  padding: 3px 10px;
  width: 100px;
`;

const StatusIcon = styled.View`
  margin-right: 3px;
`;

const StatusText = styled.Text`
  font-size: 14px;
  font-weight: bold;
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

const UpdateButton = styled.TouchableOpacity`
  background-color: #5a189a;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 50%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export default PackageList;

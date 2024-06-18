import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';

// Styled components
const CourierItemContainer = styled.View`
  flex-direction: row;
  width:93%;
  padding: 15px;
  margin-vertical: 5px;
  background-color: #ffffff;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

const CourierLogo = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const DetailsContainer = styled.View`
  justify-content: center;
`;

const CourierName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const CourierType = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const CountryCode = styled.Text`
  font-size: 14px;
  color: #888888;
`;

// Memoize the CourierItem to prevent unnecessary re-renders
const CourierItem = React.memo(({ courier }) => {
  const logoUrl = courier.courier_logo.startsWith('//') ? `https:${courier.courier_logo}` : courier.courier_logo;

  return (
    <CourierItemContainer>
      <CourierLogo source={{ uri: logoUrl }} />
      <DetailsContainer>
        <CourierName>{courier.courier_name}</CourierName>
        <CourierType>{courier.courier_type}</CourierType>
        <CountryCode>{courier.country_code}</CountryCode>
      </DetailsContainer>
    </CourierItemContainer>
  );
});

export default CourierItem;

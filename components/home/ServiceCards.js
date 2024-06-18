import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const ServiceCards = () => {
  return (
    <Container horizontal>
      <ServiceCard>
        {/* Content for Service Card 1 */}
        <ServiceCardTitle>Service 1</ServiceCardTitle>
        <ServiceCardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ServiceCardContent>
      </ServiceCard>
      <ServiceCard>
        {/* Content for Service Card 2 */}
        <ServiceCardTitle>Service 2</ServiceCardTitle>
        <ServiceCardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ServiceCardContent>
      </ServiceCard>
      {/* Add more ServiceCards as needed */}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex-direction: row;
  padding: 10px;
`;

const ServiceCard = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-right: 10px;
  width: 200px;
  elevation: 2; /* For shadow on Android */
  shadow-color: #000; /* For shadow on iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const ServiceCardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ServiceCardContent = styled.Text`
  font-size: 14px;
`;

export default ServiceCards;

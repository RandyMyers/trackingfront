import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const PaymentSuccessScreen = () => {
  return (
    <Container>
      <InnerContainer>
      <Icon name="checkmark-circle" size={100} color="green" />
      <SuccessText>Payment Successful!</SuccessText>
      </InnerContainer>
    </Container>
  );
};


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const InnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 90%;
  height: 350px;
  border-radius: 10px;
`;



const Icon = styled(Ionicons)`
  margin-bottom: 20px;
`;

const SuccessText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default PaymentSuccessScreen;

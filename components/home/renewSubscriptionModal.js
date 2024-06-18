import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSubscriptionAction } from '../../store/actions/subscriptionActions';

const ModalContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  width: 80%;
  margin: 0 auto;
  position: relative;
`;

const ModalText = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  color: #000;
`;

const RenewButton = styled.TouchableOpacity`
  background-color: #6200b3;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

const RenewButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

const RenewSubscriptionModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRenew = () => {
    let actionType = 'renew';
    
    dispatch(setSubscriptionAction(actionType));
    navigation.navigate('PaymentMethod');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onPress={onClose}>
          <CloseButtonText>X</CloseButtonText>
        </CloseButton>
        <StyledImage source={require('../../images/deliveryman.jpg')} />
        <ModalText>Your subscription is about to end. Renew your subscription to continue using the service.</ModalText>
        <RenewButton onPress={handleRenew}>
          <RenewButtonText>Renew Subscription</RenewButtonText>
        </RenewButton>
      </ModalContainer>
    </Overlay>
  );
};

export default RenewSubscriptionModal;

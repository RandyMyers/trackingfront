import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

// Styled components
const Card = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 8px; 
  margin-bottom: 16px;
  width: 140px; 
  
  margin-right: 10px; 
  position: relative; 
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100px; 
  border-radius: 8px;
  margin-bottom: 8px; 
`;

const Header = styled.Text`
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
  font-weight: bold;
`;

const CouponCode = styled.Text`
  font-size: 12px; 
  color: #6200b3;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Expiration = styled.Text`
  font-size: 12px; 
  color: #999;
`;

const FullScreenImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
`;

const NavigateButton = styled.TouchableOpacity`
  background-color: #6200b3;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px; 
  right: 8px;
`;

// CouponCard component
const CouponCard = ({ coupon, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Card>
      <TouchableOpacity onPress={() => navigation.navigate('CouponDetail', { coupon })}>
        <StyledImage source={{ uri: coupon.imageUrl }} />
      </TouchableOpacity>
      <Header>{coupon.title}</Header>
      <CouponCode>Code: {coupon.couponCode}</CouponCode>
      <Expiration>Expires on: {new Date(coupon.endDate).toLocaleDateString()}</Expiration>

      <NavigateButton onPress={() => navigation.navigate('CouponDetail', { coupon })}>
        <AntDesign name="plus" size={20} color="#fff" />
      </NavigateButton>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <FullScreenImage source={{ uri: coupon.imageUrl }} resizeMode="contain" />
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default CouponCard;

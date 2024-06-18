import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon library
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Container = styled.View`
  background-color: #caf0f8;
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const InnerContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #03045e;
`;

const Button = styled.TouchableOpacity`
  background-color: #03045e;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const Icon = styled(FontAwesome)`
  margin-left: 10px;
`;

const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const SubscriptionCard = () => {
  const navigation = useNavigation(); 

  const handleSubscription = () => {
    navigation.navigate('Subscription'); 
  };

  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <Title>Unlock Exclusive Benefits with Subscription Plans</Title>
          <Button onPress={handleSubscription}> 
            <ButtonText>Explore</ButtonText>
          </Button>
        </TextContainer>
        <ImageContainer>
          <Image source={require('../../images/customer.png')} style={{ width: 120, height: 120 }} />
        </ImageContainer>
      </InnerContainer>
    </Container>
  );
};

export default SubscriptionCard;

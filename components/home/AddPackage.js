import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon library
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Container = styled.View`
  background-color: #d3b8ff;
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
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
  color: #6200b3;
`;

const Button = styled.TouchableOpacity`
  background-color: #6200b3;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 8px;
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

const AddPackage = () => {
  const navigation = useNavigation(); 

  const handleAddShipment = () => {
    navigation.navigate('AddPackage'); 
  };

  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <Title>Track all your incoming shipments in one place</Title>
          <Button onPress={handleAddShipment}> 
            <ButtonText>Add Shipment</ButtonText>
          </Button>
        </TextContainer>
        <ImageContainer>
          <Image source={require('../../images/46.png')} style={{ width: 120, height: 120 }} />
        </ImageContainer>
      </InnerContainer>
    </Container>
  );
};

export default AddPackage;

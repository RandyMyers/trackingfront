import React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components/native'; // Import from 'styled-components/native'
import { Feather } from '@expo/vector-icons';

const WelcomeScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
 
  background-color: #ffffff; /* Set your background color */
  padding: 20px;
`;

const LogoImage = styled.Image`
  width: 150px; /* Adjust the size as needed */
  height: 150px;
  margin-bottom: 20px;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333; /* Set your text color */
`;

const IntroductionText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #666666; /* Set your text color */
  margin-bottom: 20px;
`;

const IllustrationImage = styled.Image`
  width: 100%; /* Make the image take the full width */
  max-height: 200px; /* Adjust the max height as needed */
  resize-mode: cover;
  margin-bottom: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #5a189a; /* Set your button color */
  color: #000814; /* Set your button text color */
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ActionButtonText = styled.Text`
  color: #fff; /* Set your button text color */
`;

const ExploreButton = styled.TouchableOpacity`
  background-color: transparent;
  color: #3498db; /* Set your button text color */
  font-size: 16px;
  text-decoration: underline;
`;

const ExploreButtonText = styled.Text`
  color: #3498db; /* Set your button text color */
  text-decoration: underline;
`;

const FooterText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #999999; /* Set your text color */
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`;

const PackageIcon = styled(Feather)`
  color: #fb8500; /* Set your icon color */
  font-size: 50px; /* Adjust the icon size as needed */
  margin-bottom: 20px;
`;

const LogoText = styled.Text`
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 14px;
  align-items: center;
  color: #3c096c; /* Set your text color */
`;

const PackageImage = styled.Image`
  width: 250px; /* Adjust the size as needed */
  height: 250px;
  margin-bottom: 20px;
`;

const WelcomeScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    // Navigate to the register screen
    navigation.navigate('Register');
  };

  const handleExplorePress = () => {
    // Navigate to the explore screen or any other relevant action
  };

  return (
    <WelcomeScreenContainer>
      
      <LogoContainer> 
         <PackageIcon name="box" />
         <LogoText>CouponDelight</LogoText>
      </LogoContainer>

      <WelcomeText>Welcome to Package Tracker!</WelcomeText>

      <PackageImage source={require('../images/package.jpg')} />

      <IntroductionText>
        Track all your packages in one place and get real-time updates on their status.
      </IntroductionText>
      
      <ButtonContainer>
        <ActionButton onPress={handleLoginPress}>
          <ActionButtonText>Login</ActionButtonText>
        </ActionButton>
        <ActionButton onPress={handleRegisterPress}>
          <ActionButtonText>Register</ActionButtonText>
        </ActionButton>
      </ButtonContainer>
      <ExploreButton onPress={handleExplorePress}>
        
      </ExploreButton>
      <FooterText>
        By continuing, you agree to our{' '}
        <Text style={{ color: '#5a189a', textDecorationLine: 'underline' }} href="/terms">
          Terms
        </Text>{' '}
        and{' '}
        <Text style={{ color: '#5a189a', textDecorationLine: 'underline' }} href="/privacy">
          Privacy Policy
        </Text>
        .
      </FooterText>
    </WelcomeScreenContainer>
  );
};

export default WelcomeScreen;

import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff; /* Set your background color */
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333; /* Set your text color */
`;

const Paragraph = styled.Text`
  font-size: 16px;
  color: #666666; /* Set your text color */
  margin-bottom: 10px;
`;

const TermsScreen = () => {
  return (
    <Container>
      <ScrollView>
        <Title>Terms and Conditions</Title>
        
        <Paragraph>Last updated: August 7, 2024</Paragraph>

        <Paragraph>Welcome to Track4u! By accessing or using our app, you agree to comply with and be bound by the following terms and conditions:</Paragraph>

        <Title>1. Use of the App</Title>
        <Paragraph>You may use the app for lawful purposes only. You must not use the app in any way that breaches any applicable local, national, or international law or regulation.</Paragraph>

        <Title>2. User Accounts</Title>
        <Paragraph>When you create an account with us, you must provide accurate information. You are responsible for maintaining the confidentiality of your account and password.</Paragraph>

        <Title>3. Privacy</Title>
        <Paragraph>Your use of the app is also governed by our Privacy Policy. Please review our Privacy Policy for more information on how we collect, use, and disclose your personal information.</Paragraph>

        <Title>4. Intellectual Property</Title>
        <Paragraph>All content included in the app, such as text, graphics, logos, images, and software, is the property of Track4u or its content suppliers and protected by intellectual property laws.</Paragraph>

        <Title>5. Termination</Title>
        <Paragraph>We may terminate or suspend your account immediately, without prior notice, if you breach these terms and conditions.</Paragraph>

        <Title>6. Changes to Terms</Title>
        <Paragraph>We reserve the right to modify these terms at any time. Your continued use of the app after any changes indicates your acceptance of the new terms.</Paragraph>

        <Title>7. Contact Us</Title>
        <Paragraph>If you have any questions about these terms, please contact us at support@track4u.com.</Paragraph>
      </ScrollView>
    </Container>
  );
};

export default TermsScreen;

import React from 'react';
import { ScrollView, View, Text } from 'react-native'; // Import ScrollView
import styled from 'styled-components/native'; // Import styled-components for React Native

import EmailSettings from '../components/home/EmailSettings';
import NotificationSettings from '../components/home/NotificationSettings';

const SettingsScreen = () => {
  return (
    <ScrollView> 
      <Container>
        <Section>
          <EmailSettingsContainer>
            <EmailSettings />
          </EmailSettingsContainer>
        </Section>
        
        <SettingContainer>
          <SettingTitle>Notification Settings</SettingTitle>
          <NotificationSettings /> 
        </SettingContainer>
      </Container>
    </ScrollView>
  );
};

// Styled components
const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Section = styled.View`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  padding: 20px;
  margin-bottom: 20px;
`;

const EmailSettingsContainer = styled.View`
  width: 90%;
  height: 460px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SettingContainer = styled.View`
  margin-bottom: 20px;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const SettingTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default SettingsScreen;

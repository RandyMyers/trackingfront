import React, { useState } from 'react';
import { View, Switch, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native'; // Import styled-components for React Native

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    inTransit: true,
    outForDelivery: true,
    delivered: true,
    exception: true,
    expired: true,
    notificationFrequency: 'immediate', // Example: immediate, hourly, daily
    quietHours: { start: '22:00', end: '06:00' }, // Example: 10:00 PM - 6:00 AM
    customSounds: true,
    selectedSound: 'default', // Example: customSound1, customSound2, default
    reminders: true,
    alerts: true,
  });

  const toggleNotification = (type) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };

  const toggleNotificationFrequency = (frequency) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      notificationFrequency: frequency,
    }));
  };

  const toggleCustomSounds = () => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      customSounds: !prevSettings.customSounds,
    }));
  };

  const toggleReminders = () => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      reminders: !prevSettings.reminders,
    }));
  };

  const toggleAlerts = () => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      alerts: !prevSettings.alerts,
    }));
  };

  return (
    <Container>
    
      {/* Custom notification sounds */}
      <Setting>
        <SettingText>Custom Sounds</SettingText>
        <Switch value={notificationSettings.customSounds} onValueChange={toggleCustomSounds} />
      </Setting>

      {/* Reminders */}
      <Setting>
        <SettingText>Reminders</SettingText>
        <Switch value={notificationSettings.reminders} onValueChange={toggleReminders} />
      </Setting>

      {/* Alerts */}
      <Setting>
        <SettingText>Alerts</SettingText>
        <Switch value={notificationSettings.alerts} onValueChange={toggleAlerts} />
      </Setting>
    </Container>
  );
};

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Setting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SettingText = styled.Text``;

export default NotificationSettings;

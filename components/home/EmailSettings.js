import React, { useState } from 'react';
import { View, Switch, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch hook
import { updateUserAction } from '../../store/actions/userActions'; // Import updateUserAction

const EmailSettings = () => {
  const dispatch = useDispatch(); // Initialize dispatch hook
  const userId = useSelector((state) => state.auth.user);
  const [notificationSettings, setNotificationSettings] = useState({
    inTransit: { email: true, push: true, inApp: true },
    outForDelivery: { email: true, push: true, inApp: true },
    delivered: { email: true, push: false, inApp: true },
    failedDelivery: { email: true, push: true, inApp: true },
    exception: { email: true, push: true, inApp: true },
    returnToSender: { email: true, push: true, inApp: true },
    expired: { email: true, push: true, inApp: true },
  });

  const saveSettings = async (newSettings) => {
    try {
      // Dispatch updateUserAction with userId and newSettings
      dispatch(updateUserAction(userId, { notificationSettings: newSettings }));
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const toggleSetting = (setting, type) => {
    const updatedSettings = {
      ...notificationSettings,
      [setting]: {
        ...notificationSettings[setting],
        [type]: !notificationSettings[setting][type],
      },
    };
    setNotificationSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  return (
    <Container>
      <Title>Settings</Title>
      <ScrollViewContainer>
        {Object.keys(notificationSettings).map(setting => (
          <View key={setting}>
            <SettingTitle>{setting.charAt(0).toUpperCase() + setting.slice(1)}</SettingTitle>
            <Setting>
              <SettingText>Email</SettingText>
              <Switch
                value={notificationSettings[setting].email}
                onValueChange={() => toggleSetting(setting, 'email')}
              />
            </Setting>
            <Setting>
              <SettingText>Push</SettingText>
              <Switch
                value={notificationSettings[setting].push}
                onValueChange={() => toggleSetting(setting, 'push')}
              />
            </Setting>
            <Setting>
              <SettingText>In App</SettingText>
              <Switch
                value={notificationSettings[setting].inApp}
                onValueChange={() => toggleSetting(setting, 'inApp')}
              />
            </Setting>
          </View>
        ))}
      </ScrollViewContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

const SettingTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const Setting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SettingText = styled.Text`
  font-size: 16px;
`;

export default EmailSettings;

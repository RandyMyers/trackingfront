import React from 'react';
import { View, Button, Alert } from 'react-native';
import { usePushNotifications } from './PushNotifications';

const TestPushNotifications = () => {
  const { expoPushToken } = usePushNotifications();

  console.log('Expo Push Token:', expoPushToken);

  const parcelDetails = {
    id: '123456',
    status: 'Out for delivery',
    estimatedDelivery: '2024-06-18',
    sender: 'Amazon',
    receiver: 'John Doe',
    location: '123 Main St, Anytown, USA'
  };

  const sendTestNotification = async () => {
    if (!expoPushToken) {
      alert('Push token is not available');
      return;
    }

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: `Parcel Status: ${parcelDetails.status}`,
      body: `Your parcel from ${parcelDetails.sender} is ${parcelDetails.status}. Estimated delivery: ${parcelDetails.estimatedDelivery} at ${parcelDetails.location}.`,
      data: { parcelDetails },
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const responseData = await response.json();
      console.log('Push Notification Response:', responseData);

      if (response.status !== 200) {
        Alert.alert('Notification Error', `Failed to send notification: ${responseData.message}`);
      } else {
        Alert.alert('Notification Sent', 'Your parcel status notification has been sent successfully.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Notification Error', 'An error occurred while sending the notification.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Send Test Notification" onPress={sendTestNotification} />
    </View>
  );
};

export default TestPushNotifications;

import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:3200';

// Get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/profile/change-password`, passwordData);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Update notification preferences
export const updateNotificationPreferences = async (notificationData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/profile/update-notifications`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};
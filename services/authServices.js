import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:3200';// Replace with your server URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login a user
export const loginUser = async (userData) => {
  try {

    console.log(userData);
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Change user password
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/auth/change-password`, passwordData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/requestPasswordReset`, { email });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Verify reset code
export const verifyResetCode = async (resetCodeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/verifyResetCode`, resetCodeData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying reset code:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (resetPasswordData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/resetPassword`, resetPasswordData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Other authentication services as needed...

import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';
//const BASE_URL = 'http://192.168.0.103:3200';

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
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      //console.error('Error logging in user:', error.response.data);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      //console.error('Error logging in user:', error.request);
      throw new Error('No response received from server');
    } else {
      //console.error('Error logging in user:', error.message);
      throw new Error(error.message);
    }
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

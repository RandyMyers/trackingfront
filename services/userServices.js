import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:3200';

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/all`);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Get a specific user by ID
export const getUserById = async (userId) => {
  try {
    
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
   console.log('lets see',response.data.user)
    return response.data.user;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

// Update a user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/users/${userId}`, userData);
    return response.data.customer;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const updateAddress = async (userId, addressData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/users/update/${userId}`, addressData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment for ${userId}:`, error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

// Other user services as needed...

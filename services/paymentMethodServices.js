import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';
//const BASE_URL = 'http://192.168.0.103:3200';

// Get all payment methods
export const getAllPaymentMethods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/payment/method/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all payment methods:', error);
    throw error;
  }
};

// Add a new payment method
export const addPaymentMethod = async (paymentMethodData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payment/method/add`, paymentMethodData);
    return response.data;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

// Update a payment method
export const updatePaymentMethod = async (paymentMethodId, paymentMethodData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/payment/method/update/${paymentMethodId}`, paymentMethodData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment method ${paymentMethodId}:`, error);
    throw error;
  }
};

// Delete a payment method
export const deletePaymentMethod = async (paymentMethodId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/payment/method/delete/${paymentMethodId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment method ${paymentMethodId}:`, error);
    throw error;
  }
};

// paymentServices.js
import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:3200';

// Get all payments
export const getAllPayments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/payments/all`);
    return response.data.payments;
  } catch (error) {
    console.error('Error fetching all payments:', error);
    throw error;
  }
};


// Get payment by ID
export const getPaymentById = async (paymentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/payments/${paymentId}`);
    return response.data.payment;
  } catch (error) {
    console.error(`Error fetching payment details for ${paymentId}:`, error);
    throw error;
  }
};

// Create a new payment
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payments/create`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};


export const createPaymentIntent = async (paymentData) => {
  try {
    console.log('my intent', paymentData)
    const response = await axios.post(`${BASE_URL}/api/payments/intent`, paymentData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Create PayPal payment intent
export const createPayPalIntent = async (paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payments/paypal/create`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating PayPal payment intent:', error);
    throw error;
  }
};

// Capture PayPal payment
export const capturePayPalPayment = async (paymentId, payerId, paypalId, paymentMethodId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/payments/paypal/capture`, {
      params: {
        paymentId,
        paypalId,
        PayerID: payerId,
        paymentMethodId
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    throw error;
  }
};

// Update payment by ID
export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/payments/update/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment for ${paymentId}:`, error);
    throw error;
  }
};

// Add payment method to Stripe
export const addPaymentMethodToStripe = async ( paymentMethodData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payments/add-payment`, paymentMethodData);
    return response.data;
  } catch (error) {
    console.error('Error adding payment method to Stripe:', error);
    throw error;
  }
};

// Delete payment by ID
export const deletePayment = async (paymentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment for ${paymentId}:`, error);
    throw error;
  }
};

// Other payment services as needed...

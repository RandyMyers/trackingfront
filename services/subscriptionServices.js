
import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';  // Replace with your actual backend URL

// Get all subscriptions
export const getAllSubscriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/subscriptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all subscriptions:', error);
    throw error;
  }
};

// Get subscription by ID
export const getSubscriptionById = async (subscriptionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subscription details for ${subscriptionId}:`, error);
    throw error;
  }
};

export const createSetupIntent = async (paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/subscriptions/setup/intent`, paymentData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Create a new subscription
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/subscriptions/create`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Update subscription by ID
export const updateSubscription = async (subscriptionId, subscriptionData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/subscriptions/${subscriptionId}`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error(`Error updating subscription for ${subscriptionId}:`, error);
    throw error;
  }
};

// Delete subscription by ID
export const deleteSubscription = async (subscriptionId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting subscription for ${subscriptionId}:`, error);
    throw error;
  }
};



export const getUsedTracks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/subscriptions/used/tracks/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching used tracks for user ${userId}:`, error);
    throw error;
  }
};

// Renew a subscription
export const renewSubscription = async (subscriptionData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/subscriptions/renew`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error renewing subscription:', error);
    throw error;
  }
};

// Change subscription plan
export const changeSubscriptionPlan = async (subscriptionData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/subscriptions/change`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error changing subscription plan:', error);
    throw error;
  }
};
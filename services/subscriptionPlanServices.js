import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';  // Replace with your actual backend URL
//const BASE_URL = 'http://192.168.0.103:3200';

// Get all subscription plans
export const getAllSubscriptionPlans = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/plan/all`);
    console.log(response.data);
    return response.data.subscriptionPlans;
  } catch (error) {
    console.error('Error fetching all subscription plans:', error);
    throw error;
  }
};

// Get subscription plan by ID
export const getSubscriptionPlanById = async (planId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/plan/${planId}`);
    return response.data.subscriptionPlan;
  } catch (error) {
    console.error(`Error fetching subscription plan details for ${planId}:`, error);
    throw error;
  }
};

// Create a new subscription plan
export const createSubscriptionPlan = async (subscriptionPlanData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/plan/create`, subscriptionPlanData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
};

// Update subscription plan by ID
export const updateSubscriptionPlan = async (planId, subscriptionPlanData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/plan/update/${planId}`, subscriptionPlanData);
    return response.data;
  } catch (error) {
    console.error(`Error updating subscription plan for ${planId}:`, error);
    throw error;
  }
};

// Delete subscription plan by ID
export const deleteSubscriptionPlan = async (planId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/plan/delete/${planId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting subscription plan for ${planId}:`, error);
    throw error;
  }
};
import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';
//const BASE_URL = 'http://192.168.0.103:3200';

// Create feedback
export const createFeedback = async (feedbackData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/feedback/create`, feedbackData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  };
  
  // Get all feedback
  export const getAllFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/feedback/all`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting all feedback:', error);
      throw error;
    }
  };
  
  // Get feedback by user ID
  export const getFeedbackByUserId = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/feedback/user/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting feedback by user ID:', error);
      throw error;
    }
  };

  // Get feedback by feedback ID
export const getFeedbackById = async (feedbackId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/feedback/${feedbackId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting feedback by feedback ID:', error);
    throw error;
  }
};
  
  // Respond to feedback
  export const respondToFeedback = async (feedbackId, responseData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/feedback/respond/${feedbackId}`, { responseData });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error responding to feedback:', error);
      throw error;
    }
  };
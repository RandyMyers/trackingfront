// src/redux/actions/feedbackActions.js

import * as feedbackTypes from '../types/feedbackTypes';
import * as feedbackService from '../../services/feedbackServices';

// Create Feedback
export const createFeedbackAction = (feedbackData) => async (dispatch) => {
  try {
    dispatch({ type: feedbackTypes.CREATE_FEEDBACK_REQUEST });
    const response = await feedbackService.createFeedback(feedbackData);
    dispatch({
      type: feedbackTypes.CREATE_FEEDBACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    dispatch({
      type: feedbackTypes.CREATE_FEEDBACK_FAILURE,
      payload: error.message,
    });
  }
};

// Get All Feedback
export const getAllFeedbackAction = () => async (dispatch) => {
  try {
    dispatch({ type: feedbackTypes.GET_ALL_FEEDBACK_REQUEST });
    const response = await feedbackService.getAllFeedback();
    dispatch({
      type: feedbackTypes.GET_ALL_FEEDBACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    dispatch({
      type: feedbackTypes.GET_ALL_FEEDBACK_FAILURE,
      payload: error.message,
    });
  }
};


export const getFeedbackByIdAction = (feedbackId) => async (dispatch) => {
  try {
    dispatch({ type: feedbackTypes.GET_FEEDBACK_BY_ID_REQUEST });
    const response = await feedbackService.getFeedbackById(feedbackId); // Ensure this function is defined in the service
    dispatch({
      type: feedbackTypes.GET_FEEDBACK_BY_ID_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    dispatch({
      type: feedbackTypes.GET_FEEDBACK_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

// Get Feedback by User ID
export const getFeedbackByUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: feedbackTypes.GET_FEEDBACK_BY_USER_REQUEST });
    const response = await feedbackService.getFeedbackByUserId(userId);
    dispatch({
      type: feedbackTypes.GET_FEEDBACK_BY_USER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    dispatch({
      type: feedbackTypes.GET_FEEDBACK_BY_USER_FAILURE,
      payload: error.message,
    });
  }
};

// Respond to Feedback
export const respondToFeedbackAction = (feedbackId, responseData) => async (dispatch) => {
  try {
    dispatch({ type: feedbackTypes.RESPOND_TO_FEEDBACK_REQUEST });
    const response = await feedbackService.respondToFeedback(feedbackId, responseData);
    dispatch({
      type: feedbackTypes.RESPOND_TO_FEEDBACK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error responding to feedback:', error);
    dispatch({
      type: feedbackTypes.RESPOND_TO_FEEDBACK_FAILURE,
      payload: error.message,
    });
  }
};

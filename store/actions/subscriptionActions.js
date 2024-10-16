// subscriptionActions.js
import * as subscriptionTypes from '../types/subscriptionTypes';
import * as subscriptionServices from '../../services/subscriptionServices';

// Action creators should only return plain objects
export const setSubscriptionAction = (actionType) => {
  return {
    type: subscriptionTypes.SET_SUBSCRIPTION_ACTION,
    payload: actionType,
  };
};

// Action creators for fetching all subscriptions
export const fetchSubscriptionsAction = () => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.FETCH_SUBSCRIPTIONS_REQUEST });
    const subscriptions = await subscriptionServices.getAllSubscriptions();
    dispatch({
      type: subscriptionTypes.FETCH_SUBSCRIPTIONS_SUCCESS,
      payload: subscriptions,
    });
  } catch (error) {
    console.error('Error fetching all subscriptions:', error);
    dispatch({
      type: subscriptionTypes.FETCH_SUBSCRIPTIONS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for fetching subscription details by ID
export const fetchSubscriptionDetailsAction = (subscriptionId) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_REQUEST });
    const subscriptionDetails = await subscriptionServices.getSubscriptionById(subscriptionId);
    dispatch({
      type: subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS,
      payload: subscriptionDetails,
    });
  } catch (error) {
    console.error(`Error fetching subscription details for ${subscriptionId}:`, error);
    dispatch({
      type: subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating a new payment intent
export const createSetupIntentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.CREATE_SETUP_INTENT_REQUEST });
    const response = await subscriptionServices.createSetupIntent(paymentData);
    console.log(response);
    dispatch({
      type: subscriptionTypes.CREATE_SETUP_INTENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    dispatch({
      type: subscriptionTypes.CREATE_SETUP_INTENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating a new subscription
export const createSubscriptionAction = (subscriptionData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.CREATE_SUBSCRIPTION_REQUEST });
    const response = await subscriptionServices.createSubscription(subscriptionData);
    dispatch({
      type: subscriptionTypes.CREATE_SUBSCRIPTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    dispatch({
      type: subscriptionTypes.CREATE_SUBSCRIPTION_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for updating a subscription by ID
export const updateSubscriptionAction = (subscriptionId, subscriptionData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.UPDATE_SUBSCRIPTION_REQUEST });
    const response = await subscriptionServices.updateSubscription(subscriptionId, subscriptionData);
    dispatch({
      type: subscriptionTypes.UPDATE_SUBSCRIPTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating subscription for ${subscriptionId}:`, error);
    dispatch({
      type: subscriptionTypes.UPDATE_SUBSCRIPTION_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for deleting a subscription by ID
export const deleteSubscriptionAction = (subscriptionId) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.DELETE_SUBSCRIPTION_REQUEST });
    const response = await subscriptionServices.deleteSubscription(subscriptionId);
    dispatch({
      type: subscriptionTypes.DELETE_SUBSCRIPTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error deleting subscription for ${subscriptionId}:`, error);
    dispatch({
      type: subscriptionTypes.DELETE_SUBSCRIPTION_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for fetching used tracks and allowed tracks
export const fetchUsedTracksAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.FETCH_USED_TRACKS_REQUEST });
    const { usedTracks, allowedTracks, plan, remainingDays, activePlan, subscriptionDetails } = await subscriptionServices.getUsedTracks(userId);
    console.log('Actions',subscriptionDetails)
    dispatch({
      type: subscriptionTypes.FETCH_USED_TRACKS_SUCCESS,
      payload: { usedTracks, allowedTracks, plan, remainingDays, activePlan, subscriptionDetails },
    });
  } catch (error) {
    console.error('Error fetching used tracks:', error);
    dispatch({
      type: subscriptionTypes.FETCH_USED_TRACKS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for renewing a subscription
export const renewSubscriptionAction = (subscriptionData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.RENEW_SUBSCRIPTION_REQUEST });
    const response = await subscriptionServices.renewSubscription(subscriptionData);
    dispatch({
      type: subscriptionTypes.RENEW_SUBSCRIPTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error renewing subscription:', error);
    dispatch({
      type: subscriptionTypes.RENEW_SUBSCRIPTION_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for changing a subscription plan
export const changeSubscriptionPlanAction = (subscriptionData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_REQUEST });
    const response = await subscriptionServices.changeSubscriptionPlan(subscriptionData);
    dispatch({
      type: subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error changing subscription plan:', error);
    dispatch({
      type: subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_FAILURE,
      error: error.message,
    });
  }
};
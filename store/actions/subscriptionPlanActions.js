// subscriptionPlanActions.js
import * as subscriptionPlanTypes from '../types/subscriptionPlanTypes';
import * as subscriptionPlanService from '../../services/subscriptionPlanServices';

// Action creators for fetching all subscription plans
export const fetchSubscriptionPlansAction = () => async (dispatch) => {
  try {
    dispatch({ type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_REQUEST });

    const subscriptionPlans = await subscriptionPlanService.getAllSubscriptionPlans();

    console.log(subscriptionPlans);
    dispatch({
      type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_SUCCESS,
      payload: subscriptionPlans,
    });
  } catch (error) {
    console.error('Error fetching all subscription plans:', error);

    dispatch({
      type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for fetching subscription plan details by ID
export const fetchSubscriptionPlanDetailsAction = (planId) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_REQUEST });

    const subscriptionPlanDetails = await subscriptionPlanService.getSubscriptionPlanById(planId);

    dispatch({
      type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_SUCCESS,
      payload: subscriptionPlanDetails,
    });
  } catch (error) {
    console.error(`Error fetching subscription plan details for ${planId}:`, error);

    dispatch({
      type: subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating a new subscription plan
export const createSubscriptionPlanAction = (subscriptionPlanData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_REQUEST });

    await subscriptionPlanService.createSubscriptionPlan(subscriptionPlanData);

    dispatch({
      type: subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_SUCCESS,
    });
  } catch (error) {
    console.error('Error creating subscription plan:', error);

    dispatch({
      type: subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for updating a subscription plan by ID
export const updateSubscriptionPlanAction = (planId, subscriptionPlanData) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_REQUEST });

    await subscriptionPlanService.updateSubscriptionPlan(planId, subscriptionPlanData);

    dispatch({
      type: subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_SUCCESS,
    });
  } catch (error) {
    console.error(`Error updating subscription plan for ${planId}:`, error);

    dispatch({
      type: subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for deleting a subscription plan by ID
export const deleteSubscriptionPlanAction = (planId) => async (dispatch) => {
  try {
    dispatch({ type: subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_REQUEST });

    await subscriptionPlanService.deleteSubscriptionPlan(planId);

    dispatch({
      type: subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_SUCCESS,
    });
  } catch (error) {
    console.error(`Error deleting subscription plan for ${planId}:`, error);

    dispatch({
      type: subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_FAILURE,
      error: error.message,
    });
  }
};

export const selectPlanAction = (planId) => async (dispatch) => {
    try {
      dispatch({ type: subscriptionPlanTypes.SELECT_PLAN_REQUEST });
  
      const selectedPlan = await subscriptionPlanService.getSubscriptionPlanById(planId);
  
      dispatch({
        type: subscriptionPlanTypes.SELECT_PLAN_SUCCESS,
        payload: selectedPlan,
      });
    } catch (error) {
      console.error(`Error fetching subscription plan details for ${planId}:`, error);
  
      dispatch({
        type: subscriptionPlanTypes.SELECT_PLAN_FAILURE,
        error: error.message,
      });
    }
  };
  
  export const clearSelectedPlanAction = () => {
    return {
      type: subscriptionPlanTypes.CLEAR_SELECTED_PLAN,
    };
  };
// Other subscription plan actions as needed...

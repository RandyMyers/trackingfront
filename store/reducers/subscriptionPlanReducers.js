// subscriptionPlanReducer.js
import * as subscriptionPlanTypes from '../types/subscriptionPlanTypes';

const initialState = {
  subscriptionPlans: [],
  subscriptionPlanDetails: null,
  selectedPlan: null,
  activePlan: null,
  loading: false,
  error: null,
};

const subscriptionPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch subscription plans
    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionPlans: action.payload,
        error: null,
      };

    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLANS_FAILURE:
      return {
        ...state,
        loading: false,
        subscriptionPlans: [],
        error: action.error,
      };

    // Fetch subscription plan details
    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionPlanDetails: action.payload,
        error: null,
      };

    case subscriptionPlanTypes.FETCH_SUBSCRIPTION_PLAN_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        subscriptionPlanDetails: null,
        error: action.error,
      };

    // Create subscription plan
    case subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case subscriptionPlanTypes.CREATE_SUBSCRIPTION_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Update subscription plan
    case subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case subscriptionPlanTypes.UPDATE_SUBSCRIPTION_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Delete subscription plan
    case subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case subscriptionPlanTypes.DELETE_SUBSCRIPTION_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      // Select plan
    case subscriptionPlanTypes.SELECT_PLAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case subscriptionPlanTypes.SELECT_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          selectedPlan: action.payload,
          error: null,
        };
  
      case subscriptionPlanTypes.SELECT_PLAN_FAILURE:
        return {
          ...state,
          loading: false,
          selectedPlan: null,
          error: action.error,
        };
  
        case subscriptionPlanTypes.CLEAR_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: null,
      };

    default:
      return state;
  }
};

export default subscriptionPlanReducer;

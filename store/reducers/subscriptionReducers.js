// subscriptionReducer.js
import * as subscriptionTypes from '../types/subscriptionTypes';

const initialState = {
  subscriptions: [],
  subscriptionDetails: null,
  publishableKey: null,
  setupIntent: null,
  ephemeralKey: null,
  customerId: null,
  usedTracks: null,
  allowedTracks: null,
  remainingDays: null,
  plan: null,
  planId: null,
  loading: false,
  error: null,
  subscriptionAction: null, // Add subscription action state
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle loading states
    case subscriptionTypes.FETCH_SUBSCRIPTIONS_REQUEST:
    case subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_REQUEST:
    case subscriptionTypes.CREATE_SUBSCRIPTION_REQUEST:
    case subscriptionTypes.UPDATE_SUBSCRIPTION_REQUEST:
    case subscriptionTypes.DELETE_SUBSCRIPTION_REQUEST:
    case subscriptionTypes.FETCH_USED_TRACKS_REQUEST:
    case subscriptionTypes.RENEW_SUBSCRIPTION_REQUEST: 
    case subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle success states
    case subscriptionTypes.FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload,
        loading: false,
      };

    case subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS:
      return {
        ...state,
        subscriptionDetails: action.payload,
        loading: false,
      };

    case subscriptionTypes.CREATE_SUBSCRIPTION_SUCCESS:
    case subscriptionTypes.UPDATE_SUBSCRIPTION_SUCCESS:
    case subscriptionTypes.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    // Handle failure states
    case subscriptionTypes.FETCH_SUBSCRIPTIONS_FAILURE:
    case subscriptionTypes.FETCH_SUBSCRIPTION_DETAILS_FAILURE:
    case subscriptionTypes.CREATE_SUBSCRIPTION_FAILURE:
    case subscriptionTypes.UPDATE_SUBSCRIPTION_FAILURE:
    case subscriptionTypes.DELETE_SUBSCRIPTION_FAILURE:
    case subscriptionTypes.FETCH_USED_TRACKS_FAILURE:
    case subscriptionTypes.RENEW_SUBSCRIPTION_FAILURE: // New case
    case subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Handle setup intent creation
    case subscriptionTypes.CREATE_SETUP_INTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case subscriptionTypes.CREATE_SETUP_INTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        setupIntent: action.payload.setupIntent,
        publishableKey: action.payload.publishableKey,
        ephemeralKey: action.payload.ephemeralKey,
        customerId: action.payload.customerId,
      };

    case subscriptionTypes.CREATE_SETUP_INTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Handle fetching used tracks
    case subscriptionTypes.FETCH_USED_TRACKS_SUCCESS:
      return {
        ...state,
        usedTracks: action.payload.usedTracks,
        allowedTracks: action.payload.allowedTracks,
        plan: action.payload.plan,
        remainingDays: action.payload.remainingDays,
        planId: action.payload.activePlan,
        subscriptionDetails: action.payload.subscriptionDetails,
        loading: false,
      };

      // Handle renewal and change subscription plan success
    case subscriptionTypes.RENEW_SUBSCRIPTION_SUCCESS:
    case subscriptionTypes.CHANGE_SUBSCRIPTION_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
        };

    case subscriptionTypes.FETCH_USED_TRACKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Handle setting subscription action (upgrade or renew)
    case subscriptionTypes.SET_SUBSCRIPTION_ACTION:
      return {
        ...state,
        subscriptionAction: action.payload,
      };

    default:
      return state;
  }
};

export default subscriptionReducer;

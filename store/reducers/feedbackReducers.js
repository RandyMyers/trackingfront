import * as feedbackTypes from '../types/feedbackTypes';

const initialState = {
  feedbacks: [],
  feedback: null,  // Add this to store a single feedback item by ID
  loading: false,
  error: null,
  feedbackResponse: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case feedbackTypes.CREATE_FEEDBACK_REQUEST:
    case feedbackTypes.GET_ALL_FEEDBACK_REQUEST:
    case feedbackTypes.GET_FEEDBACK_BY_USER_REQUEST:
    case feedbackTypes.GET_FEEDBACK_BY_ID_REQUEST: // Add this
    case feedbackTypes.RESPOND_TO_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case feedbackTypes.CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload], // Corrected to use feedbacks
        loading: false,
      };

    case feedbackTypes.GET_ALL_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbacks: action.payload,
        loading: false,
      };

    case feedbackTypes.GET_FEEDBACK_BY_USER_SUCCESS:
      return {
        ...state,
        feedbacks: action.payload,
        loading: false,
      };

    case feedbackTypes.GET_FEEDBACK_BY_ID_SUCCESS: // Add this
      return {
        ...state,
        feedback: action.payload, // Store the specific feedback
        loading: false,
      };

    case feedbackTypes.RESPOND_TO_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackResponse: action.payload,
        loading: false,
      };

    case feedbackTypes.CREATE_FEEDBACK_FAILURE:
    case feedbackTypes.GET_ALL_FEEDBACK_FAILURE:
    case feedbackTypes.GET_FEEDBACK_BY_USER_FAILURE:
    case feedbackTypes.GET_FEEDBACK_BY_ID_FAILURE: // Add this
    case feedbackTypes.RESPOND_TO_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default feedbackReducer;

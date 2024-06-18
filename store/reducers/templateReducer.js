// templateReducer.js

import * as types from '../types/templateTypes'; // Import the template types

// Initial state for the email template reducer
const initialState = {
  templates: [],
  template: null,
  loading: false,
  error: null,
};

// Email template reducer function
const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    // Reducer cases for adding an email template
    case types.ADD_EMAIL_TEMPLATE_REQUEST:
    case types.GET_ALL_EMAIL_TEMPLATES_REQUEST:
    case types.GET_EMAIL_TEMPLATE_DETAILS_REQUEST:
    case types.UPDATE_EMAIL_TEMPLATE_REQUEST:
    case types.DELETE_EMAIL_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.ADD_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: [...state.templates, action.payload],
        loading: false,
      };

    case types.GET_ALL_EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false,
      };

    case types.GET_EMAIL_TEMPLATE_DETAILS_SUCCESS:
      return {
        ...state,
        template: action.payload.template,
        loading: false,
      };

    case types.UPDATE_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.map((template) =>
          template._id === action.payload._id ? action.payload : template
        ),
        loading: false,
      };

    case types.DELETE_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.filter((template) => template._id !== action.payload),
        loading: false,
      };

    // Reducer cases for handling failures
    case types.ADD_EMAIL_TEMPLATE_FAILURE:
    case types.GET_ALL_EMAIL_TEMPLATES_FAILURE:
    case types.GET_EMAIL_TEMPLATE_DETAILS_FAILURE:
    case types.UPDATE_EMAIL_TEMPLATE_FAILURE:
    case types.DELETE_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Default case
    default:
      return state;
  }
};

export default templateReducer;

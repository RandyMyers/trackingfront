import * as types from '../types/authTypes';

// Initial state for the authentication
const initialState = {
  user: null,
  email: null,
  resetCode: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  resetCodeSent: false,
  resetCodeVerified: false,
  message: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.CHANGE_PASSWORD_REQUEST:
    case types.REQUEST_PASSWORD_RESET_REQUEST:
    case types.VERIFY_RESET_CODE_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null, // Clear any previous messages on new requests
      };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
        message: action.payload.message || null,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message || null,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case types.CHANGE_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message || null,
      };

    case types.REQUEST_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        resetCodeSent: true,
        email: action.payload.email,
        message: action.payload.message || null,
      };

    case types.VERIFY_RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        resetCodeVerified: true,
        resetCode: action.payload.resetCode,
        message: action.payload.message || null,
      };

    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
    case types.CHANGE_PASSWORD_FAILURE:
    case types.REQUEST_PASSWORD_RESET_FAILURE:
    case types.VERIFY_RESET_CODE_FAILURE:
    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        
        error: action.payload.error,
        resetCodeSent: false,
        resetCodeVerified: false,
      };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        message: null,
        resetCodeSent: false,
        resetCodeVerified: false,
      };

    default:
      return state;
  }
};

export default authReducers;

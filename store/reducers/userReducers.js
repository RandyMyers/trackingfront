import * as types from '../types/userTypes';

// Initial state for user data
const initialState = {
  users: [],
  language: 'en',
  selectedUser: null,
  user: null,
  loading: false,
  error: null,
  isActivated: true, // New variable to track activation status
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_REQUEST:
    case types.GET_USER_REQUEST:
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
    case types.UPDATE_ADDRESS_REQUEST:
    case types.DEACTIVATE_USER_REQUEST:
    case types.REACTIVATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        isActive: action.payload.isActive,
        loading: false,
        error: null,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
        error: null,
      };

    case types.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case types.DEACTIVATE_USER_SUCCESS:
      return {
        ...state,
        isActivated: action.payload.isActive, // Set to false when a user is deactivated
        loading: false,
        error: null,
      };

    case types.REACTIVATE_USER_SUCCESS:
      return {
        ...state,
        isActivated: action.payload.isActive, // Set to true when a user is reactivated
        loading: false,
        error: null,
      };

    case types.GET_ALL_USERS_FAILURE:
    case types.GET_USER_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
    case types.UPDATE_ADDRESS_FAILURE:
    case types.DEACTIVATE_USER_FAILURE:
    case types.REACTIVATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: null,
      };

    case types.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};

export default userReducers;

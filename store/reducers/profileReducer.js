// profileReducer.js
import * as types from '../types/profileTypes';

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_REQUEST:
    case types.UPDATE_PROFILE_REQUEST:
    case types.CHANGE_PASSWORD_REQUEST:
    case types.UPDATE_NOTIFICATION_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload, error: null };

    case types.UPDATE_PROFILE_SUCCESS:
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.UPDATE_NOTIFICATION_SUCCESS:
      return { ...state, loading: false, error: null };

    case types.FETCH_PROFILE_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
    case types.CHANGE_PASSWORD_FAILURE:
    case types.UPDATE_NOTIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default profileReducer;

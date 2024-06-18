import * as profileTypes from '../types/profileTypes';
import * as profileService from '../../services/profileService';

// Action creators should only return plain objects

// Action creators for fetching user profile
export const fetchProfileAction = () => async (dispatch) => {
  try {
    // Dispatch the fetch profile request
    dispatch({ type: profileTypes.FETCH_PROFILE_REQUEST });

    const profile = await profileService.getProfile();
    dispatch({
      type: profileTypes.FETCH_PROFILE_SUCCESS,
      payload: profile,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    dispatch({
      type: profileTypes.FETCH_PROFILE_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for updating user profile
export const updateProfileAction = (profileData) => async (dispatch) => {
  try {
    // Dispatch the update profile request
    dispatch({ type: profileTypes.UPDATE_PROFILE_REQUEST });

    await profileService.updateProfile(profileData);
    dispatch({
      type: profileTypes.UPDATE_PROFILE_SUCCESS,
    });

    // You can dispatch fetchProfileAction here to update the profile state after a successful update
    dispatch(fetchProfileAction());
  } catch (error) {
    console.error('Error updating user profile:', error);
    dispatch({
      type: profileTypes.UPDATE_PROFILE_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for changing password
export const changePasswordAction = (passwordData) => async (dispatch) => {
  try {
    // Dispatch the change password request
    dispatch({ type: profileTypes.CHANGE_PASSWORD_REQUEST });

    await profileService.changePassword(passwordData);
    dispatch({
      type: profileTypes.CHANGE_PASSWORD_SUCCESS,
    });
  } catch (error) {
    console.error('Error changing password:', error);
    dispatch({
      type: profileTypes.CHANGE_PASSWORD_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for updating notification preferences
export const updateNotificationPreferencesAction = (notificationData) => async (dispatch) => {
  try {
    // Dispatch the update notification preferences request
    dispatch({ type: profileTypes.UPDATE_NOTIFICATION_REQUEST });

    await profileService.updateNotificationPreferences(notificationData);
    dispatch({
      type: profileTypes.UPDATE_NOTIFICATION_SUCCESS,
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    dispatch({
      type: profileTypes.UPDATE_NOTIFICATION_FAILURE,
      error: error.message,
    });
  }
};

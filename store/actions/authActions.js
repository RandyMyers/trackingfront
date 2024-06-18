import * as types from '../types/authTypes';
import * as authService from '../../services/authServices';

// Register user action
export const registerUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });
    const response = await authService.registerUser(userData);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: {
        user: response.user,
        token: response.token,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    dispatch({
      type: types.REGISTER_FAILURE,
      error: error.message,
    });
  }
};

// Login user action
export const loginUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await authService.loginUser(userData);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: { user: response.userId, token: response.token },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    dispatch({
      type: types.LOGIN_FAILURE,
      error: error.message,
    });
  }
};

// Change password action
export const changePasswordAction = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
    const response = await authService.changePassword(passwordData);
    dispatch({
      type: types.CHANGE_PASSWORD_SUCCESS,
    });
  } catch (error) {
    console.error('Error changing password:', error);
    dispatch({
      type: types.CHANGE_PASSWORD_FAILURE,
      error: error.message,
    });
  }
};

// Request password reset action
export const requestPasswordResetAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.REQUEST_PASSWORD_RESET_REQUEST });
    const response = await authService.requestPasswordReset(email);
    dispatch({
      type: types.REQUEST_PASSWORD_RESET_SUCCESS,
      payload: { email: response.email }, 
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    dispatch({
      type: types.REQUEST_PASSWORD_RESET_FAILURE,
      error: error.message,
    });
  }
};

// Verify reset code action
export const verifyResetCodeAction = (resetCodeData) => async (dispatch) => {
  try {
    dispatch({ type: types.VERIFY_RESET_CODE_REQUEST });
    const response = await authService.verifyResetCode(resetCodeData);
    dispatch({
      type: types.VERIFY_RESET_CODE_SUCCESS,
      payload: { resetCode: response.resetCode }, 
    });
  } catch (error) {
    console.error('Error verifying reset code:', error);
    dispatch({
      type: types.VERIFY_RESET_CODE_FAILURE,
      error: error.message,
    });
  }
};

// Reset password action
export const resetPasswordAction = (resetPasswordData) => async (dispatch) => {
  try {
    dispatch({ type: types.RESET_PASSWORD_REQUEST });
    await authService.resetPassword(resetPasswordData);
    dispatch({
      type: types.RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    dispatch({
      type: types.RESET_PASSWORD_FAILURE,
      error: error.message,
    });
  }
};

// Logout user action
export const logoutUserAction = () => {
  return {
    type: types.LOGOUT,
  };
};

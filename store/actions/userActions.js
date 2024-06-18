// userActions.js

import * as types from '../types/userTypes';
import * as userService from '../../services/userServices';

// Action creators should only return plain objects

export const getAllUsersAction = () => async (dispatch) => {
  try {
    // Dispatch the get all users request
    dispatch({ type: types.GET_ALL_USERS_REQUEST });

    const users = await userService.getAllUsers();
    return {
      type: types.GET_ALL_USERS_SUCCESS,
      payload: users,
    };
  } catch (error) {
    console.error('Error fetching all users:', error);
    return {
      type: types.GET_ALL_USERS_FAILURE,
      error: error.message,
    };
  }
};

export const getUserByIdAction = (userId) => async (dispatch) => {
  try {
    // Dispatch the get user by ID request
    dispatch({ type: types.GET_USER_REQUEST });

    const user = await userService.getUserById(userId);
    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    dispatch({
      type: types.GET_USER_FAILURE,
      error: error.message,
    });
  }
};


export const updateUserAction = (userId, userData) => async (dispatch) => {
  try {
    // Dispatch the update user request
    dispatch({ type: types.UPDATE_USER_REQUEST });

    const response = await userService.updateUser(userId, userData);
    return {
      type: types.UPDATE_USER_SUCCESS,
      payload: response,
    };
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    return {
      type: types.UPDATE_USER_FAILURE,
      error: error.message,
    };
  }
};

// Action creators for updating a payment by ID
export const updateAddressAction = (userId, addressData) => async (dispatch) => {
  try {
    // Dispatch the update payment request
    dispatch({ type: types.UPDATE_ADDRESS_REQUEST });

    const response = await userService.updateAddress(userId, addressData);
    dispatch({
      type: types.UPDATE_ADDRESS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating payment for ${userId}:`, error);
    dispatch({
      type: types.UPDATE_ADDRESS_FAILURE,
      error: error.message,
    });
  }
};

export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    // Dispatch the delete user request
    dispatch({ type: types.DELETE_USER_REQUEST });

    const response = await userService.deleteUser(userId);
    return {
      type: types.DELETE_USER_SUCCESS,
      payload: response,
    };
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    return {
      type: types.DELETE_USER_FAILURE,
      error: error.message,
    };
  }
};

export const clearSelectedUserAction = () => {
  return {
    type: types.CLEAR_SELECTED_USER,
  };
};
// Other user actions as needed...

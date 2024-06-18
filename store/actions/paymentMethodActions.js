// actions/paymentMethodActions.js

import * as types from '../types/paymentMethodTypes';
import * as paymentMethodService from '../../services/paymentMethodServices';

// Get all payment methods action
export const getAllPaymentMethodsAction = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PAYMENT_METHODS_REQUEST });
    const response = await paymentMethodService.getAllPaymentMethods();
    dispatch({
      type: types.GET_PAYMENT_METHODS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching all payment methods:', error);
    dispatch({
      type: types.GET_PAYMENT_METHODS_FAILURE,
      error: error.message,
    });
  }
};

// Add a new payment method action
export const addPaymentMethodAction = (paymentMethodData) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_PAYMENT_METHOD_REQUEST });
    const response = await paymentMethodService.addPaymentMethod(paymentMethodData);
    dispatch({
      type: types.ADD_PAYMENT_METHOD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error adding payment method:', error);
    dispatch({
      type: types.ADD_PAYMENT_METHOD_FAILURE,
      error: error.message,
    });
  }
};

// Update a payment method action
export const updatePaymentMethodAction = (paymentMethodId, paymentMethodData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_PAYMENT_METHOD_REQUEST });
    const response = await paymentMethodService.updatePaymentMethod(paymentMethodId, paymentMethodData);
    dispatch({
      type: types.UPDATE_PAYMENT_METHOD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating payment method ${paymentMethodId}:`, error);
    dispatch({
      type: types.UPDATE_PAYMENT_METHOD_FAILURE,
      error: error.message,
    });
  }
};

// Delete a payment method action
export const deletePaymentMethodAction = (paymentMethodId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_PAYMENT_METHOD_REQUEST });
    await paymentMethodService.deletePaymentMethod(paymentMethodId);
    dispatch({
      type: types.DELETE_PAYMENT_METHOD_SUCCESS,
      payload: paymentMethodId,
    });
  } catch (error) {
    console.error(`Error deleting payment method ${paymentMethodId}:`, error);
    dispatch({
      type: types.DELETE_PAYMENT_METHOD_FAILURE,
      error: error.message,
    });
  }
};

// New action to select a payment method
export const selectPaymentMethodAction = (paymentMethod) => (dispatch) => {
  dispatch({ type: types.SELECT_PAYMENT_METHOD, payload: paymentMethod });
};

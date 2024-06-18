// paymentActions.js

import * as paymentTypes from '../types/paymentTypes';
import * as paymentService from '../../services/paymentServices';

// Action creators for fetching all payments
export const fetchPaymentsAction = () => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.FETCH_PAYMENTS_REQUEST });
    const payments = await paymentService.getAllPayments();
    dispatch({
      type: paymentTypes.FETCH_PAYMENTS_SUCCESS,
      payload: payments,
    });
  } catch (error) {
    console.error('Error fetching all payments:', error);
    dispatch({
      type: paymentTypes.FETCH_PAYMENTS_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for fetching a payment by ID
export const fetchPaymentAction = (paymentId) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.FETCH_PAYMENT_REQUEST });
    const payment = await paymentService.getPaymentById(paymentId);
    dispatch({
      type: paymentTypes.FETCH_PAYMENT_SUCCESS,
      payload: payment,
    });
  } catch (error) {
    console.error(`Error fetching payment details for ${paymentId}:`, error);
    dispatch({
      type: paymentTypes.FETCH_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating a new payment intent
export const createPaymentIntentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.CREATE_PAYMENT_INTENT_REQUEST });
    const response = await paymentService.createPaymentIntent(paymentData);
    dispatch({
      type: paymentTypes.CREATE_PAYMENT_INTENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    dispatch({
      type: paymentTypes.CREATE_PAYMENT_INTENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for adding a payment method to Stripe
export const addPaymentMethodAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.ADD_PAYMENT_METHOD_REQUEST });
    const response = await paymentService.addPaymentMethodToStripe(paymentData);
    dispatch({
      type: paymentTypes.ADD_PAYMENT_METHOD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error adding payment method to Stripe:', error);
    dispatch({
      type: paymentTypes.ADD_PAYMENT_METHOD_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating a new payment
export const createPaymentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.CREATE_PAYMENT_REQUEST });
    const response = await paymentService.createPayment(paymentData);
    dispatch({
      type: paymentTypes.CREATE_PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    dispatch({
      type: paymentTypes.CREATE_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for confirming a payment
export const confirmPaymentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.CONFIRM_PAYMENT_REQUEST });
    const response = await paymentService.confirmPayment(paymentData);
    dispatch({
      type: paymentTypes.CONFIRM_PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    dispatch({
      type: paymentTypes.CONFIRM_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for updating a payment by ID
export const updatePaymentAction = (paymentId, paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.UPDATE_PAYMENT_REQUEST });
    const response = await paymentService.updatePayment(paymentId, paymentData);
    dispatch({
      type: paymentTypes.UPDATE_PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating payment for ${paymentId}:`, error);
    dispatch({
      type: paymentTypes.UPDATE_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for deleting a payment by ID
export const deletePaymentAction = (paymentId) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.DELETE_PAYMENT_REQUEST });
    const response = await paymentService.deletePayment(paymentId);
    dispatch({
      type: paymentTypes.DELETE_PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error deleting payment for ${paymentId}:`, error);
    dispatch({
      type: paymentTypes.DELETE_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creators for creating PayPal payment intent
export const createPayPalIntentAction = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.CREATE_PAYPAL_INTENT_REQUEST });
    const response = await paymentService.createPayPalIntent(paymentData);
    dispatch({
      type: paymentTypes.CREATE_PAYPAL_INTENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating PayPal payment intent:', error);
    dispatch({
      type: paymentTypes.CREATE_PAYPAL_INTENT_FAILURE,
      error: error.message,
    });
  }
};

export const capturePayPalPaymentAction = (paymentId, payerId, paypalId, paymentMethodId) => async (dispatch) => {
  try {
    dispatch({ type: paymentTypes.CAPTURE_PAYPAL_PAYMENT_REQUEST });
    const response = await paymentService.capturePayPalPayment(paymentId, payerId, paypalId, paymentMethodId);
    dispatch({
      type: paymentTypes.CAPTURE_PAYPAL_PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    dispatch({
      type: paymentTypes.CAPTURE_PAYPAL_PAYMENT_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for selecting a payment gateway
export const selectPaymentGatewayAction = (gateway) => (dispatch) => {
  dispatch({
    type: paymentTypes.SELECT_PAYMENT_GATEWAY,
    payload: gateway,
  });
};

// paymentReducer.js

import * as paymentTypes from '../types/paymentTypes';

const initialState = {
  payments: [],
  payment: null,
  customer: null,
  paymentId: null,
  paypalId: null,
  clientSecret: null,
  ephemeralKey: null,
  publishableKey: null,
  customerId: null,
  confirmPayment: null,
  approvalUrl: null,
  paymentGateway: null,
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all payments
    case paymentTypes.FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload,
      };
    case paymentTypes.FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Fetch a payment by ID
    case paymentTypes.FETCH_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
      };
    case paymentTypes.FETCH_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Create a new payment
    case paymentTypes.CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: [...state.payments, action.payload],
      };
    case paymentTypes.CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Create a payment intent
    case paymentTypes.CREATE_PAYMENT_INTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.CREATE_PAYMENT_INTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clientSecret: action.payload.clientSecret,
        ephemeralKey: action.payload.ephemeralKey,
        publishableKey: action.payload.publishableKey,
        customerId: action.payload.customer,
        paymentId: action.payload.paymentId,
        
      };
    case paymentTypes.CREATE_PAYMENT_INTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Confirm payment
    case paymentTypes.CONFIRM_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmPayment: action.payload,
      };
    case paymentTypes.CONFIRM_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Update a payment by ID
    case paymentTypes.UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.UPDATE_PAYMENT_SUCCESS:
      const updatedPayments = state.payments.map((payment) =>
        payment._id === action.payload._id ? action.payload : payment
      );
      return {
        ...state,
        loading: false,
        payments: updatedPayments,
      };
    case paymentTypes.UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Delete a payment by ID
    case paymentTypes.DELETE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.DELETE_PAYMENT_SUCCESS:
      const filteredPayments = state.payments.filter(
        (payment) => payment._id !== action.payload._id
      );
      return {
        ...state,
        loading: false,
        payments: filteredPayments,
      };
    case paymentTypes.DELETE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Add payment method to Stripe
    case paymentTypes.ADD_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.ADD_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload.customer,
      };
    case paymentTypes.ADD_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Create PayPal payment intent
    case paymentTypes.CREATE_PAYPAL_INTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.CREATE_PAYPAL_INTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        approvalUrl: action.payload.approvalUrl,
        paypalId: action.payload.paypalId,
        paymentId: action.payload.paymentId
       
      };
    case paymentTypes.CREATE_PAYPAL_INTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

      // Select payment gateway
    case paymentTypes.SELECT_PAYMENT_GATEWAY:
      return {
        ...state,
        paymentGateway: action.payload,
      };

    // Capture PayPal payment
    case paymentTypes.CAPTURE_PAYPAL_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case paymentTypes.CAPTURE_PAYPAL_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
      };
    case paymentTypes.CAPTURE_PAYPAL_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Other payment-related cases as needed...
    default:
      return state;
  }
};

export default paymentReducer;

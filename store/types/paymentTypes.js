// paymentActionTypes.js

// Action types for fetching all payments
export const FETCH_PAYMENTS_REQUEST = 'FETCH_PAYMENTS_REQUEST';
export const FETCH_PAYMENTS_SUCCESS = 'FETCH_PAYMENTS_SUCCESS';
export const FETCH_PAYMENTS_FAILURE = 'FETCH_PAYMENTS_FAILURE';

// Action types for fetching a payment by ID
export const FETCH_PAYMENT_REQUEST = 'FETCH_PAYMENT_REQUEST';
export const FETCH_PAYMENT_SUCCESS = 'FETCH_PAYMENT_SUCCESS';
export const FETCH_PAYMENT_FAILURE = 'FETCH_PAYMENT_FAILURE';

// Action types for creating a new payment
export const CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';

// Action types for updating a payment by ID
export const UPDATE_PAYMENT_REQUEST = 'UPDATE_PAYMENT_REQUEST';
export const UPDATE_PAYMENT_SUCCESS = 'UPDATE_PAYMENT_SUCCESS';
export const UPDATE_PAYMENT_FAILURE = 'UPDATE_PAYMENT_FAILURE';

// Action types for deleting a payment by ID
export const DELETE_PAYMENT_REQUEST = 'DELETE_PAYMENT_REQUEST';
export const DELETE_PAYMENT_SUCCESS = 'DELETE_PAYMENT_SUCCESS';
export const DELETE_PAYMENT_FAILURE = 'DELETE_PAYMENT_FAILURE';

// Action types for creating a payment intent
export const CREATE_PAYMENT_INTENT_REQUEST = 'CREATE_PAYMENT_INTENT_REQUEST';
export const CREATE_PAYMENT_INTENT_SUCCESS = 'CREATE_PAYMENT_INTENT_SUCCESS';
export const CREATE_PAYMENT_INTENT_FAILURE = 'CREATE_PAYMENT_INTENT_FAILURE';

// Action types for confirming a payment
export const CONFIRM_PAYMENT_REQUEST = 'CONFIRM_PAYMENT_REQUEST';
export const CONFIRM_PAYMENT_SUCCESS = 'CONFIRM_PAYMENT_SUCCESS';
export const CONFIRM_PAYMENT_FAILURE = 'CONFIRM_PAYMENT_FAILURE';

// Action types for adding payment method to Stripe
export const ADD_PAYMENT_METHOD_REQUEST = 'ADD_PAYMENT_METHOD_REQUEST';
export const ADD_PAYMENT_METHOD_SUCCESS = 'ADD_PAYMENT_METHOD_SUCCESS';
export const ADD_PAYMENT_METHOD_FAILURE = 'ADD_PAYMENT_METHOD_FAILURE';

// Action types for creating PayPal payment intent
export const CREATE_PAYPAL_INTENT_REQUEST = 'CREATE_PAYPAL_INTENT_REQUEST';
export const CREATE_PAYPAL_INTENT_SUCCESS = 'CREATE_PAYPAL_INTENT_SUCCESS';
export const CREATE_PAYPAL_INTENT_FAILURE = 'CREATE_PAYPAL_INTENT_FAILURE';

// Action types for capturing PayPal payment
export const CAPTURE_PAYPAL_PAYMENT_REQUEST = 'CAPTURE_PAYPAL_PAYMENT_REQUEST';
export const CAPTURE_PAYPAL_PAYMENT_SUCCESS = 'CAPTURE_PAYPAL_PAYMENT_SUCCESS';
export const CAPTURE_PAYPAL_PAYMENT_FAILURE = 'CAPTURE_PAYPAL_PAYMENT_FAILURE';

// Action types for selecting a payment gateway
export const SELECT_PAYMENT_GATEWAY = 'SELECT_PAYMENT_GATEWAY';

// Action types for fetching payments by user ID
export const FETCH_PAYMENTS_BY_USER_REQUEST = 'FETCH_PAYMENTS_BY_USER_REQUEST';
export const FETCH_PAYMENTS_BY_USER_SUCCESS = 'FETCH_PAYMENTS_BY_USER_SUCCESS';
export const FETCH_PAYMENTS_BY_USER_FAILURE = 'FETCH_PAYMENTS_BY_USER_FAILURE';

// Other payment-related action types as needed...

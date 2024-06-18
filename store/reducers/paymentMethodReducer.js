// reducers/paymentMethodReducer.js

import {
    GET_PAYMENT_METHODS_REQUEST,
    GET_PAYMENT_METHODS_SUCCESS,
    GET_PAYMENT_METHODS_FAILURE,
    ADD_PAYMENT_METHOD_REQUEST,
    ADD_PAYMENT_METHOD_SUCCESS,
    ADD_PAYMENT_METHOD_FAILURE,
    UPDATE_PAYMENT_METHOD_REQUEST,
    UPDATE_PAYMENT_METHOD_SUCCESS,
    UPDATE_PAYMENT_METHOD_FAILURE,
    DELETE_PAYMENT_METHOD_REQUEST,
    DELETE_PAYMENT_METHOD_SUCCESS,
    DELETE_PAYMENT_METHOD_FAILURE,
    SELECT_PAYMENT_METHOD
  } from '../types/paymentMethodTypes';
  
  const initialState = {
    paymentMethods: [],
    selectedPaymentMethod: null,
    loading: false,
    error: null,
  };
  
  const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PAYMENT_METHODS_REQUEST:
      case ADD_PAYMENT_METHOD_REQUEST:
      case UPDATE_PAYMENT_METHOD_REQUEST:
      case DELETE_PAYMENT_METHOD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_PAYMENT_METHODS_SUCCESS:
        return {
          ...state,
          loading: false,
          paymentMethods: action.payload,
        };
  
      case ADD_PAYMENT_METHOD_SUCCESS:
        return {
          ...state,
          loading: false,
          paymentMethods: [...state.paymentMethods, action.payload],
        };
  
      case UPDATE_PAYMENT_METHOD_SUCCESS:
        return {
          ...state,
          loading: false,
          paymentMethods: state.paymentMethods.map((method) =>
            method._id === action.payload._id ? action.payload : method
          ),
        };
  
      case DELETE_PAYMENT_METHOD_SUCCESS:
        return {
          ...state,
          loading: false,
          paymentMethods: state.paymentMethods.filter(
            (method) => method._id !== action.payload
          ),
        };
  
      case GET_PAYMENT_METHODS_FAILURE:
      case ADD_PAYMENT_METHOD_FAILURE:
      case UPDATE_PAYMENT_METHOD_FAILURE:
      case DELETE_PAYMENT_METHOD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case SELECT_PAYMENT_METHOD:
          return {
            ...state,
            selectedPaymentMethod: action.payload, // Update selectedPaymentMethod
          };
  
      default:
        return state;
    }
  };
  
  export default paymentMethodReducer;
  
// src/redux/categoryReducer.js
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
  } from '../types/categoryTypes';
  
  const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORIES_REQUEST:
      case GET_CATEGORY_REQUEST:
      case CREATE_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return { ...state, loading: true };
  
      case GET_CATEGORIES_SUCCESS:
        return { 
            ...state, 
            categories: action.payload, 
            loading: false, 
            error: null };
  
      case GET_CATEGORY_SUCCESS:
        return { ...state, category: action.payload, loading: false, error: null };
  
      case CREATE_CATEGORY_SUCCESS:
        return { 
          ...state, 
          categories: [...state.categories, action.payload], 
          loading: false, 
          error: null 
        };
  
      case UPDATE_CATEGORY_SUCCESS:
        return { 
          ...state, 
          categories: state.categories.map((category) =>
            category._id === action.payload._id ? action.payload : category
          ),
          loading: false, 
          error: null 
        };
  
      case DELETE_CATEGORY_SUCCESS:
        return { 
          ...state, 
          categories: state.categories.filter((category) => category._id !== action.payload),
          loading: false, 
          error: null 
        };
  
      case GET_CATEGORIES_FAILURE:
      case GET_CATEGORY_FAILURE:
      case CREATE_CATEGORY_FAILURE:
      case UPDATE_CATEGORY_FAILURE:
      case DELETE_CATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  
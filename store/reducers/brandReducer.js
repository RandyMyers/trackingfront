import * as types from '../types/brandTypes'; // Adjust the import path as needed

// Initial state for brand management
const initialState = {
  brand: null,
  brands: [],
  loading: false,
  error: null,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BRAND_REQUEST:
    case types.GET_BRAND_REQUEST:
    case types.GET_ALL_BRANDS_REQUEST:
    case types.UPDATE_BRAND_REQUEST:
    case types.DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.CREATE_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loading: false,
        error: null,
      };

    case types.UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        brands: state.brands.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
        loading: false,
        error: null,
      };

    case types.DELETE_BRAND_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((b) => b._id !== action.payload),
        loading: false,
        error: null,
      };

    case types.CREATE_BRAND_FAILURE:
    case types.GET_BRAND_FAILURE:
    case types.GET_ALL_BRANDS_FAILURE:
    case types.UPDATE_BRAND_FAILURE:
    case types.DELETE_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default brandReducer;

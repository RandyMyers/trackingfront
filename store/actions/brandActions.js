import * as types from '../types/brandTypes';
import * as brandService from '../../services/brandServices';

// Create brand action
export const createBrandAction = (brandData) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BRAND_REQUEST });
    const response = await brandService.createBrand(brandData);
    dispatch({
      type: types.CREATE_BRAND_SUCCESS,
      payload: response, // Assuming the response contains the brand object
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    dispatch({
      type: types.CREATE_BRAND_FAILURE,
      error: error.message,
    });
  }
};

// Get brand by ID action
export const getBrandByIdAction = (brandId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_BRAND_REQUEST });
    const response = await brandService.getBrandById(brandId);
    dispatch({
      type: types.GET_BRAND_SUCCESS,
      payload: response, // Assuming the response contains the brand object
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    dispatch({
      type: types.GET_BRAND_FAILURE,
      error: error.message,
    });
  }
};

// Get all brands action
export const getAllBrandsAction = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_BRANDS_REQUEST });
    const response = await brandService.getAllBrands();
    dispatch({
      type: types.GET_ALL_BRANDS_SUCCESS,
      payload: response, // Assuming the response contains an array of brands
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    dispatch({
      type: types.GET_ALL_BRANDS_FAILURE,
      error: error.message,
    });
  }
};

// Update brand action
export const updateBrandAction = (brandId, brandData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_BRAND_REQUEST });
    const response = await brandService.updateBrand(brandId, brandData);
    dispatch({
      type: types.UPDATE_BRAND_SUCCESS,
      payload: response, // Assuming the response contains the updated brand object
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    dispatch({
      type: types.UPDATE_BRAND_FAILURE,
      error: error.message,
    });
  }
};

// Delete brand action
export const deleteBrandAction = (brandId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BRAND_REQUEST });
    const response = await brandService.deleteBrand(brandId);
    dispatch({
      type: types.DELETE_BRAND_SUCCESS,
      payload: brandId, // Sending brandId in payload to update the state
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    dispatch({
      type: types.DELETE_BRAND_FAILURE,
      error: error.message,
    });
  }
};

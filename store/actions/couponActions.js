import * as types from '../types/couponTypes';
import * as couponService from '../../services/couponServices';

// Get all coupons action
export const getAllCouponsAction = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COUPONS_REQUEST });
    const response = await couponService.getAllCoupons();
    dispatch({
      type: types.GET_COUPONS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    dispatch({
      type: types.GET_COUPONS_FAILURE,
      error: error.message,
    });
  }
};

// Get a specific coupon by ID action
export const getCouponByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COUPON_REQUEST });
    const response = await couponService.getCouponById(id);
    dispatch({
      type: types.GET_COUPON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(`Error fetching coupon with ID ${id}:`, error);
    dispatch({
      type: types.GET_COUPON_FAILURE,
      error: error.message,
    });
  }
};

// Create a new coupon action
export const createCouponAction = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_COUPON_REQUEST });
    const response = await couponService.createCoupon(couponData);
    dispatch({
      type: types.CREATE_COUPON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating coupon:', error);
    dispatch({
      type: types.CREATE_COUPON_FAILURE,
      error: error.message,
    });
  }
};

// Update a coupon by ID action
export const updateCouponAction = (id, couponData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_COUPON_REQUEST });
    const response = await couponService.updateCoupon(id, couponData);
    dispatch({
      type: types.UPDATE_COUPON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(`Error updating coupon with ID ${id}:`, error);
    dispatch({
      type: types.UPDATE_COUPON_FAILURE,
      error: error.message,
    });
  }
};

// Delete a coupon by ID action
export const deleteCouponAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COUPON_REQUEST });
    await couponService.deleteCoupon(id);
    dispatch({
      type: types.DELETE_COUPON_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error(`Error deleting coupon with ID ${id}:`, error);
    dispatch({
      type: types.DELETE_COUPON_FAILURE,
      error: error.message,
    });
  }
};

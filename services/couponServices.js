import axios from 'axios';


const BASE_URL = 'https://track-mk6l.onrender.com';

// Get all coupons
export const getAllCoupons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/coupons/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    throw error;
  }
};

// Get a specific coupon by ID
export const getCouponById = async (couponId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/coupons${couponId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coupon ${couponId}:`, error);
    throw error;
  }
};

// Create a new coupon
export const createCoupon = async (couponData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/coupons/create`, couponData);
    return response.data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

// Update a coupon by ID
export const updateCoupon = async (couponId, couponData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/coupons/${couponId}`, couponData);
    return response.data;
  } catch (error) {
    console.error(`Error updating coupon ${couponId}:`, error);
    throw error;
  }
};

// Delete a coupon by ID
export const deleteCoupon = async (couponId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/coupons/${couponId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting coupon ${couponId}:`, error);
    throw error;
  }
};

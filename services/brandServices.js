import axios from 'axios';

//const BASE_URL = 'http://192.168.0.103:3200';
const BASE_URL = 'https://track-mk6l.onrender.com';

// Create a new brand
export const createBrand = async (brandData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/brands/create`, brandData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
};

// Get a brand by ID
export const getBrandById = async (brandId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/brands/${brandId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
};

// Get all brands
export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/brands/get/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Update a brand by ID
export const updateBrand = async (brandId, brandData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/brands/update/${brandId}`, brandData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

// Delete a brand by ID
export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/brands/delete/${brandId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};

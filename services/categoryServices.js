import axios from 'axios';

//const BASE_URL = 'http://192.168.0.103:3200';
const BASE_URL = 'https://track-mk6l.onrender.com';

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

// Get a specific category by ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/categories/create`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update a category by ID
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category ${categoryId}:`, error);
    throw error;
  }
};

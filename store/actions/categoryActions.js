import * as types from '../types/categoryTypes';
import * as categoryService from '../../services/categoryServices';

// Get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CATEGORIES_REQUEST });
    const response = await categoryService.getAllCategories();
    console.log(response);
    dispatch({
      type: types.GET_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error fetching all categories:', error);
    dispatch({
      type: types.GET_CATEGORIES_FAILURE,
      error: error.message,
    });
  }
};

// Get a specific category by ID action
export const getCategoryByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CATEGORY_REQUEST });
    const response = await categoryService.getCategoryById(id);
    dispatch({
      type: types.GET_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    dispatch({
      type: types.GET_CATEGORY_FAILURE,
      error: error.message,
    });
  }
};

// Create a new category action
export const createCategoryAction = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CATEGORY_REQUEST });
    const response = await categoryService.createCategory(categoryData);
    dispatch({
      type: types.CREATE_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    dispatch({
      type: types.CREATE_CATEGORY_FAILURE,
      error: error.message,
    });
  }
};

// Update a category by ID action
export const updateCategoryAction = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CATEGORY_REQUEST });
    const response = await categoryService.updateCategory(id, categoryData);
    dispatch({
      type: types.UPDATE_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    dispatch({
      type: types.UPDATE_CATEGORY_FAILURE,
      error: error.message,
    });
  }
};

// Delete a category by ID action
export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CATEGORY_REQUEST });
    await categoryService.deleteCategory(id);
    dispatch({
      type: types.DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    dispatch({
      type: types.DELETE_CATEGORY_FAILURE,
      error: error.message,
    });
  }
};

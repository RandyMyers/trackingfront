// templateActions.js

import * as types from '../types/templateTypes'; // Import the template types
import * as templateServices from '../../services/templateServices'; // Import the template services

// Action creators should only return plain objects

// Action to create a new email template
export const createEmailTemplateAction = (templateData) => async (dispatch) => {
  try {
    // Dispatch the create email template request
    dispatch({ type: types.ADD_EMAIL_TEMPLATE_REQUEST });

    const response = await templateServices.addEmailTemplate(templateData);
    dispatch({
      type: types.ADD_EMAIL_TEMPLATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error creating email template:', error);
    dispatch({
      type: types.ADD_EMAIL_TEMPLATE_FAILURE,
      error: error.message,
    });
  }
};

// Action to get all email templates
export const getAllEmailTemplatesAction = () => async (dispatch) => {
  try {
    // Dispatch the get all email templates request
    dispatch({ type: types.GET_ALL_EMAIL_TEMPLATES_REQUEST });

    const templates = await templateServices.getAllEmailTemplates();
    dispatch({
      type: types.GET_ALL_EMAIL_TEMPLATES_SUCCESS,
      payload: templates,
    });
  } catch (error) {
    console.error('Error fetching all email templates:', error);
    dispatch({
      type: types.GET_ALL_EMAIL_TEMPLATES_FAILURE,
      error: error.message,
    });
  }
};

// Action to get a specific email template by ID
export const getEmailTemplateByIdAction = (templateId) => async (dispatch) => {
  try {
    // Dispatch the get email template by ID request
    dispatch({ type: types.GET_EMAIL_TEMPLATE_DETAILS_REQUEST });

    const templateDetails = await templateServices.getEmailTemplateDetails(templateId);
    dispatch({
      type: types.GET_EMAIL_TEMPLATE_DETAILS_SUCCESS,
      payload: templateDetails,
    });
  } catch (error) {
    console.error(`Error fetching email template details for ${templateId}:`, error);
    dispatch({
      type: types.GET_EMAIL_TEMPLATE_DETAILS_FAILURE,
      error: error.message,
    });
  }
};

// Action to update an existing email template
export const updateEmailTemplateAction = (templateId, templateData) => async (dispatch) => {
  try {
    // Dispatch the update email template request
    dispatch({ type: types.UPDATE_EMAIL_TEMPLATE_REQUEST });

    const response = await templateServices.updateEmailTemplate(templateId, templateData);
    dispatch({
      type: types.UPDATE_EMAIL_TEMPLATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating email template for ${templateId}:`, error);
    dispatch({
      type: types.UPDATE_EMAIL_TEMPLATE_FAILURE,
      error: error.message,
    });
  }
};

// Action to delete an email template
export const deleteEmailTemplateAction = (templateId) => async (dispatch) => {
  try {
    // Dispatch the delete email template request
    dispatch({ type: types.DELETE_EMAIL_TEMPLATE_REQUEST });

    const response = await templateServices.deleteEmailTemplate(templateId);
    dispatch({
      type: types.DELETE_EMAIL_TEMPLATE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error deleting email template ${templateId}:`, error);
    dispatch({
      type: types.DELETE_EMAIL_TEMPLATE_FAILURE,
      error: error.message,
    });
  }
};

// Other template actions as needed...

import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';

// Add a new email template
export const addEmailTemplate = async (templateData) => {
  try {
    console.log(templateData);
    const response = await axios.post(`${BASE_URL}/api/template/create`, templateData);
    return response.data;
  } catch (error) {
    console.error('Error adding email template:', error);
    throw error;
  }
};

// Get all email templates
export const getAllEmailTemplates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/template/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all email templates:', error);
    throw error;
  }
};

// Get email template details by ID
export const getEmailTemplateDetails = async (templateId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/template/${templateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching email template details for ${templateId}:`, error);
    throw error;
  }
};

// Update email template by ID
export const updateEmailTemplate = async (templateId, templateData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/template/update/${templateId}`, templateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating email template for ${templateId}:`, error);
    throw error;
  }
};

// Delete email template by ID
export const deleteEmailTemplate = async (templateId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/template/delete/${templateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting email template ${templateId}:`, error);
    throw error;
  }
};

// Other email template services as needed...

import axios from 'axios';

const BASE_URL = 'http://192.168.0.107:3200';

// Add a new package
export const addPackage = async (packageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/package/add`, packageData);
    
    return response.data.package;
  } catch (error) {
    console.error('Error adding package:', error);
    throw error;
  }
};

// Add multiple packages
export const addPackages = async (packagesData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/package/bulk/add`, packagesData);
    return response.data.packages;
  } catch (error) {
    console.error('Error adding packages:', error);
    throw error;
  }
};

// Get all packages for a specific user
export const getAllPackagesForUser = async (userId) => {
  try {
    console.log(userId);
    const response = await axios.get(`${BASE_URL}/api/package/user/${userId}`);
    console.log(response.data.packages)
    return response.data.packages;
  } catch (error) {
    console.error('Error fetching all packages:', error);
    throw error;
  }
};

// Get all couriers
export const getAllCouriers = async () => {
  try {
    
    const response = await axios.get(`${BASE_URL}/api/package/couriers`);
    console.log(response.data.couriers)
    return response.data.couriers;
  } catch (error) {
    console.error('Error fetching all packages:', error);
    throw error;
  }
};

// Get package details by ID
export const getPackageDetails = async (packageId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/${packageId}`);
    return response.data.package;
  } catch (error) {
    console.error(`Error fetching package details for ${packageId}:`, error);
    throw error;
  }
};

// Update package status by ID
export const updatePackageStatus = async (packageId, userId) => {

  try {
    let updateData ={
      userId
    }
    console.log('update package details',packageId, userId)
    const response = await axios.patch(`${BASE_URL}/api/package/updateStatus/${packageId}`, updateData);
    return response.data.package;
  } catch (error) {
    console.error(`Error updating package status for ${packageId}:`, error);
    throw error;
  }
};

// Delete package by ID
export const deletePackage = async (packageId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/package/${packageId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting package ${packageId}:`, error);
    throw error;
  }
};


// Search packages by tracking number
export const searchPackagesByTrackingNumber = async (trackingNumber,token, userId) => {
  try {console.log('data', userId);
    const response = await axios.get(`${BASE_URL}/api/package/searchByTrackingNumber?trackingNumber=${trackingNumber}&userId=${userId}`);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by tracking number ${trackingNumber}:`, error);
    throw error;
  }
};




// Search packages by status
export const searchPackagesByStatus = async (status, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/filterByStatus?status=${status}`, userId);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by status ${status}:`, error);
    throw error;
  }
};

// Search packages by destination
export const searchPackagesByDestination = async (destination, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/searchByDestination?destination=${destination}`, userId);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by destination ${destination}:`, error);
    throw error;
  }
};

// Search packages by sender/receiver information
export const searchPackagesBySenderReceiverInfo = async (info, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/searchBySenderReceiverInfo?info=${info}`, userId);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by sender/receiver information ${info}:`, error);
    throw error;
  }
};

// Search packages by date range
export const searchPackagesByDateRange = async (startDate, endDate, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/searchByDateRange?startDate=${startDate}&endDate=${endDate}`, userId);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by date range (${startDate} - ${endDate}):`, error);
    throw error;
  }
};

// Search packages by keyword or description
export const searchPackagesByKeywordOrDescription = async (keyword, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/package/searchByKeywordOrDescription?keyword=${keyword}`, userId);
    return response.data.packages;
  } catch (error) {
    console.error(`Error searching packages by keyword or description ${keyword}:`, error);
    throw error;
  }
};


// Other package services as needed...

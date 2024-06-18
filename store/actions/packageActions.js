import * as packageTypes from '../types/packageTypes';
import * as packageServices from '../../services/packageServices';

// Action creators should only return plain objects

export const addPackageAction = (packageData) => async (dispatch) => {
  try {
    // Dispatch the add package request
    dispatch({ type: packageTypes.ADD_PACKAGE_REQUEST });

    const response = await packageServices.addPackage(packageData);
    dispatch({
      type: packageTypes.ADD_PACKAGE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error adding package:', error);
    dispatch({
      type: packageTypes.ADD_PACKAGE_FAILURE,
      error: error.message,
    });
  }
};



export const addPackagesAction = (packagesData) => async (dispatch) => {
  try {
    // Dispatch the add packages request
    dispatch({ type: packageTypes.ADD_PACKAGES_REQUEST });

    const response = await packageServices.addPackages(packagesData);
    dispatch({
      type: packageTypes.ADD_PACKAGES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error adding packages:', error);
    dispatch({
      type: packageTypes.ADD_PACKAGES_FAILURE,
      error: error.message,
    });
  }
};

export const getAllCouriersAction = () => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.GET_COURIERS_REQUEST });

    const couriers = await packageServices.getAllCouriers();
    dispatch({
      type: packageTypes.GET_COURIERS_SUCCESS,
      payload: couriers,
    });
  } catch (error) {
    console.error('Error fetching all couriers:', error);
    dispatch({
      type: packageTypes.GET_COURIERS_FAILURE,
      payload: error.message,
    });
  }
};

export const getPackagesForUserAction = (userId) => async (dispatch) => {
  try {
    // Dispatch the get packages for user request
    dispatch({ type: packageTypes.GET_PACKAGES_REQUEST });

    const packages = await packageServices.getAllPackagesForUser(userId);
    dispatch({
      type: packageTypes.GET_PACKAGES_SUCCESS,
      payload: packages,
    });
  } catch (error) {
    console.error('Error fetching all packages:', error);
    dispatch({
      type: packageTypes.GET_PACKAGES_FAILURE,
      error: error.message,
    });
  }
};

export const getPackageDetailsAction = (packageId) => async (dispatch) => {
  try {
    // Dispatch the get package details request
    dispatch({ type: packageTypes.GET_PACKAGE_DETAILS_REQUEST });

    const packageDetails = await packageServices.getPackageDetails(packageId);
    dispatch({
      type: packageTypes.GET_PACKAGE_DETAILS_SUCCESS,
      payload: packageDetails,
    });
  } catch (error) {
    console.error(`Error fetching package details for ${packageId}:`, error);
    dispatch({
      type: packageTypes.GET_PACKAGE_DETAILS_FAILURE,
      error: error.message,
    });
  }
};

export const updatePackageStatusAction = (packageId, userId) => async (dispatch) => {
  try {
    // Dispatch the update package status request
    dispatch({ type: packageTypes.UPDATE_PACKAGE_STATUS_REQUEST });

    const response = await packageServices.updatePackageStatus(packageId, userId);
    dispatch({
      type: packageTypes.UPDATE_PACKAGE_STATUS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error updating package status for ${packageId}:`, error);
    dispatch({
      type: packageTypes.UPDATE_PACKAGE_STATUS_FAILURE,
      error: error.message,
    });
  }
};

export const deletePackageAction = (packageId) => async (dispatch) => {
  try {
    // Dispatch the delete package request
    dispatch({ type: packageTypes.DELETE_PACKAGE_REQUEST });

    const response = await packageServices.deletePackage(packageId);
    dispatch({
      type: packageTypes.DELETE_PACKAGE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(`Error deleting package ${packageId}:`, error);
    dispatch({
      type: packageTypes.DELETE_PACKAGE_FAILURE,
      error: error.message,
    });
  }
};

export const searchPackagesByTrackingNumberAction = (trackingNumber, token, userId) => async (dispatch) => {
  try {
    console.log(userId);
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_REQUEST });
    const response = await packageServices.searchPackagesByTrackingNumber(trackingNumber, token, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by tracking number:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for searching packages by status
export const searchPackagesByStatusAction = (status, userId) => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_STATUS_REQUEST });
    const response = await packageServices.searchPackagesByStatus(status, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_STATUS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by status:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_STATUS_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for searching packages by destination
export const searchPackagesByDestinationAction = (destination, userId) => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_DESTINATION_REQUEST });
    const response = await packageServices.searchPackagesByDestination(destination, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_DESTINATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by destination:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_DESTINATION_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for searching packages by sender/receiver information
export const searchPackagesBySenderReceiverInfoAction = (info, userId) => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_REQUEST });
    const response = await packageServices.searchPackagesBySenderReceiverInfo(info, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by sender/receiver info:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for searching packages by date range
export const searchPackagesByDateRangeAction = (startDate, endDate, userId) => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_REQUEST });
    const response = await packageServices.searchPackagesByDateRange(startDate, endDate, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by date range:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_FAILURE,
      error: error.message,
    });
  }
};

// Action creator for searching packages by keyword or description
export const searchPackagesByKeywordOrDescriptionAction = (keyword, userId) => async (dispatch) => {
  try {
    dispatch({ type: packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_REQUEST });
    const response = await packageServices.searchPackagesByKeywordOrDescription(keyword, userId);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error('Error searching packages by keyword or description:', error);
    dispatch({
      type: packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_FAILURE,
      error: error.message,
    });
  }
};

// Other package actions as needed...

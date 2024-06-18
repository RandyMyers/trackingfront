import * as packageTypes from '../types/packageTypes';

const initialState = {
  packages: [],
  searchResults: [], 
  couriers: [],
  packageDetails: null,
  loading: false,
  error: null,
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case packageTypes.ADD_PACKAGE_REQUEST:
    case packageTypes.GET_PACKAGES_REQUEST:
    case packageTypes.GET_PACKAGE_DETAILS_REQUEST:
    case packageTypes.UPDATE_PACKAGE_STATUS_REQUEST:
    case packageTypes.DELETE_PACKAGE_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_STATUS_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_DESTINATION_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_REQUEST:
    case packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_REQUEST:
      case packageTypes.GET_COURIERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

      case packageTypes.ADD_PACKAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          packages: [...state.packages, action.payload], // Add the new package to the packages array
          error: null,
        };

    case packageTypes.GET_PACKAGES_SUCCESS:
      return {
        ...state,
        packages: action.payload,
        loading: false,
      };

    case packageTypes.GET_PACKAGE_DETAILS_SUCCESS:
      return {
        ...state,
        packageDetails: action.payload,
        loading: false,
      };

      case packageTypes.UPDATE_PACKAGE_STATUS_SUCCESS:
        return {
          ...state,
          packages: state.packages.map((pkg) =>
          pkg._id === action.payload._id ? action.payload : pkg
        ),
          loading: false,
        };
  

    case packageTypes.DELETE_PACKAGE_SUCCESS:
      return {
        ...state,
        packages: state.packages.filter((pkg) => pkg._id !== action.payload),
        loading: false,
      };

      case packageTypes.GET_COURIERS_SUCCESS: // Added case
      return {
        ...state,
        couriers: action.payload,
        loading: false,
      };

       // Handle search success actions
    case packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_SUCCESS:
      case packageTypes.SEARCH_PACKAGES_BY_STATUS_SUCCESS:
      case packageTypes.SEARCH_PACKAGES_BY_DESTINATION_SUCCESS:
      case packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_SUCCESS:
      case packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_SUCCESS:
      case packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_SUCCESS:
        return {
          ...state,
          searchResults: action.payload,
          loading: false,
        };

    
        case packageTypes.ADD_PACKAGE_FAILURE:
          case packageTypes.GET_PACKAGES_FAILURE:
          case packageTypes.GET_PACKAGE_DETAILS_FAILURE:
          case packageTypes.UPDATE_PACKAGE_STATUS_FAILURE:
          case packageTypes.DELETE_PACKAGE_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_TRACKING_NUMBER_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_STATUS_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_DESTINATION_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_SENDER_RECEIVER_INFO_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_DATE_RANGE_FAILURE:
          case packageTypes.SEARCH_PACKAGES_BY_KEYWORD_OR_DESCRIPTION_FAILURE:
            case packageTypes.GET_COURIERS_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };

    // Add other cases as needed...

    default:
      return state;
  }
};

export default packageReducer;

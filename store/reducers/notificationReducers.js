import * as notificationTypes from '../types/notificationTypes';

const initialState = {
  loading: false,
  notifications: [],
  unreadCount: 0,
  error: ''
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationTypes.CREATE_NOTIFICATION_REQUEST:
    case notificationTypes.GET_NOTIFICATIONS_REQUEST:
    case notificationTypes.COUNT_UNREAD_NOTIFICATIONS_REQUEST:
    case notificationTypes.MARK_NOTIFICATION_AS_READ_REQUEST:
    case notificationTypes.DELETE_NOTIFICATION_REQUEST:
    case notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST:
      return {
        ...state,
        loading: true
      };
    case notificationTypes.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case notificationTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.notifications
      };
    case notificationTypes.COUNT_UNREAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        unreadCount: action.payload.unreadCount
      };
      case notificationTypes.MARK_NOTIFICATION_AS_READ_SUCCESS:
        case notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
          return {
            ...state,
            loading: false,
            notifications: action.payload.notifications
          };
        case notificationTypes.DELETE_NOTIFICATION_SUCCESS:
          return {
            ...state,
            loading: false
          };
    case notificationTypes.CREATE_NOTIFICATION_FAILURE:
    case notificationTypes.GET_NOTIFICATIONS_FAILURE:
    case notificationTypes.COUNT_UNREAD_NOTIFICATIONS_FAILURE:
    case notificationTypes.MARK_NOTIFICATION_AS_READ_FAILURE:
    case notificationTypes.DELETE_NOTIFICATION_FAILURE:
    case notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default notificationReducer;

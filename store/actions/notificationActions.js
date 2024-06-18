import * as notificationTypes from '../types/notificationTypes';
import * as notificationService from '../../services/notificationServices';

export const getNotificationsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.GET_NOTIFICATIONS_REQUEST });
    const response = await notificationService.getNotificationsByUser(userId);
    console.log(response);
    dispatch({
      type: notificationTypes.GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications: response,
      },
    });
  } catch (error) {
    console.error('Error with notifications:', error);
    dispatch({
      type: notificationTypes.GET_NOTIFICATIONS_FAILURE,
      payload: error.message,
    });
  }
};


export const createNotificationAction = (notificationData) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.CREATE_NOTIFICATION_REQUEST });
    await notificationService.createNotification(notificationData);
    dispatch({ type: notificationTypes.CREATE_NOTIFICATION_SUCCESS });
  } catch (error) {
    console.error('Error with notification:', error);
    dispatch({
      type: notificationTypes.CREATE_NOTIFICATION_FAILURE,
      payload: error.message
    });
  }
};

export const countUnreadNotificationsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.COUNT_UNREAD_NOTIFICATIONS_REQUEST });
    const unreadCount = await notificationService.countUnreadNotifications(userId);
    dispatch({
      type: notificationTypes.COUNT_UNREAD_NOTIFICATIONS_SUCCESS,
      payload: { unreadCount }
    });
  } catch (error) {
    console.error('Error with unread notifications:', error);
    dispatch({
      type: notificationTypes.COUNT_UNREAD_NOTIFICATIONS_FAILURE,
      payload: error.message
    });
  }
};

export const markNotificationAsReadAction = (notificationId, userId) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.MARK_NOTIFICATION_AS_READ_REQUEST });
    const response = await notificationService.markNotificationAsRead(notificationId, userId);
    dispatch({
      type: notificationTypes.MARK_NOTIFICATION_AS_READ_SUCCESS,
      payload: {
        notifications: response.notifications,
      },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    dispatch({
      type: notificationTypes.MARK_NOTIFICATION_AS_READ_FAILURE,
      payload: error.message
    });
  }
};

export const markAllNotificationsAsReadAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST });
    const response = await notificationService.markAllNotificationsAsRead(userId);
    dispatch({
      type: notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
      payload: {
        notifications: response.notifications,
      },
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    dispatch({
      type: notificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,
      payload: error.message
    });
  }
};

export const deleteNotificationAction = (notificationId) => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.DELETE_NOTIFICATION_REQUEST });
    await notificationService.deleteNotification(notificationId);
    dispatch({ type: notificationTypes.DELETE_NOTIFICATION_SUCCESS });
  } catch (error) {
    console.error('Error deleting notification:', error);
    dispatch({
      type: notificationTypes.DELETE_NOTIFICATION_FAILURE,
      payload: error.message
    });
  }
};

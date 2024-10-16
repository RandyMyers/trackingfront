import axios from 'axios';

const BASE_URL = 'https://track-mk6l.onrender.com';
//const BASE_URL = 'http://192.168.0.103:3200';

export const createNotification = async (notificationData) => {
    try {
      const response = await axios.post(`${BASE_URL}/notifications/create`, notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };



  
  export const getNotificationsByUser = async (userId) => {
    try {
      console.log('user id is present here', userId);
      const response = await axios.get(`${BASE_URL}/api/notifications/${userId}`);
      
      return response.data.notifications;
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  };




  export const countUnreadNotifications = async (userId) => {
    
    try {
      const response = await axios.get(`${BASE_URL}/api/notifications/count/unread/${userId}`);
      

      return response.data.unreadCount;
    } catch (error) {
      console.error('Error counting unread notifications:', error);
      throw error;
    }
  };

  
  // Mark a single notification as read
export const markNotificationAsRead = async (notificationId, userId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/notifications/${notificationId}`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };

    // New function to mark all notifications as read for a user
export const markAllNotificationsAsRead = async (userId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/notifications/readAll/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  };
  
  export const deleteNotification = async (notificationId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/notifications/delete/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };


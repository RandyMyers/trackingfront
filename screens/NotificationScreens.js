import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { getNotificationsAction, markNotificationAsReadAction, markAllNotificationsAsReadAction,countUnreadNotificationsAction  } from '../store/actions/notificationActions';

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const notifications = useSelector((state) => state.note.notifications);
  const loading = useSelector((state) => state.note.loading);
  const error = useSelector((state) => state.note.error);
  const userId = useSelector((state) => state.auth.user);


  useEffect(() => {
    dispatch(getNotificationsAction(userId));
  }, [dispatch, userId]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsReadAction(userId));
    dispatch(countUnreadNotificationsAction(userId))
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('mark as read', notificationId)
    dispatch(markNotificationAsReadAction(notificationId, userId));
    dispatch(countUnreadNotificationsAction(userId))
  };

  const renderNotificationItem = ({ item }) => (
    <NotificationItemContainer>
      <NotificationIcon name="notification-important" size={24} read={item.read} />
      <NotificationText>
        <NotificationTitle read={item.read}>{item.name}</NotificationTitle>
        <Text>{item.message}</Text>
        <NotificationTime>{new Date(item.timestamp).toLocaleString()}</NotificationTime>
      </NotificationText>
      {!item.read && (
        <TouchableOpacity onPress={() => handleMarkAsRead(item._id)} >
            
          <MarkAsReadText>Mark as Read</MarkAsReadText>
        </TouchableOpacity>
      )}
    </NotificationItemContainer>
  );

  if (loading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#6200b3" />
      </CenteredView>
    );
  }

  if (error) {
    console.log(error)
    return (
      <CenteredView>
        <ErrorText>Failed to load notifications</ErrorText>
        <TouchableOpacity onPress={() => dispatch(getNotificationsAction(userId))}>
          <RetryButton>Retry</RetryButton>
        </TouchableOpacity>
      </CenteredView>
    );
  }

  if (notifications === null) {
    return (
      <CenteredView>
        <ErrorText>No notifications available.</ErrorText>
      </CenteredView>
    );
  }

  return (
    <Container>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={<EmptyMessage>You have no notifications at this time.</EmptyMessage>}
      />
      <TouchableOpacity onPress={handleMarkAllAsRead}>
        <MarkAllAsReadText>Mark All as Read</MarkAllAsReadText>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const NotificationItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const NotificationIcon = styled(MaterialIcons)`
  color: ${({ read }) => (read ? "#ccc" : "#6200b3")};
`;

const NotificationText = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
`;

const NotificationTitle = styled.Text`
  font-weight: bold;
  color: ${({ read }) => (read ? "#ccc" : "#6200b3")};
`;

const NotificationTime = styled.Text`
  color: #888;
  font-size: 12px;
`;

const MarkAsReadText = styled.Text`
  color: #6200b3;
`;

const MarkAllAsReadText = styled.Text`
  text-align: center;
  color: #6200b3;
  padding: 10px;
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

const RetryButton = styled.Text`
  color: #6200b3;
`;

const EmptyMessage = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: #888;
`;

export default NotificationsScreen;

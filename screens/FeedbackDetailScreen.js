import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, TextInput, FlatList, ScrollView } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbackByIdAction, respondToFeedbackAction } from '../store/actions/feedbackActions';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FeedbackDetailScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { feedbackId } = route.params;
  const userId = useSelector((state) => state.auth.user);
  const [responseText, setResponseText] = useState('');
  const { feedback, loading, error } = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(getFeedbackByIdAction(feedbackId));
  }, [dispatch, feedbackId]);

  const handleResponse = () => {
    if (responseText.trim()) {
      const responderId = userId;
      const status = feedback.status;
      const responseData = { responderId, responseText, status };
      dispatch(getFeedbackByIdAction(feedbackId));
      dispatch(respondToFeedbackAction(feedbackId, responseData));
      setResponseText('');
    }
  };

  const renderResponse = ({ item }) => (
    <View style={styles.responseContainer}>
      <View style={styles.responseHeader}>
        <Icon name="account-circle" size={30} color="#6200b3" style={styles.avatarIcon} />
        <Text style={styles.responseUsername}>{item.responderId?.username || 'Unknown'}</Text>
      </View>
      <Text style={styles.responseText}>{item.responseText}</Text>
      <Text style={styles.responseTimestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#6200b3" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{feedback?.category}</Text>
        <Text style={styles.text}>{feedback?.feedbackText}</Text>
        <Text style={styles.status}>Status: {feedback?.status}</Text>

        {feedback?.responses && feedback.responses.length > 0 && (
          <View style={styles.responsesContainer}>
            <Text style={styles.responsesTitle}>Responses:</Text>
            <FlatList
              data={feedback.responses}
              renderItem={renderResponse}
              keyExtractor={(item) => item._id.toString()}
              scrollEnabled={false} // Disable internal scrolling of FlatList to avoid conflicts with ScrollView
            />
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Add your response..."
          value={responseText}
          onChangeText={setResponseText}
          multiline
        />

        <Button title="Submit Response" onPress={handleResponse} color="#6200b3" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#888',
    textAlign: 'center',
  },
  responsesContainer: {
    marginBottom: 16,
  },
  responsesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  responseContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarIcon: {
    marginRight: 8,
  },
  responseUsername: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 14,
    marginTop: 4,
  },
  responseTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FeedbackDetailScreen;

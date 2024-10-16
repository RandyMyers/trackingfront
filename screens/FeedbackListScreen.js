import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbackByUserAction } from '../store/actions/feedbackActions';
import { useNavigation } from '@react-navigation/native';

const FeedbackListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.user);
  const feedbacks = useSelector(state => state.feedback.feedbacks);
  const loading = useSelector(state => state.feedback.loading);
  const error = useSelector(state => state.feedback.error);

  useEffect(() => {
    dispatch(getFeedbackByUserAction(userId));
  }, [dispatch, userId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('FeedbackDetail', { feedbackId: item._id })}
    >
      <Text style={styles.itemTitle}>{item.category}</Text>
      <Text style={styles.itemText} numberOfLines={1}>{item.feedbackText}</Text>
      <Text style={styles.itemStatus}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  const handleSubmitFeedback = () => {
    navigation.navigate('SubmitFeedback');
  };

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
        {feedbacks.length === 0 ? (
          <View style={styles.noFeedbackContainer}>
            <Text style={styles.noFeedbackText}>There are no feedbacks yet.</Text>
          </View>
        ) : (
          <FlatList
            data={feedbacks}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            scrollEnabled={false} // Disable FlatList's own scroll to allow ScrollView to handle it
          />
        )}

        <TouchableOpacity style={styles.submitFeedbackButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    marginTop: 4,
  },
  itemStatus: {
    fontSize: 12,
    marginTop: 8,
    color: '#888',
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
  noFeedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFeedbackText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  submitFeedbackButton: {
    backgroundColor: '#6200b3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20, // Add bottom margin to avoid overlap with the screen's edge
  },
  submitFeedbackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FeedbackListScreen;

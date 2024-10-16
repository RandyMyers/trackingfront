import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, ActivityIndicator, Alert, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedbackAction, getFeedbackByUserAction } from '../store/actions/feedbackActions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const categories = [
  'Bug Report',
  'Feature Request',
  'General Comment',
  'Other'
];

const SubmitFeedbackScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);  // Get userId from auth state
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("Permission to access the camera roll is required!");
        return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!pickerResult.canceled) {
        setImageUri(pickerResult.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!feedbackText || !rating || !category) {
      Alert.alert('Validation Error', 'Please fill out all fields');
      return;
    }
  
    setLoading(true);
  
    try {
      let base64Image = null;
      if (imageUri) {
        base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
  
      // Verify the base64Image before sending
      console.log('Base64 Image:', base64Image);
  
      const feedbackData = {
        userId,
        feedbackText,
        rating,
        category,
        image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
      };
  
      await dispatch(createFeedbackAction(feedbackData));
      Alert.alert('Success', 'Feedback submitted successfully');
      
      // Reset the form
      setFeedbackText('');
      setRating('');
      setCategory('');
      setImageUri(null);
      dispatch(getFeedbackByUserAction(userId));
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting your feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Submit Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Feedback Text"
        value={feedbackText}
        onChangeText={setFeedbackText}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.categoryButton, category === cat && styles.selectedCategory]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryText, category === cat && styles.selectedCategoryText]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <Button title="Submit Feedback" onPress={handleSubmit} color="#6200b3" />

      {loading && <ActivityIndicator size="large" color="#6200b3" style={styles.loader} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#6200b3',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  imagePicker: {
    backgroundColor: '#6200b3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  loader: {
    marginTop: 16,
  },
});

export default SubmitFeedbackScreen;

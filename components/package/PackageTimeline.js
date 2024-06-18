import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimelineItem = ({ time, title, description }) => (
  <View style={styles.container}>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>{time}</Text>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const PackageTimeline = ({ trackinfo }) => {
  return (
    <View style={styles.timeline}>
      {trackinfo.map((checkpoint, index) => (
        <TimelineItem
          key={index}
          time={checkpoint.checkpoint_date}
          title={checkpoint.tracking_detail}
          description={checkpoint.location}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 90, // Adjust the width here
    marginRight: 10,
    alignItems: 'center',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default PackageTimeline;

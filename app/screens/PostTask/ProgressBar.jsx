import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProgressBar = ({ stages, currentStage }) => {
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => (
        <View key={index} style={styles.stageContainer}>
          <View
            style={[
              styles.circle,
              index === currentStage ? styles.activeCircle : styles.inactiveCircle,
            ]}
          />
          {index < stages.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  activeCircle: {
    backgroundColor: '#FDAB2F',
  },
  inactiveCircle: {
    backgroundColor: '#D9D9D9',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#120D92',
  },
});

export default ProgressBar;

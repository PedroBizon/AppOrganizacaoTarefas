// src/components/Task.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Task = ({ task, onCheckBoxPress, onTaskPress, onEditPress }) => {
  const handleCheckboxPress = () => {
    onCheckBoxPress(task);
  };

  const handleTaskPress = () => {
    onTaskPress(task);
  };

  const handleEditPress = () => {
    onEditPress(task);
  };

  const getTaskStyle = () => {
    if (task.completed) {
      return styles.completedTask;
    } else if (task.isLate) {
      return styles.lateTask;
    } else {
      return styles.pendingTask;
    }
  };

  return (
    <View style={[styles.container, getTaskStyle()]}>
      <TouchableOpacity onPress={handleCheckboxPress}>
        <MaterialIcons
          name={task.completed ? 'check-box' : 'check-box-outline-blank'}
          size={30}
          color={task.completed ? '#06A77D' : '#8D8D8D'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleTaskPress} style={styles.taskInfo}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={styles.taskDetails}>
          {task.date} | {task.time}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEditPress}>
        <MaterialIcons name="edit" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 10,
  },
  taskName: {
    color: '#fff',
    fontSize: 16,
  },
  taskDetails: {
    color: '#8D8D8D',
    fontSize: 12,
  },
  lateTask: {
    backgroundColor: '#8F1D1D',
  },
  pendingTask: {
    backgroundColor: '#0B88BF',
  },
  completedTask: {
    backgroundColor: '#005377',
  },
});

export default Task;

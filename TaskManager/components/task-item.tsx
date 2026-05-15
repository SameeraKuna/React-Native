import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const getStatusColor = () => {
    return task.completed ? '#10b981' : '#f59e0b';
  };

  const getGradientColors = () => {
    return task.completed
      ? ['rgba(255, 255, 255, 0.98)', 'rgba(240, 253, 250, 0.95)']
      : ['rgba(255, 255, 255, 0.98)', 'rgba(255, 251, 235, 0.95)'];
  };

  return (
    <LinearGradient
      colors={getGradientColors() as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderLeftColor: getStatusColor() }]}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}>
        <View style={styles.checkboxContainer}>
          <View
            style={[
              styles.checkbox,
              task.completed && styles.checkboxChecked,
              !task.completed && styles.checkboxPending,
            ]}>
            {task.completed && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
            {!task.completed && (
              <View style={styles.pendingDot} />
            )}
          </View>
        </View>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completedText,
          ]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxPending: {
    borderColor: '#f59e0b',
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
  },
  taskText: {
    fontSize: 15,
    color: '#1f2937',
    flex: 1,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
});

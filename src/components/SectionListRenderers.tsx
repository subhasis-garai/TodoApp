import React from 'react';
import { View, Text, Switch, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AppIcon from '../components/Icon';
import colors from '../constants/colors';
import typography from '../constants/typography';

export const renderTodoItem = (
  toggleTodo: (id: string) => void,
  deleteTodo: (id: string) => void,
  handleEdit: (id: string, text: string, date: Date) => void
) => ({ item }: { item: any }) => (
  <View style={styles.todoItem}>
    <View style={styles.todoContent}>
      <Text style={[styles.todoText, item.completed && styles.completed]}>
        {item.text}
      </Text>
      <Switch
        value={item.completed}
        onValueChange={() => toggleTodo(item.id)}
        trackColor={{ true: colors.success, false: colors.danger }}
        thumbColor={colors.primary}
      />
    </View>
    <View style={styles.todoActions}>
      <TouchableOpacity onPress={() => handleEdit(item.id, item.text, new Date(item.date))}>
        <AppIcon name="edit" size={24} color={colors.primary} />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <AppIcon name="delete" size={24} color={colors.danger} />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
  <View style={styles.dateHeader}>
    <Text style={styles.dateHeaderText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  deleteText: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  todoItem: {
    backgroundColor: colors.lightGray,
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  todoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    color: colors.textPrimary,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  dateHeader: {
    backgroundColor: colors.headerBackground,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  dateHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

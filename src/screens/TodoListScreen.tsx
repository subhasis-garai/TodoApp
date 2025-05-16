import React, { useState } from 'react';
import {
  View,
  SectionList,
  Text,
  Button,
  Modal,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../hooks/useAuth';
import { useTodos } from '../hooks/useTodos';
import CustomStatusBar from '../components/CustomStatusBar';
import { renderTodoItem, renderSectionHeader } from '../components/SectionListRenderers';
import AppIcon from '../components/Icon';
import colors from '../constants/colors';
import typography from '../constants/typography';

const TodoListScreen: React.FC = () => {
  const { logout } = useAuth();
  const {
    sections,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    loading,
  } = useTodos();

  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (input.trim()) {
      if (editingTodoId) {
        updateTodo(editingTodoId, input, selectedDate);
      } else {
        addTodo(input, selectedDate);
      }
      setInput('');
      setSelectedDate(new Date());
      setModalVisible(false);
      setEditingTodoId(null);
    }
  };

  const handleEdit = (id: string, text: string, date: Date) => {
    setEditingTodoId(id);
    setInput(text);
    setSelectedDate(date);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Loading todos...</Text>
      </View>
    );
  }

  return (
    <>
      <CustomStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Logout" onPress={logout} color={colors.danger} />
          <Button
            title="Add Todo"
            onPress={() => {
              setEditingTodoId(null);
              setInput('');
              setSelectedDate(new Date());
              setModalVisible(true);
            }}
            color={sections.length === 0 ? colors.primary : colors.success}
          />
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderTodoItem(toggleTodo, deleteTodo, handleEdit)}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No todos yet. Tap "Add Todo" to get started!
            </Text>
          }
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={[typography.heading, { marginBottom: 20 }]}>
                {editingTodoId ? 'Edit Todo' : 'Add New Todo'}
              </Text>
              <TextInput
                placeholder="Enter task"
                value={input}
                onChangeText={setInput}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.datePickerText}>
                  Due: {selectedDate.toDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setSelectedDate(date);
                  }}
                />
              )}
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color={colors.gray} />
                <Button
                  title={editingTodoId ? 'Update' : 'Add'}
                  onPress={handleAddOrUpdate}
                  color={colors.success}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.lightGray },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    fontFamily: 'Roboto',  // Optional: Custom font
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  datePickerText: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default TodoListScreen;

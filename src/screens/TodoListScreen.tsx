import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  Modal,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTodos } from '../hooks/useTodos';
import CustomStatusBar from '../components/CustomStatusBar';


const TodoListScreen: React.FC = () => {
  const { logout } = useAuth();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
      setModalVisible(false);
    }
  };

  return (
    <>
    <CustomStatusBar backgroundColor="#1e90ff" barStyle="light-content" />
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Logout" onPress={logout} color="red" />
        <Button
          title="Add Todo"
          onPress={() => setModalVisible(true)}
          color={todos.length === 0 ? 'blue' : 'green'}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={todos.length === 0 && styles.emptyList}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoContent}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
              <Switch
                value={item.completed}
                onValueChange={() => toggleTodo(item.id)}
              />
            </View>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Tap "Add Todo" to get started!</Text>
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
            <Text style={styles.modalTitle}>Add New Todo</Text>
            <TextInput
              placeholder="Enter task"
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
              <Button title="Add" onPress={handleAdd} color="green" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
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
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default TodoListScreen;

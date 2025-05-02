import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getData, storeData } from '../utils/storage';
import { childrenType, Todo, TodoContextType } from '../types/TodoContextType';


export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: childrenType) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const saved = await getData('todos');
      if (saved) setTodos(saved);
    };
    fetchTodos();
  }, []);

  const updateTodos = async (newTodos: Todo[]) => {
    setTodos(newTodos);
    await storeData('todos', newTodos);
  };

  const addTodo = (text: string) => {
    const newTodos = [...todos, { id: Date.now().toString(), text, completed: false }];
    updateTodos(newTodos);
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    updateTodos(updated);
  };

  const deleteTodo = (id: string) => {
    const filtered = todos.filter(t => t.id !== id);
    updateTodos(filtered);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};


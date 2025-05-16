// context/TodoProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getData, storeData } from '../utils/storage';
import { childrenType, Todo, Section, TodoContextType } from '../types/TodoContextType';

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: childrenType) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const saved = await getData('todos');
      if (saved && Array.isArray(saved)) {
        await structureAndSetTodos(saved);
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  const structureAndSetTodos = async (flatTodos: Todo[]) => {
    const grouped: Record<string, Todo[]> = {};

    flatTodos.forEach(todo => {
      const dateKey = new Date(todo.date).toDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(todo);
    });

    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    const structuredSections: Section[] = sortedDates.map(dateStr => ({
      title: dateStr,
      data: grouped[dateStr]
    }));

    setSections(structuredSections);
    await storeData('todos', flatTodos);
  };

  const getCurrentFlatTodos = async (): Promise<Todo[]> => {
    const stored = await getData('todos');
    return Array.isArray(stored) ? stored : [];
  };

  const addTodo = async (text: string, date: Date) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      date: date.toISOString()
    };

    const currentTodos = await getCurrentFlatTodos();
    const updatedTodos = [...currentTodos, newTodo];
    await structureAndSetTodos(updatedTodos);
  };

  const toggleTodo = async (id: string) => {
    const currentTodos = await getCurrentFlatTodos();
    const updated = currentTodos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    await structureAndSetTodos(updated);
  };

  const deleteTodo = async (id: string) => {
    const currentTodos = await getCurrentFlatTodos();
    const updated = currentTodos.filter(t => t.id !== id);
    await structureAndSetTodos(updated);
  };

  const updateTodo = async (id: string, text: string, date: Date) => {
    const currentTodos = await getCurrentFlatTodos();
    const updated = currentTodos.map(t =>
      t.id === id ? { ...t, text, date: date.toISOString() } : t
    );
    await structureAndSetTodos(updated);
  };

  return (
    <TodoContext.Provider
      value={{
        sections,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        loading
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

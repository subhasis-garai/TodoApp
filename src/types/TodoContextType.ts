// types/TodoContextType.ts

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: string; // ISO string
};

export type Section = {
  title: string; // e.g. "Fri May 09 2025"
  data: Todo[];  // todos for that date
};

export type TodoContextType = {
  sections: Section[];
  addTodo: (text: string, date: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string, date: Date) => void;
  loading: boolean;
};

export type childrenType = {
  children: React.ReactNode;
};

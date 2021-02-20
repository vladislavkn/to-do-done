import create from "zustand";
import { todoItem } from "../components/TodoListItem";

type State = {
  todos: todoItem[];
  editTodo: (todo: todoItem) => void;
  removeTodo: (todo: todoItem) => void;
};

export const useDailyTodos = create<State>((set) => ({
  todos: [
    {
      title: "Do the homework",
      duration: 1000,
      from: 1000,
      to: 1000,
      time: "30min | 15:00-15:30",
      done: false,
      id: "0",
    },
    {
      title: "Do the homework",
      duration: 1000,
      from: 1000,
      to: 1000,
      time: "30min | 15:00-15:30",
      done: true,
      id: "1",
    },
    {
      title: "Wash the dishes, clean up...",
      duration: 1000,
      from: 1000,
      to: 1000,
      time: "1h 30min | 15:30-16:00",
      done: true,
      id: "2",
    },
  ],
  editTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
  removeTodo: (todo) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== todo.id) })),
}));

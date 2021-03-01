import create from "zustand";
import { State, Overlay, Todo } from "../types";
import { generateId } from "../utils";
import { currentOverlaySelector } from "./selectors";
import { persist } from "zustand/middleware";

import config from "../../app.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create<State>(
  persist(
    (set) => ({
      todos: [],
      screen: "",
      categories: [],
      overlays: [],
      selectedCategoryId: false,
      setSelectedCategoryId: (category) =>
        set(() => ({
          selectedCategoryId: category.id,
        })),
      openOverlay: (overlay) =>
        set((state) => {
          (overlay as Overlay).id = generateId();
          (overlay as Overlay).payload = {};
          (overlay as Overlay).inputType = overlay?.inputType ?? "none";
          (overlay as Overlay).initialValue = overlay?.initialValue ?? {};
          (overlay as Overlay).placeholder = overlay?.placeholder ?? "";
          (overlay as Overlay).buttonGroups =
            (overlay?.buttonGroups?.filter(
              Boolean
            ) as Overlay["buttonGroups"]) ?? [];
          return {
            overlays: [...state.overlays, overlay as Overlay],
          };
        }),
      closeOverlay: () =>
        set((state) => ({
          overlays:
            state.overlays.length > 0
              ? state.overlays.slice(0, -1)
              : state.overlays,
        })),
      setOverlayPayload: (payload) =>
        set((state) => {
          const overlay = currentOverlaySelector(state);
          overlay.payload = {
            ...overlay.payload,
            ...payload,
          } as Overlay["payload"];
          return {
            overlays: state.overlays.map((o) =>
              o.id === overlay.id ? overlay : o
            ),
          };
        }),
      updateTodo: (todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
        })),
      removeTodo: (todo) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== todo.id),
        })),
      addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo as Todo] })),
      removeTodos: (fn) =>
        set((state) => ({
          todos: state.todos.filter((t) => !fn(t)),
        })),
      navigate: (screen) => set(() => ({ screen })),
      addCategory: (name) =>
        set((state) => {
          const newCategory = { name, id: generateId() };

          return {
            categories: state.categories.some((c) => c.name === name)
              ? state.categories
              : [...state.categories, newCategory],
            selectedCategoryId:
              state.categories.length > 0
                ? state.selectedCategoryId
                : newCategory.id,
          };
        }),
      updateCategory: (category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
        })),
      removeCategory: (categry) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== categry.id),
        })),
    }),
    {
      name: "tododone",
      getStorage: () => AsyncStorage,
      version: parseInt(config.expo.version[0]),
      whitelist: ["todos", "categories"],
    }
  )
);

export default useStore;

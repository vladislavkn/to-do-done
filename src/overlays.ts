import { Category, State, Todo } from "./types";
import useStore from "./store";
import {
  timeButtonGroup,
  formatTime,
  createCategoriesGroup,
  generateId,
  createDate,
} from "./utils";
import { endTimeSelector } from "./store/selectors";
import { Alert } from "react-native";
import { useModalStore } from "./store/modal";

export const showAddTodoOverlay = (today = false) => {
  const state = useStore.getState();
  if (!today && state.categories.length === 0) {
    alert("First create at least one category.");
    return;
  }

  state.openOverlay({
    placeholder: "New todo",
    inputType: "text",
    autofocus: true,
    submit({ payload }) {
      if (payload.value.text.length > 0) {
        const todo = {
          title: payload.value.text,
          done: false,
          id: generateId(),
          from: endTimeSelector(state),
          duration: payload?.duration ?? 0,
          categoryId:
            payload?.categoryId ?? (!today ? state.selectedCategoryId : ""),
          time: "",
          today,
        } as Todo;
        todo.time = formatTime(todo.from, todo.duration);

        state.addTodo(todo);
        state.closeOverlay();
      }
    },
    buttonGroups: [
      state.screen === "TodayTodoListPage" && timeButtonGroup,
      state.categories.length > 0 &&
        state.screen === "TodayTodoListPage" &&
        createCategoriesGroup(state.categories),
    ],
  });
};

export const showEditTodoOverlay = (todo: Todo) => {
  const state: State = useStore.getState();

  state.openOverlay({
    placeholder: "Todo text",
    initialValue: { text: todo.title },
    inputType: "text",
    submit({ payload }) {
      if (payload.value.text.length > 0) {
        todo.title = payload.value.text;
        if (payload.duration) {
          todo.duration = payload.duration;
          todo.time = formatTime(todo.from, todo.duration);
        }
        if (payload.categoryId) {
          todo.categoryId = payload.categoryId;
        }
        state.updateTodo(todo);
        state.closeOverlay();
      }
    },
    buttonGroups: [
      timeButtonGroup,
      state.categories.length > 0 && createCategoriesGroup(state.categories),
      {
        selectable: false,
        buttons: [
          {
            buttonText: "Change time",
            iconProps: {
              name: "time",
              width: 12,
              height: 12,
            },
            fn() {
              showUpdateTimeOverlay((time) => {
                todo.from = time;
                todo.time = formatTime(todo.from, todo.duration);
                state.updateTodo(todo);
                state.closeOverlay();
              });
            },
          },

          {
            buttonText: todo.today ? "Remove from today" : "Move to today",
            iconProps: {
              name: todo.today ? "remove" : "move",
              width: 12,
              height: 12,
            },
            fn: () => {
              if (todo.categoryId.length > 0) {
                todo.today = !todo.today;
                state.updateTodo(todo), state.closeOverlay();
              } else {
                Alert.alert(
                  "Remove task",
                  "That task has no category and will be removed.",
                  [
                    {
                      text: "Remove",
                      onPress: () => {
                        state.removeTodo(todo);
                        state.closeOverlay();
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ],
                  { cancelable: true }
                );
              }
            },
          },
          {
            buttonText: "Delete",
            iconProps: {
              name: "delete",
              width: 10,
              height: 12,
            },
            fn() {
              state.removeTodo(todo);
              state.closeOverlay();
            },
          },
        ],
      },
    ],
  });
};

const showUpdateTimeOverlay = (callback: (time: number) => void) => {
  const state: State = useStore.getState();

  state.openOverlay({
    inputType: "time",
    autofocus: true,
    submit({ payload }) {
      if (
        payload?.value?.minutes?.length > 0 &&
        payload?.value?.hours?.length > 0
      ) {
        const date = createDate(payload.value.hours, payload.value.minutes);
        callback(date.getTime());
        state.closeOverlay();
      }
    },
  });
};

// export const showAddCategoryOverlay = () => {
//   const state: State = useStore.getState();

//   state.openOverlay({
//     inputType: "text",
//     autofocus: true,
//     placeholder: "New Category",
//     submit({ payload }) {
//       if (payload.value.text.length > 0) {
//         state.addCategory(payload.value.text);
//         state.closeOverlay();
//       }
//     },
//   });
// };

export const showAddCategoryOverlay = () => {
  const modalState = useModalStore.getState();
  const state = useStore.getState();

  modalState.push({
    inputType: "text",
    placeholder: "New category",
    autofocus: true,
    submit(modal) {
      if (modal.value.text.length > 0) {
        state.addCategory(modal.value.text);
        modalState.pop();
      }
    },
  });
};

export const showEditCategoryOverlay = (category: Category) => {
  const state = useStore.getState();

  state.openOverlay({
    inputType: "text",
    placeholder: "Category name",
    initialValue: { text: category.name },
    submit({ payload }) {
      if (payload.value.text.length > 0) {
        category.name = payload.value.text;
        state.updateCategory(category);
        state.closeOverlay();
      }
    },
    buttonGroups: [
      {
        selectable: false,
        buttons: [
          {
            buttonText: "Delete",
            iconProps: {
              name: "delete",
              width: 12,
              height: 12,
            },
            fn() {
              state.removeCategory(category);
              state.closeOverlay();
            },
          },
        ],
      },
    ],
  });
};

export const showOptionsOverlay = () => {
  const state = useStore.getState();

  state.openOverlay({
    inputType: "none",
    buttonGroups: [
      {
        selectable: false,
        buttons: [
          {
            buttonText: "Remove done tasks",
            fn() {
              Alert.alert(
                "Remove done tasks",
                "Remove all completed tasks? You will not be able to restore them.",
                [
                  {
                    text: "Remove",
                    onPress() {
                      if (state.screen === "TodayTodoListPage") {
                        state.removeTodos((t) => t.today && t.done);
                        state.closeOverlay();
                      } else {
                        state.removeTodos(
                          (t) =>
                            t.categoryId === state.selectedCategoryId && t.done
                        );
                        state.closeOverlay();
                      }
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            },
          },
          {
            buttonText: "Remove All tasks",
            fn() {
              Alert.alert(
                "Remove all tasks",
                "Remove all tasks? You will not be able to restore them.",
                [
                  {
                    text: "Remove",
                    onPress() {
                      if (state.screen === "TodayTodoListPage") {
                        state.removeTodos((t) => t.today);
                        state.closeOverlay();
                      } else {
                        state.removeTodos(
                          (t) => t.categoryId === state.selectedCategoryId
                        );
                        state.closeOverlay();
                      }
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            },
          },
        ],
      },
    ],
  });
};

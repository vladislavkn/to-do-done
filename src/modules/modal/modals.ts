import {
  Category,
  ModalButton,
  ModalButtonGroup,
  ModalState,
  State,
  Todo,
} from "../../types";
import useStore from "../app/store";
import {
  formatTime,
  generateId,
  createDate,
  formatDuration,
  showConfirmationAlert,
} from "../../utils";
import { endTimeSelector } from "../app/selectors";
import { useModalStore } from "./store";

export const createTimeButtonGroup = (
  pop: ModalState["pop"]
): ModalButtonGroup => ({
  selectable: true,
  name: "time",
  buttons: [
    ...[10, 20, 30, 60, 120, 180].map((num) => {
      num = num * 60 * 1000;
      const text = formatDuration(num);
      return {
        text,
        onPress: (modal, update, group) => {
          const isAlreadySelected = modal.value.duration === num;
          modal.value.duration = isAlreadySelected ? null : num;
          group.selected = isAlreadySelected ? "" : text;
          update(modal);
        },
      } as ModalButton;
    }),
    {
      text: "Custom",
      onPress(modal, update, group) {
        showUpdateTimeModal((time) => {
          group.selected = "Custom";
          modal.value.duration = time;
          update(modal);
          // @ts-ignore
          modal !== undefined && modal.submit(modal, update);
        });
      },
    },
  ],
});

export const createCategoriesGroup = (
  categories: Category[]
): ModalButtonGroup => ({
  selectable: true,
  name: "categories",
  buttons: categories.map((category) => ({
    text: category.name,
    onPress: (modal, update, group) => {
      const isAlreadySelected = modal.value.categoryId === category.id;
      modal.value.categoryId = isAlreadySelected ? null : category.id;
      group.selected = isAlreadySelected ? "" : category.name;
      update(modal);
    },
  })),
});

export const showAddTodoModal = (today = false) => {
  const state = useStore.getState();
  const modalState = useModalStore.getState();
  if (!today && state.categories.length === 0) {
    alert("First create at least one category.");
    return;
  }

  modalState.push({
    placeholder: "New todo",
    inputType: "text",
    autoFocus: true,
    submit(modal) {
      if (modal.value.text.trim().length > 0) {
        const todo = {
          title: modal.value.text,
          done: false,
          id: generateId(),
          from: endTimeSelector(state),
          duration: modal.value.duration ?? 0,
          categoryId:
            modal.value.categoryId ?? (!today ? state.selectedCategoryId : ""),
          time: "",
          today,
        } as Todo;
        todo.time = formatTime(todo.from, todo.duration);

        state.addTodo(todo);
        modalState.pop();
      }
    },
    buttonGroups: [
      state.screen === "TodayTodoListPage" &&
        createTimeButtonGroup(modalState.pop),
      state.categories.length > 0 &&
        state.screen === "TodayTodoListPage" &&
        createCategoriesGroup(state.categories),
    ],
  });
};

export const showEditTodoModal = (todo: Todo) => {
  const state: State = useStore.getState();
  const modalState = useModalStore.getState();

  modalState.push({
    placeholder: "Todo text",
    initialValue: { text: todo.title },
    inputType: "text",
    submit(modal) {
      if (modal.value.text.trim().length > 0) {
        todo.title = modal.value.text;
        if (modal.value.duration) {
          todo.duration = modal.value.duration;
          todo.time = formatTime(todo.from, todo.duration);
        }
        if (modal.value.categoryId) {
          todo.categoryId = modal.value.categoryId;
        }
        state.updateTodo(todo);
        modalState.pop();
      }
    },
    buttonGroups: [
      createTimeButtonGroup(modalState.pop),
      state.categories.length > 0 && createCategoriesGroup(state.categories),
      {
        selectable: false,
        name: "actions",
        buttons: [
          {
            text: "Change time",
            iconProps: {
              name: "time",
              width: 12,
              height: 12,
            },
            onPress() {
              showUpdateTimeModal((time) => {
                todo.from = time;
                todo.time = formatTime(todo.from, todo.duration);
                state.updateTodo(todo);
                modalState.pop();
              });
            },
          },

          {
            text: todo.today ? "Remove from today" : "Move to today",
            iconProps: {
              name: todo.today ? "remove" : "move",
              width: 12,
              height: 12,
            },
            onPress: () => {
              if (todo.categoryId.length > 0) {
                todo.today = !todo.today;
                state.updateTodo(todo);
                modalState.pop();
              } else {
                showConfirmationAlert(
                  "Remove task",
                  "That task has no category and will be removed.",
                  () => {
                    state.removeTodo(todo);
                    modalState.pop();
                  }
                );
              }
            },
          },
          {
            text: "Delete",
            iconProps: {
              name: "delete",
              width: 10,
              height: 12,
            },
            onPress() {
              state.removeTodo(todo);
              modalState.pop();
            },
          },
        ],
      },
    ],
  });
};

export const showUpdateTimeModal = (callback: (time: number) => void) => {
  const modalState = useModalStore.getState();

  modalState.push({
    inputType: "time",
    autoFocus: true,
    submit(modal) {
      if (modal.value.minutes.length > 0 || modal.value.hours.length > 0) {
        const date = createDate(modal.value.hours, modal.value.minutes);
        modalState.pop();
        callback(date.getTime());
      }
    },
  });
};

export const showAddCategoryModal = () => {
  const modalState = useModalStore.getState();
  const state = useStore.getState();

  modalState.push({
    inputType: "text",
    placeholder: "New category",
    autoFocus: true,
    submit(modal) {
      if (modal.value.text.trim().length > 0) {
        state.addCategory(modal.value.text);
        modalState.pop();
      }
    },
  });
};

export const showEditCategoryModal = (category: Category) => {
  const state = useStore.getState();
  const modalState = useModalStore.getState();

  modalState.push({
    inputType: "text",
    placeholder: "Category name",
    initialValue: { text: category.name },
    submit(modal) {
      if (modal.value.text.trim().length > 0) {
        category.name = modal.value.text;
        state.updateCategory(category);
        modalState.pop();
      }
    },
    buttonGroups: [
      {
        name: "actions",
        selectable: false,
        buttons: [
          {
            text: "Delete",
            iconProps: {
              name: "delete",
              width: 12,
              height: 12,
            },
            onPress() {
              state.removeCategory(category);
              modalState.pop();
            },
          },
        ],
      },
    ],
  });
};

export const showOptionsModal = () => {
  const state = useStore.getState();
  const modalState = useModalStore.getState();

  modalState.push({
    inputType: "none",
    buttonGroups: [
      {
        selectable: false,
        name: "actions",
        buttons: [
          {
            text: "Remove done tasks",
            onPress: () =>
              showConfirmationAlert(
                "Remove done tasks",
                "Remove all completed tasks? You will not be able to restore them.",
                () => {
                  state.removeTodos(
                    (t) =>
                      (state.screen === "TodayTodoListPage"
                        ? t.today
                        : t.categoryId === state.selectedCategoryId) && t.done
                  );
                  modalState.pop();
                }
              ),
          },
          {
            text: "Remove All tasks",
            onPress: () =>
              showConfirmationAlert(
                "Remove all tasks",
                "Remove all tasks? You will not be able to restore them.",
                () => {
                  state.removeTodos((t) =>
                    state.screen === "TodayTodoListPage"
                      ? t.today
                      : t.categoryId === state.selectedCategoryId
                  );
                  modalState.pop();
                }
              ),
          },
        ],
      },
    ],
  });
};

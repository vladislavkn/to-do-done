import { State, Todo } from "./types";
import useStore from "./store";
import { createTodo, timeButtonGroup, formatTime } from "./utils";
import { endTimeSelector } from "./store/selectors";

export const showAddTodoOverlay = () => {
  const state = useStore.getState();

  state.openOverlay({
    placeholder: "New todo",
    inputType: "text",
    submit({ payload }) {
      if (payload.value.text.length > 0) {
        const todo: Todo = createTodo(
          {
            title: payload.value.text,
            duration: payload?.duration ?? 0,
            categoryId: payload?.categoryId ?? state.selectedCategoryId,
          },
          endTimeSelector(state)
        );
        state.addTodo(todo);
        state.closeOverlay();
      }
    },
    buttonsGroups: [timeButtonGroup],
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
        state.updateTodo(todo);
        state.closeOverlay();
      }
    },
    buttonsGroups: [
      timeButtonGroup,
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
    submit({ payload }) {
      if (payload.value.minutes.length > 0 && payload.value.hours.length > 0) {
        const date = new Date();
        date.setHours(parseInt(payload.value.hours));
        date.setMinutes(parseInt(payload.value.minutes));
        callback(date.getTime());
        state.closeOverlay();
      }
    },
  });
};

export const showAddCategoryOverlay = () => {
  const state: State = useStore.getState();

  state.openOverlay({
    inputType: "text",
    placeholder: "New Category",
    submit({ payload }) {
      if (payload.value.text.length > 0) {
        state.addCategory(payload.value.text);
        state.closeOverlay();
      }
    },
  });
};

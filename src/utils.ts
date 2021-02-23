import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Overlay, State, Todo, ArrayElement } from "./types";
import { endTimeSelector } from "./store/selectors";

export const generateId = () => nanoid();

export const getFormattedDate = (): string => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][currentDate.getMonth()];
  const currentWeekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][currentDate.getDay()];

  return `${currentDay} of ${currentMonth}, ${currentWeekday}`;
};

const secToMs = (seconds: number) => seconds * 1000;
const msToSec = (milliseconds: number) => milliseconds / 1000;
const minsToMs = (mins: number) => secToMs(mins * 60);

const formatDuration = (duration: number) => {
  const durationHours = Math.floor(msToSec(duration) / 3600),
    durationMinutes = Math.floor((msToSec(duration) % 3600) / 60);
  return `${durationHours > 0 ? `${durationHours}h` : ""}${
    durationMinutes > 0 ? ` ${durationMinutes} min` : ""
  }`;
};

const formatTime = (from: number, duratuion: number) => {
  if (!!!from || !!!duratuion) return "";
  const fromDate = new Date(from),
    toDate = new Date(from + duratuion),
    fromHours = fromDate.getHours(),
    fromMinutes = fromDate.getMinutes(),
    toHours = toDate.getHours(),
    toMinutes = toDate.getMinutes();

  return `${formatDuration(duratuion)} | ${fromHours}:${
    fromMinutes < 10 ? "0" : ""
  }${fromMinutes}-${toHours}:${toMinutes < 10 ? "0" : ""}${toMinutes}`;
};

const createTodo = (todo: Partial<Todo>, state: State) => {
  const endTime = endTimeSelector(state);
  const newTodo = {
    done: false,
    duration: 0,
    category: "daily",
    id: generateId(),
    from: endTime,
    ...todo,
  } as Todo;
  newTodo.time = formatTime(newTodo.from, newTodo.duration);

  state.addTodo(newTodo);
};

const timeButtonGroup: ArrayElement<Overlay["buttonsGroups"]> = {
  selectable: true,
  buttons: [5, 10, 20, 30, 40, 60, 70, 80, 90, 120, 180].map((num) => {
    num = minsToMs(num);
    return {
      buttonText: formatDuration(num),
      fn: ({ setPayload, payload }) =>
        setPayload({ duration: payload?.duration === num ? null : num }),
    };
  }),
};

export const showCreateTodoOverlay = (state: State, category = "daily") => {
  state.openOverlay({
    placeholder: "New todo",
    inputType: "text",
    submit({ payload, closeOverlay }) {
      if (payload.value.text.length > 0) {
        createTodo(
          {
            title: payload.value.text,
            duration: payload?.duration ?? 0,
            category,
          },
          state
        );
        closeOverlay();
      }
    },
    buttonsGroups: [timeButtonGroup],
  });
};

export const showEditTodoOverlay = (todo: Todo, state: State) => {
  state.openOverlay({
    placeholder: "Todo text",
    initialValue: { text: todo.title },
    inputType: "text",
    submit({ payload, closeOverlay }) {
      if (payload.value.text.length > 0) {
        todo.title = payload.value.text;
        if (payload.duration) {
          todo.duration = payload.duration;
          todo.time = formatTime(todo.from, todo.duration);
        }
        state.updateTodo(todo);
        closeOverlay();
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
            fn({ closeOverlay }) {
              showUpdateTimeOverlay((time) => {
                todo.from = time;
                todo.time = formatTime(todo.from, todo.duration);
                state.updateTodo(todo);
                closeOverlay();
              }, state);
            },
          },
          {
            buttonText: "Delete",
            iconProps: {
              name: "delete",
              width: 10,
              height: 12,
            },
            fn({ closeOverlay }) {
              state.removeTodo(todo);
              closeOverlay();
            },
          },
        ],
      },
    ],
  });
};

const showUpdateTimeOverlay = (
  callback: (time: number) => void,
  state: State
) =>
  state.openOverlay({
    inputType: "time",
    submit({ payload, closeOverlay }) {
      if (payload.value.minutes.length > 0 && payload.value.hours.length > 0) {
        const date = new Date();
        date.setHours(parseInt(payload.value.hours));
        date.setMinutes(parseInt(payload.value.minutes));
        callback(date.getTime());
        closeOverlay();
      }
    },
  });

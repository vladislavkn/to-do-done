import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Overlay, Todo, ArrayElement, Category } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveJSONValue = async (name: string, obj: {}) =>
  await AsyncStorage.setItem(name, JSON.stringify(obj));

export const sortTodos = (todos: Todo[]): Todo[] =>
  todos.sort((a: Todo, b: Todo) => a.from - b.from);

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

export const formatTime = (from: number, duratuion: number) => {
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

export const createTodo = (todo: Partial<Todo>, endTime: number) => {
  const newTodo = {
    done: false,
    duration: 0,
    id: generateId(),
    from: endTime,
    today: todo?.today ?? false,
    ...todo,
  } as Todo;
  newTodo.time = formatTime(newTodo.from, newTodo.duration);

  return newTodo;
};

export const timeButtonGroup: ArrayElement<Overlay["buttonsGroups"]> = {
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

export const createCategoriesGroup = (
  categories: Category[]
): ArrayElement<Overlay["buttonsGroups"]> => ({
  selectable: true,
  buttons: categories.map((category) => ({
    buttonText: category.name,
    fn: ({ setPayload, payload }) => {
      setPayload({
        categoryId: payload?.categoryId === category.id ? null : category.id,
      });
    },
  })),
});

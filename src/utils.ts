import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
  Overlay,
  Todo,
  ArrayElement,
  Category,
  OverlayButtonGroup,
} from "./types";
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

export const timeButtonGroup: OverlayButtonGroup = {
  selectable: true,
  buttons: [5, 10, 20, 30, 60, 90, 120, 150, 180, 210].map((num) => {
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
): OverlayButtonGroup => ({
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

import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Todo, Category, ModalButtonGroup, ModalButton } from "./types";

export const sortTodos = (todos: Todo[]): Todo[] =>
  todos.sort((a: Todo, b: Todo) => a.from - b.from);

export const generateId = nanoid;

const months = [
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
];

const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const getFormattedDate = (): string => {
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const currentWeekday = weekDays[currentDate.getDay()];

  return `${currentDate.getDate()} of ${currentMonth}, ${currentWeekday}`;
};

export const formatDuration = (duration: number) => {
  const durationHours = Math.floor(duration / 1000 / 3600),
    durationMinutes = Math.floor(((duration / 1000) % 3600) / 60);
  return `${durationHours > 0 ? `${durationHours}h` : ""}${
    durationMinutes > 0 ? ` ${durationMinutes} min` : ""
  }`;
};

export const formatTime = (from: number, duratuion: number) => {
  if (from <= 0 || duratuion <= 0) return "";

  const fromDate = new Date(from),
    endDate = new Date(from + duratuion),
    fromHours = fromDate.getUTCHours(),
    fromMinutes = fromDate.getUTCMinutes(),
    endHours = endDate.getUTCHours(),
    endMinutes = endDate.getUTCMinutes(),
    durationString = duratuion > 0 ? formatDuration(duratuion) : "",
    timeStartString = `${fromHours}:${
      fromMinutes < 10 ? "0" : ""
    }${fromMinutes}`,
    timeEndString = `${endHours}:${endMinutes < 10 ? "0" : ""}${endMinutes}`;

  return `${durationString} | ${timeStartString}-${timeEndString}`;
};

export const createDate = (hours: number, minutes: number) => {
  const date = new Date(0);
  date.setUTCHours(hours, minutes);
  return date;
};

export const getCurrentHoursAndMinutes = () => {
  const date = new Date();
  return createDate(date.getUTCHours(), date.getUTCMinutes());
};

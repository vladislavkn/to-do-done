import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Todo, Category, OverlayButtonGroup } from "./types";

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

const formatDuration = (duration: number) => {
  const durationHours = Math.floor(duration / 1000 / 3600),
    durationMinutes = Math.floor(((duration / 1000) % 3600) / 60);
  return `${durationHours > 0 ? `${durationHours}h` : ""}${
    durationMinutes > 0 ? ` ${durationMinutes} min` : ""
  }`;
};

export const formatTime = (from: number, duratuion: number) => {
  if (from <= 0 && duratuion <= 0) return "";

  const fromDate = new Date(from),
    toDate = new Date(from + duratuion),
    fromHours = fromDate.getUTCHours(),
    fromMinutes = fromDate.getUTCMinutes(),
    toHours = toDate.getUTCHours(),
    toMinutes = toDate.getUTCMinutes(),
    durationString = duratuion > 0 ? formatDuration(duratuion) : "",
    timeStartString =
      from > 0
        ? `${fromHours}:${fromMinutes < 10 ? "0" : ""}${fromMinutes}`
        : "",
    timeEndString =
      from > 0 && duratuion > 0
        ? `${toHours}:${toMinutes < 10 ? "0" : ""}${toMinutes}`
        : "";

  if (from > 0 && duratuion > 0)
    return `${durationString} | ${timeStartString}-${timeEndString}`;
  if (duratuion > 0) return durationString;
  return timeStartString;
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

export const timeButtonGroup: OverlayButtonGroup = {
  selectable: true,
  buttons: [5, 10, 20, 30, 60, 90, 120, 150, 180, 210].map((num) => {
    num = num * 60 * 1000;
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

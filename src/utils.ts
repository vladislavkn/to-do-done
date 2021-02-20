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

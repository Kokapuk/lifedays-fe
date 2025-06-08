import { Dayjs } from 'dayjs';
import { Weekday } from './dayjsConstants';

const getMonthViewDays = (date: Dayjs) => {
  const firstDayOfTheMonth = date.set('date', 1);
  const firstWeekdayOfTheMonth = firstDayOfTheMonth.get('d');
  let firstMonday: Dayjs;

  if (firstWeekdayOfTheMonth === Weekday.MONDAY) {
    firstMonday = firstDayOfTheMonth;
  } else {
    const daysToPastMonday = firstWeekdayOfTheMonth === Weekday.SUNDAY ? 6 : firstWeekdayOfTheMonth - 1;
    firstMonday = firstDayOfTheMonth.subtract(daysToPastMonday, 'day');
  }

  const lastDayOfTheMonth = date.set('date', date.daysInMonth());
  const lastWeekdayOfTheMonth = lastDayOfTheMonth.get('d');
  let lastSunday: Dayjs;

  if (lastWeekdayOfTheMonth === Weekday.SUNDAY) {
    lastSunday = lastDayOfTheMonth;
  } else {
    const daysToNextSunday = 7 - lastWeekdayOfTheMonth;
    lastSunday = lastDayOfTheMonth.add(daysToNextSunday, 'day');
  }

  const days: Dayjs[] = [];

  for (let day = firstMonday; !day.isAfter(lastSunday, 'd'); day = day.add(1, 'day')) {
    days.push(day);
  }

  return days;
};

export default getMonthViewDays;

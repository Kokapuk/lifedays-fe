import { Weekday } from '@utils/dayjsConstants';
import cn from 'classnames';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import styles from './MonthView.module.scss';

interface Props {
  date: Dayjs;
}

const DAYS_ORDER = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
  Weekday.SUNDAY,
];

const MonthView = ({ date }: Props) => {
  const days = useMemo<Dayjs[]>(() => {
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
  }, [date]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.weekdays}>
        {DAYS_ORDER.map((day) => (
          <p key={day} className={styles.weekday}>
            {date.set('d', day).format('ddd')}
          </p>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day) => (
          <div key={day.toISOString()} className={cn(styles.cell, !day.isSame(date, 'month') && styles.otherMonth)}>
            {day.format('DD')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;

import Event, { EventProps } from '@components/Event';
import ShowMore from '@components/ShowMore';
import { Weekday } from '@utils/dayjsConstants';
import eventColorPalette from '@utils/eventColorPalette';
import getMonthViewDays from '@utils/getMonthViewDays';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import styles from './MonthView.module.scss';

export interface MonthViewProps {
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

const TEST_EVENTS: EventProps[] = [
  { color: eventColorPalette.rose, date: dayjs().toDate(), title: 'Event name 1' },
  { color: eventColorPalette.orange, date: dayjs().add(1, 'd').toDate(), title: 'Event name 2' },
  { color: eventColorPalette.green, date: dayjs().add(1, 'w').toDate(), title: 'Event name 3' },
  { color: eventColorPalette.blue, date: dayjs().add(2, 'w').toDate(), title: 'Event name 5' },
  { color: eventColorPalette.purple, date: dayjs().add(2, 'w').add(1, 'd').toDate(), title: 'Event name 4' },
];

const MonthView = ({ date }: MonthViewProps) => {
  const days = useMemo<Dayjs[]>(() => getMonthViewDays(date), [date]);

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
          <div
            key={day.toISOString()}
            className={cn(
              styles.cell,
              !day.isSame(date, 'month') && styles.otherMonth,
              day.isSame(new Date(), 'd') && styles.today
            )}
          >
            <label className={styles.date}>{day.format('DD')}</label>

            <ShowMore
              items={TEST_EVENTS.slice(0, Math.round(Math.random() * TEST_EVENTS.length))}
              renderItem={(i) => <Event key={i.title} {...i} />}
              renderMoreTrigger={(count) => <h3>+{count} more</h3>}
              direction="column"
              gap={4}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;

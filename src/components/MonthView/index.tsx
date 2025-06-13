import Event from '@components/Event';
import ShowMore from '@components/ShowMore';
import { CalendarStore } from '@stores/calendar';
import { Weekday } from '@utils/dayjsConstants';
import eventColorPalette from '@utils/eventColorPalette';
import getMonthViewDays from '@utils/getMonthViewDays';
import { Event as EventType } from '@utils/types';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import styles from './MonthView.module.scss';

const DAYS_ORDER = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
  Weekday.SUNDAY,
];

export interface MonthViewProps {
  date: Dayjs;
  events: CalendarStore['events'];
}

const MonthView = ({ date, events }: MonthViewProps) => {
  const days = useMemo<Dayjs[]>(() => getMonthViewDays(date), [date]);

  const getEventsByDay = (day: Dayjs): EventType[] => {
    const matchingDay = Object.keys(events).find((eventDay) => day.isSame(eventDay, 'd'));

    if (!matchingDay) {
      return [];
    }

    return events[matchingDay];
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.weekdays}>
        {DAYS_ORDER.map((day) => (
          <p key={day} className={styles.weekday}>
            {dayjs(date).set('d', day).format('ddd')}
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
              items={getEventsByDay(day)}
              renderItem={(i) => (
                <Event key={i.title} date={i.date} color={eventColorPalette[i.color]} title={i.title} />
              )}
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

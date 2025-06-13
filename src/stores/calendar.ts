import { CalendarViewObject, Event } from '@utils/types';
import dayjs from 'dayjs';
import { create } from 'zustand';

export interface CalendarStore {
  calendarView: CalendarViewObject<'month'> | CalendarViewObject<'schedule'>;
  events: Record<string, Event[]>;
}

const useCalendarStore = create<CalendarStore>()(() => ({
  calendarView: { mode: 'month', date: dayjs() },
  // calendarView: {
  //   mode: 'schedule',
  //   startDate: dayjs(),
  //   // endDate: dayjs(),
  //   // endDate: dayjs().add(1, 'w'),
  //   // endDate: dayjs().add(1, 'M'),
  //   endDate: dayjs().add(14, 'month'),
  // },
  events: {
    [dayjs().subtract(1, 'd').toISOString()]: [
      {
        _id: '0',
        color: 'red',
        date: dayjs().subtract(1, 'd').toDate(),
        repeat: 'never',
        title: 'Absurdly long event title to test ellipsis',
      },
      {
        _id: '0',
        color: 'amber',
        date: dayjs().subtract(1, 'd').add(1, 'h').toDate(),
        repeat: 'never',
        title: 'Test event 2',
      },
    ],
    [dayjs().toISOString()]: [
      {
        _id: '0',
        color: 'indigo',
        date: dayjs().toDate(),
        repeat: 'never',
        title: 'Test event 3',
      },
    ],
  },
}));

export default useCalendarStore;

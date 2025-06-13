import { Dayjs } from 'dayjs';
import eventColorPalette from './eventColorPalette';

export type EventRepeat = 'never' | 'daily' | 'weekly' | 'annually';

export interface Event {
  _id: string;
  title: string;
  date: Date;
  repeat: EventRepeat;
  color: keyof typeof eventColorPalette;
}

export type CalendarViewMode = 'month' | 'schedule';

export type CalendarViewObject<T extends CalendarViewMode> = T extends 'month'
  ? {
      mode: T;
      date: Dayjs;
    }
  : T extends 'schedule'
  ? {
      mode: T;
      startDate: Dayjs;
      endDate: Dayjs;
    }
  : never;

export type AnyCalendarViewObject = CalendarViewObject<'month'> | CalendarViewObject<'schedule'>;

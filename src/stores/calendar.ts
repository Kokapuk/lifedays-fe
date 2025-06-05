import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

export interface CalendarStore {
  date: Dayjs;
}

const useCalendarStore = create<CalendarStore>()(() => ({
  date: dayjs(),
}));

export default useCalendarStore;

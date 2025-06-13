import Header from '@components/Header';
import MonthView from '@components/MonthView';
import Sidebar from '@components/Sidebar';
import useCalendarStore from '@stores/calendar';
import styles from './Calendar.module.scss';

const Calendar = () => {
  const { calendarView, events } = useCalendarStore();

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header calendarView={calendarView} />
        <main className={styles.main}>
          {calendarView.mode === 'month' && <MonthView date={calendarView.date} events={events} />}
        </main>
      </div>
    </div>
  );
};

export default Calendar;

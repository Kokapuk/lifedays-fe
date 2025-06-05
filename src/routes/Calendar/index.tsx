import Header from '@components/Header';
import MonthView from '@components/MonthView';
import Sidebar from '@components/Sidebar';
import useCalendarStore from '@stores/calendar';
import styles from './Calendar.module.scss';

const Calendar = () => {
  const { date } = useCalendarStore();

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <main className={styles.main}>
          <MonthView date={date} />
        </main>
      </div>
    </div>
  );
};

export default Calendar;

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import styles from './Calendar.module.scss';

const Calendar = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <main className={styles.main}></main>
      </div>
    </div>
  );
};

export default Calendar;

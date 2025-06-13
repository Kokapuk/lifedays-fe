import DisplayCalendarView from '@components/DisplayCalendarView';
import { AnyCalendarViewObject } from '@utils/types';
import styles from './Header.module.scss';

interface Props {
  calendarView: AnyCalendarViewObject;
}

const Header = ({ calendarView }: Props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.viewMode}>
        <DisplayCalendarView calendarView={calendarView} />
      </h1>
    </header>
  );
};

export default Header;

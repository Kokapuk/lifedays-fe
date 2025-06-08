import dayjs from 'dayjs';
import { CSSProperties } from 'react';
import styles from './Event.module.scss';
import { EventColor } from '@utils/eventColorPalette';

export interface EventProps {
  title: string;
  date: Date;
  color: EventColor;
}

const Event = ({ title, date, color }: EventProps) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--bgColor': color.background, '--fgColor': color.foreground } as CSSProperties}
    >
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.time}>{dayjs(date).format('HH:mm')}</p>
    </div>
  );
};

export default Event;

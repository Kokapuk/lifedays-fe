import { AnyCalendarViewObject } from '@utils/types';

interface Props {
  calendarView: AnyCalendarViewObject;
}

const DisplayCalendarView = ({ calendarView }: Props) => {
  return (
    <>
      {calendarView.mode === 'month' && (
        <>
          <b>{calendarView.date.format('MMMM')}</b> {calendarView.date.format('YYYY')}
        </>
      )}
      {calendarView.mode === 'schedule' &&
        (calendarView.startDate.isSame(calendarView.endDate, 'day') ? (
          <>
            <b>{calendarView.startDate.format('DD MMMM')}</b> {calendarView.startDate.format('YYYY')}
          </>
        ) : calendarView.startDate.isSame(calendarView.endDate, 'month') ? (
          <>
            <b>
              {calendarView.startDate.format('DD')} - {calendarView.endDate.format('DD MMMM')}
            </b>{' '}
            {calendarView.startDate.format('YYYY')}
          </>
        ) : calendarView.startDate.isSame(calendarView.endDate, 'y') ? (
          <>
            <b>
              {calendarView.startDate.format('DD MMMM')} - {calendarView.endDate.format('DD MMMM')}
            </b>{' '}
            {calendarView.startDate.format('YYYY')}
          </>
        ) : (
          <>
            <b>
              {calendarView.startDate.format('DD MMMM YYYY')} - {calendarView.endDate.format('DD MMMM YYYY')}
            </b>
          </>
        ))}
    </>
  );
};

export default DisplayCalendarView;

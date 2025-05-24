import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'CS101 Attendance',
    start: new Date(2023, 5, 25, 10, 0),
    end: new Date(2023, 5, 25, 11, 0),
  },
  {
    title: 'Faculty Meeting',
    start: new Date(2023, 5, 26, 14, 0),
    end: new Date(2023, 5, 26, 15, 30),
  },
];

const CalendarView = () => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
);

export default CalendarView;
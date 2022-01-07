import Calendar from "react-calendar";
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/MyCalendar.module.css';


export default function MyCalendar() {
  const [value, onChange] = useState(new Date());
  return (
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-SG"
        className="mt-3 rounded-3"
      />
  )
}
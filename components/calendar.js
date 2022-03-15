import Calendar from "react-calendar";
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/MyCalendar.module.css';


export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  function handleDateClick(value, event){
      alert('Clicked day: '+ value)
  }
  return (
      <div className={styles.wrapper}>
          <Calendar
              onChange={onChange}
              value={value}
              locale="en-SG"
              className={`mt-3 rounded-3 mx-auto ${styles.calendar }`}
              onClickDay={handleDateClick}
          />
      </div>
  )
}
import TodoBox from "./todoBox";
import {useState} from "react";
import Calendar from "react-calendar";
import {getCurrentDateTimeLocal} from "../../tools/helper";
import 'react-calendar/dist/Calendar.css';
import styles from "../../styles/MyCalendar.module.css";


export default function TodoWithCalendar(){

    const [calendarDate, setCalendarDate] = useState(new Date());
    const [todoDate, setTodoDate] = useState(getCurrentDateTimeLocal());


    function parseToDatetimeLocalFormat(value) {
        let year = value.getFullYear()
        let month = value.getMonth()+1
        let day = value.getDate()
        let hour = value.getHours()
        let minute = value.getMinutes()

        console.debug("Date changed")

        return `${year}-${month}-${day}T${hour}:${minute}`
    }

    function handleDateClick(value, event){
        const date = parseToDatetimeLocalFormat(value)
        setTodoDate(date)
    }
    return (
        <>
            <div className={styles.wrapper}>
                <Calendar
                    onChange={setCalendarDate}
                    value={calendarDate}
                    locale="en-SG"
                    className={`mt-3 rounded-3 mx-auto ${styles.calendar }`}
                    onClickDay={handleDateClick}
                />
            </div>
            <TodoBox date={todoDate}/>
        </>
    )
}
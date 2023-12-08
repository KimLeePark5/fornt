import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react";
import {ko} from 'date-fns/esm/locale'
import {useRef} from "react";

function AttendCalender({myAttend: {responseAttend}}) {
    console.log("12312312312", responseAttend)
    const cal = useRef();
    const attcal = (responseAttend) => {
        const arr = []
        responseAttend.map(attend => arr.push({
            title: attend.leaveTime != null ? attend.leaveTime : '출근중..',
            date: attend.attendDate,
            color: ''
        }))
        responseAttend.map(attend => arr.push({
            title: attend.enterTime,
            date: attend.attendDate,
            color: attend.note == '지각' ? 'white' : 'white',
            backgroundColor: attend.note == '지각' ? '#FFB2B2' : '#929292'
        }))
        return arr
    }

    return (
        <>
            {responseAttend &&
                <div >
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        locale={ko}
                        events={attcal(responseAttend)}
                        ref={cal}
                        datesSet={(info)=>{
                            console.log(info)
                    }}
                    />
                </div>
            }
        </>
    )
}

export default AttendCalender;
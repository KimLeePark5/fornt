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
            title: attend.note=='결근'? null : attend.note=='휴가'? null :attend.leaveTime != null ? attend.leaveTime : null,
            date: attend.note=='결근'? null : attend.note=='휴가'? null : attend.attendDate,
            textColor:'white',
            backgroundColor : attend.note=='결근'? 'white' : attend.note=='휴가'? 'white' :attend.leaveTime != null ? 'green' : 'white',
            color:'white'
        }))
        responseAttend.map(attend => arr.push({
            title: attend.note=='결근'? '결근' : attend.note=='휴가'? '휴가' : attend.enterTime,
            date: attend.attendDate,
            textColor: attend.note == '지각' ? 'red' : 'white',
            color:'white',
            backgroundColor: attend.note=='결근'? '#c20000' : attend.note == '지각' ? '#FFB2B2' : attend.note=='휴가' ? '#2a50ae' : attend.enterTime ? '#262065' : 'white'
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
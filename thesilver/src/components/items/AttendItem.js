import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetAttendResultAPI} from "../../apis/AttendAPICalls";

function AttendItem(){
    const date = new Date();
    const today = date.getFullYear() +'-'+ (String(date.getMonth()+1).length == 1 ? '0'+date.getMonth()+1 : date.getMonth()+1) ;
    const [month, setMonth] = useState(today)
    const {myAttend} = useSelector(state => state.attendReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(callGetAttendResultAPI({month : month}));
        console.log(myAttend);
    }, [month]);
        const monthChangeHandler = (e) => {
            setMonth(e.target.value)
        }

    return(
        <>근무정보나오는곳
            <input type="month" onChange={monthChangeHandler}/>
            { myAttend &&
            <div>
                지각 : {myAttend.responseAttendType.lateCount}
                결근 : {myAttend.responseAttendType.absentCount}
                조퇴 : {myAttend.responseAttendType.leaveEarlyCount}
                휴가 : {myAttend.responseAttendType.vacationCount}
                출근일수 : {myAttend.responseAttendType.lateCount}
                근무시간 : {myAttend.responseAttendType.totalAttendTime}
            </div>}
        </>

    )
}
export default AttendItem;
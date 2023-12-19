
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetAttendResultAPI} from "../../../apis/AttendAPICalls";
import AttendCalender from "./AttendCalender";
import AttendItems from "./AttendItems";
import MyAttend from "../../../pages/MyAttend";

function AttendItem() {
    const date = new Date();
    const month1 = useRef(Number(date.getMonth() + 1));
    const year1 = useRef(Number(date.getFullYear()));
    const today = year1.current + '-' + (String(month1.current).length == 1 ? '0' + month1.current : month1.current);
    const inputmonth = useRef();

    const monthChangeHandler = (e) => {
        setMonth(e.target.value)
    }
    const onClickUpHandler = () => {
        if (month1.current == 1) {
            year1.current = year1.current - 1
            month1.current = 12;
        } else (month1.current = month1.current - 1)

        setMonth(year1.current + '-' + (String(month1.current).length == 1 ? '0' + month1.current : month1.current))
    }
    const onClickDownHandler = () => {

        if (month1.current == 12) {
            year1.current = year1.current + 1
            month1.current = 1
        } else (month1.current = month1.current + 1)
        setMonth(year1.current + '-' + (String(month1.current).length == 1 ? '0' + month1.current : month1.current))
    }

    const abscount = useRef();
    const latecount = useRef();
    const vaccount = useRef();
    const leaveEcount = useRef();

    const [month, setMonth] = useState('2023-12')
    const {myAttend} = useSelector(state => state.attendReducer);

    const dispatch = useDispatch();


    const {enterSuccess, leaveSucess} = useSelector(state => state.attendReducer)
    useEffect(() => {
        dispatch(callGetAttendResultAPI({month: month}));
        console.log('myAttend : ', myAttend);
    }, [month, enterSuccess, leaveSucess]);
    const getAbsentdate = (type) => {
        const absDate = [];
        const leaveDate = [];
        const vacDate = [];
        const lateDate = [];
        myAttend.responseAttend.map(at => {
            if (at.note == '결근') {
                absDate.push(<div>{String(at.attendDate).substring(5)}</div>);
            } else if (at.note == '지각') {
                lateDate.push(<div>{String(at.attendDate).substring(5)}</div>);

            } else if (at.note == '휴가') {
                vacDate.push(<div>{String(at.attendDate).substring(5)}</div>);

            } else if (at.note == '조퇴') {
                leaveDate.push(<div>{String(at.attendDate).substring(5)}</div>);
            }
        })
        switch (type) {
            case 'abs' :
                return absDate;
                break;
            case 'vac' :
                return vacDate;
                break;
            case 'leaveE' :
                return leaveDate;
                break;
            case 'late' :
                return lateDate;
                break;
        }
    }

    const MouseOnHandler = (type) => {
        switch (type) {
            case 'abs' :
                if(abscount.current.children.length==0){return}
                abscount.current.style.display = 'block';
                break;
            case 'late' :
                if(latecount.current.children.length==0){return}
                latecount.current.style.display = 'block';
                break;
            case 'vac' :
                if(vaccount.current.children.length==0){return}
                vaccount.current.style.display = 'block';
                break;
            case 'leaveE' :
                if(leaveEcount.current.children.length==0){return}
                leaveEcount.current.style.display = 'block';
                break;
        }


    }
    const MouseLeaveHandler = (type) => {
        switch (type) {
            case 'abs' :
                abscount.current.style.display = 'none';
                break;
            case 'late' :
                latecount.current.style.display = 'none';
                break;
            case 'vac' :
                vaccount.current.style.display = 'none';
                break;
            case 'leaveE' :
                leaveEcount.current.style.display = 'none';
                break;

        }

    }

    const getDayof = (month) => {
        console.log(month.current)
        console.log("231321312331month")
        const date = new Date();

        let start =new Date(date.getFullYear(),month.current-1,1)
        let end = new Date(date.getFullYear(),start.getMonth()+1,0)
        console.log(end)
        console.log("start:",start)
        let now = new Date(date)
        let dayoff = 0;
        console.log("now",now)

        if(month.current-1 == date.getMonth()){
            for(let i = 1; start <= now; i++){
                if(start.getDay() == 0){
                    dayoff += 1
                }else if(start.getDay() == 6){
                    dayoff += 1
                }
                start.setDate(start.getDate()+1 )

            }
        }else{
            for(let i = 1; start <= end; i++){
                if(start.getDay() == 0){
                    dayoff += 1
                }else if(start.getDay() == 6){
                    dayoff += 1
                }
                start.setDate(start.getDate()+1 )

            }
        }

        console.log("dayoff",dayoff)
        return dayoff
    }
    return (
        <div className='attend-main'>
            <div className="attend-month">
                <div style={{height: '100%', lineHeight: 2}}>
                    <button onClick={onClickUpHandler} className="attend-btn">&lt;</button>
                    <input ref={inputmonth} type="month" onChange={monthChangeHandler} value={month} style={{
                        display: "none"
                    }}/>
                    <span>{inputmonth.current && (inputmonth.current.value).replace("-", "년 ")}월</span>
                    {console.log(month1.current, date.getMonth())}
                    {console.log("ddudududurl")}
                    <button disabled={month1.current-1 >= date.getMonth() ? true : false} onClick={onClickDownHandler} className="attend-btn">&gt;</button>
                </div>
            </div>
            {myAttend &&
                <div className="attend-detail-box">
                    <div>
                        <div className="detailname">근무시간</div>
                        <div className="detail-count attendTime">
                            {myAttend.responseAttendType.totalAttendTime}H
                        </div>
                    </div>
                    <div className="detailname">
                        <div className="attendhead">근무상세</div>
                        <div className="attend-detail">
                            <div>
                                <div className="detail-name">출근</div>
                                <div
                                    className="detail-count">{myAttend.responseAttend.length - myAttend.responseAttendType.absentCount - myAttend.responseAttendType.vacationCount-getDayof(month1) >=0 ? myAttend.responseAttend.length - myAttend.responseAttendType.absentCount - myAttend.responseAttendType.vacationCount-getDayof(month1) : 0+myAttend.responseAttend.length}</div>
                            </div>
                            <div className='testxxat'>
                                <div className="detail-name">결근</div>
                                <div className='absentDate' ref={abscount}>
                                    {getAbsentdate('abs')}
                                </div>
                                <div className="detail-count" onMouseOver={() => MouseOnHandler('abs')}
                                     onMouseLeave={() => MouseLeaveHandler('abs')}>{myAttend.responseAttendType.absentCount}</div>
                            </div>
                            <div className='testxxat'>
                                <div className="detail-name">조퇴</div>
                                <div className='absentDate' ref={leaveEcount}>
                                    {getAbsentdate('leaveE')}
                                </div>
                                <div className="detail-count" onMouseOver={() => MouseOnHandler('leaveE')}
                                     onMouseLeave={() => MouseLeaveHandler('leaveE')}>{myAttend.responseAttendType.leaveEarlyCount}</div>
                            </div>
                            <div className='testxxat'>
                                <div className="detail-name">지각</div>
                                <div className='absentDate' ref={latecount}>
                                    {getAbsentdate('late')}
                                </div>
                                <div className="detail-count" onMouseOver={() => MouseOnHandler('late')}
                                     onMouseLeave={() => MouseLeaveHandler('late')}>{myAttend.responseAttendType.lateCount}</div>
                            </div>
                            <div className='testxxat'>
                                <div className="detail-name">휴가</div>
                                <div className='absentDate' ref={vaccount}>
                                    {getAbsentdate('vac')}
                                </div>
                                <div className="detail-count" onMouseOver={() => MouseOnHandler('vac')}
                                     onMouseLeave={() => MouseLeaveHandler('vac')}>{myAttend.responseAttendType.vacationCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='calcon'>
            {myAttend && <AttendCalender myAttend={myAttend}/>}
            </div>
        </div>

    )
}


export default AttendItem;
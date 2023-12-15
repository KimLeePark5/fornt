import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {callEnterBtAPI, callLeaveBtAPI, callTodayAttendAPI} from "../../apis/AttendAPICalls";

function MainCommuteBt(){
    const {myAttend} = useSelector(state => state.attendReducer);
    const dispatch = useDispatch();
    const {todayAttend} = useSelector(state => state.attendReducer);
    const progress = useRef()
    const {enterSuccess,leaveSuccess}=useSelector(state  => state.attendReducer)
    useEffect(() => {
        dispatch(callTodayAttendAPI());
    }, [enterSuccess,leaveSuccess]);

    const onClickEnterBtHandler = () => {
        dispatch(callEnterBtAPI());
    }
    const onClickLeaveBtHandler = () => {
        dispatch(callLeaveBtAPI());
    }
    const getDay = () => {
        const day = date.getDay()
        const dayList = ["(월)", '(화)', '(수)', '(목)', '(금)', '(토)', '(일)'];
        return dayList[day - 1]
    }
    const date = new Date();
    const today = date.getMonth() + 1 + '월 ' + date.getDate() + '일' + getDay();

    const MakeDateForm = function (min) {
        const days = Math.floor(min / 60 / 24)
        const hours = Math.floor((min - (days * 60 * 24)) / 60);
        const mins = min - (days * 60 * 24) - (hours * 60);
        return hours + 'H ' + mins + 'M';
    }
    const getCurentWorkTime = (enterTime, leaveTime, attendDate) => {

        const dateA = new Date(attendDate + ' ' + enterTime);
        const dateC = new Date(attendDate + ' ' + leaveTime);
        const dateB = new Date();
        const dateE = new Date(attendDate + ' 09:00:00')
        const dateD = new Date(attendDate + ' 18:00:00');
        let workTime = 0;
        if (leaveTime == null) {
            workTime = parseInt((dateB - dateA.getTime()) / (1000 * 60));
        } else {
            workTime = parseInt((dateC.getTime() - dateA.getTime()) / (1000 * 60));
        }

        let total = dateD - dateE;
        let perc = dateB - dateE;
        console.log(total);
        console.log(perc);
        console.log(perc / total)
        const a = Math.round(perc / total * 100);
        console.log(progress.current)
        // progress.current.style.width=`${a}%`

        if (progress.current) {
            progress.current.style.width = `${a}%`
        }

        return (MakeDateForm(workTime));
    }


    // todayAttend && setInterval(getCurentWorkTime(todayAttend.enterTime, todayAttend.leaveTime,todayAttend.attendDate),1000);

    return (
        <div className='dhodksehla'>
            <div className="Main-commute-btn-box">
                <div className="attend-sub-menu">출/퇴근 관리</div>
                <div className="attend-sub-menu2">{today}</div>
                <p className="attend-sub-menu3 att33" style={{marginLeft:30,fontSize:16}}>근무 시간</p>
                {todayAttend ?
                    todayAttend.enterTime ? <>
                        <div className="attendContainer">
                            <div
                                className="attend-sub-menu3 att44">{getCurentWorkTime(todayAttend.enterTime, todayAttend.leaveTime, todayAttend.attendDate)}</div>
                            <div className="progress-bar">
                                <div className="progress" ref={progress} style={{}}></div>
                            </div>
                        </div>

                        <div className="attend-sub-menu3 attend-Time">출근시간
                            : {todayAttend.enterTime == null ? '미등록' : todayAttend.enterTime}</div>
                        <div className="attend-sub-menu3">퇴근시간
                            : {todayAttend.leaveTime ? todayAttend.leaveTime : "미등록"}</div>
                        {todayAttend.leaveTime ?
                            <button className="attend-button mainbtn" onClick={onClickEnterBtHandler}>출근</button> :
                            <button className="attend-button leaveBt mainbtn" onClick={onClickLeaveBtHandler}>퇴근</button>}
                    </> : <>
                        <p className="attend-sub-menu3" style={{
                            marginTop: "10px"
                        }}>0H 0M</p>
                        <div className="progress-bar"></div>
                        <p className="attend-sub-menu3" style={{fontSize: "15px", marginTop: "50px"}}>오늘의 출근 정보가
                            없습니다.</p>
                        <p className="attend-sub-menu3" style={{fontSize: "15px"}}>출근등록을 해주세요</p>
                        <button className="attend-button mainbtn" onClick={onClickEnterBtHandler}>출근</button>
                    </>


                    : ''


                }
            </div>

        </div>
    )
}
export default MainCommuteBt
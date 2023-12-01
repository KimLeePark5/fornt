import {useDispatch, useSelector} from "react-redux";
import {callEnterBtAPI, callLeaveBtAPI, callTodayAttendAPI} from "../../apis/AttendAPICalls";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";

function CommuteBt() {
    const {myAttend} = useSelector(state => state.attendReducer);
    const dispatch = useDispatch();
    const {todayAttend} = useSelector(state => state.attendReducer);


    useEffect(() => {
        dispatch(callTodayAttendAPI());
    }, []);

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

        return hours + '시간' + mins + '분';
    }
    const getCurentWorkTime = (enterTime,leaveTime) => {
        console.log(enterTime)
        console.log(leaveTime)
        const dateA = new Date('2023-11-30 ' + enterTime);
        const dateB = Date.now()
        const dateC = new Date('2023-11-30 '+leaveTime)
        let workTime = 0;
        if(leaveTime == null){
            workTime = parseInt((dateB - dateA.getTime()) / (1000 * 60));
        }else{
            workTime = parseInt((dateC.getTime() - dateA.getTime()) / (1000 * 60));
        }
        return (MakeDateForm(workTime));
    }


    return (
        <>
            <div className="commute-btn-box">
                <div className="attend-sub-menu">출/퇴근 관리</div>
                <div className="attend-sub-menu2">{today}</div>
                <p className="attend-sub-menu3">근무 시간</p>
                {todayAttend ?
                    <>
                        <p className="attend-sub-menu3" style={{
                            marginTop:"-10px"
                        }}>{getCurentWorkTime(todayAttend.enterTime, todayAttend.leaveTime)}</p>
                        <div className="progress-bar" style={{marginTop:"-13px"}}>
                            <div className="progress"> </div>
                        </div>
                        <div className="attend-sub-menu3 attend-Time">출근시간 : {todayAttend.enterTime}</div>
                        <div className="attend-sub-menu3">퇴근시간 : {todayAttend.leaveTime ? todayAttend.leaveTime : "미등록"}</div>
                        {todayAttend.leaveTime ? <button  className="attend-button" onClick={onClickEnterBtHandler}>출근</button> :
                            <button className="attend-button leaveBt" onClick={onClickLeaveBtHandler}>퇴근</button>}
                    </>
                    :
                    <>
                        <p className="attend-sub-menu3" style={{
                            marginTop:"-10px"
                        }} >0H 0M</p>
                        <div className="progress-bar" style={{marginTop:"-13px"}}></div>
                        <p className="attend-sub-menu3" style={{fontSize : "15px",marginTop:"35px"}}>오늘의 출근 정보가 없습니다.</p>
                        <p className="attend-sub-menu3" style={{fontSize : "15px"}}>출근등록을 해주세요</p>
                        <button className="attend-button" onClick={onClickEnterBtHandler}>출근</button>
                    </>}
            </div>

        </>
    )
}

export default CommuteBt;
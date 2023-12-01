import {useDispatch, useSelector} from "react-redux";
import {callEnterBtAPI, callLeaveBtAPI, callTodayAttendAPI} from "../../apis/AttendAPICalls";
import {useEffect, useState} from "react";
import {attendReducer} from "../../modules/AttendModule";

function CommuteBt(){
    const {myAttend} = useSelector(state => state.attendReducer);
    const dispatch = useDispatch();
    const {todayAttend} = useSelector(state=> state.attendReducer);


    useEffect(() => {
        dispatch(callTodayAttendAPI());
    }, []);

    const onClickEnterBtHandler = ()=>{
        dispatch(callEnterBtAPI());
    }
    const onClickLeaveBtHandler = () => {
        dispatch(callLeaveBtAPI());
    }


    return(
        <>
           <button onClick={onClickEnterBtHandler}>출근버튼</button><button onClick={onClickLeaveBtHandler}>퇴근버튼</button>
            { todayAttend && <div>오늘 출근시간 : {todayAttend.enterTime}</div> }
        </>
    )
}

export default CommuteBt;
import {request} from "./Api";
import {attendAdmin, myAttend, todayAttend} from "../modules/AttendModule";
import {toast} from "react-toastify";

export const callGetAttendResultAPI = ({month}) => {
    return async (dispatch, getState) => {
        console.log("month : ", String(month))
        const result = await request("GET", `/api/v1/myAttend?month=${month}`)
        dispatch(myAttend(result));

    }
}

export const callEnterBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('POST', '/api/v1/enter')

        if(result == null){
            toast.error("이미 출근 등록이 되어있습니다.")
        }
        if(result?.status == 201) {
            toast.info("출근등록이 완료되었습니다")
        };

    }
}

export const callLeaveBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('PUT', '/api/v1/leave')
        if (result?.status == 201) {
            toast.info("퇴근이 완료되었습니다.")
        }
    }
}

export const callTodayAttendAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('GET', '/api/v1/todayMyAttend')

        if (!result) {
            return
        }

        if (result.status == 200) {
            dispatch(todayAttend(result))
        }
    }
}

export const callGetAttendAdminResultAPI = ()=>{
    return async (dispatch,getState) => {
        const result = await request('GET','/api/v1/getAttendAdmin')
        if(result?.status == 200){
            dispatch(attendAdmin(result))
        }
    }
}
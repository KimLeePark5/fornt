import {request} from "./Api";
import {myAttend, todayAttend} from "../modules/AttendModule";

export const callGetAttendResultAPI = ({month})=>{
    return async (dispatch,getState) => {
        console.log("month : ", String(month))
        const result = await request("GET",`/api/v1/myAttend?month=${month}`)
        console.log(result);
        dispatch(myAttend(result));

    }
}

export const callEnterBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('POST', '/api/v1/enter')
        console.log(result);

    }
}

export const callLeaveBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('PUT','/api/v1/leave')
        console.log(result);
    }
}

export const callTodayAttendAPI = () => {
    return async (dispatch, getState) => {
        const result = await request('GET','/api/v1/todayMyAttend')

        if(!result){
            return
        }

        if(result.status==200) {
            dispatch(todayAttend(result))
        }
    }
}
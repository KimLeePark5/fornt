import {authRequest, request} from "./Api";
import {
    attendAdmin,
    attendAdminByType,
    attendModifySuccess,
    enterSuccess, leaveSuccess,
    myAttend,
    todayAttend
} from "../modules/AttendModule";
import {toast} from "react-toastify";

export const callGetAttendResultAPI = ({month}) => {
    return async (dispatch, getState) => {
        console.log("month : ", String(month))
        const result = await authRequest.get(`/api/v1/myAttend?month=${month}`).catch(e=>console.log(e))

        if (result?.status == 200){
        dispatch(myAttend(result));
        }
    }
}

export const callEnterBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.put('/api/v1/enter').catch(e=>{
            if(e.response.status === 400){
                toast.error('이미 출근 등록이 되어있습니다.')
            }
        })

        if (result?.status == 201) {
            toast.info("출근등록이 완료되었습니다")
            dispatch(enterSuccess(result));
        }

    }
}

export const callLeaveBtAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.put('/api/v1/leave')
        if (result?.status == 201) {
            toast.info("퇴근이 완료되었습니다.")
            dispatch(leaveSuccess(result))
        }
    }
}

export const callTodayAttendAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get('/api/v1/todayMyAttend').catch(e=>console.log(e))


        if (result?.status == 200) {
            dispatch(todayAttend(result))
        }
    }
}

export const callGetAttendAdminResultAPI = (month,page)=>{
    return async (dispatch,getState) => {
        const result = await authRequest.get(`/api/v1/getAttendAdmin?month=${month}&page=${page}`)
        if(result?.status == 200){
            dispatch(attendAdmin(result))
        }
    }
}

export const callSearchNameAPICalls = (month,empName,page) => {
    return async (dispatch,getState) => {
        const result = await authRequest.get(`/api/v1/getAttendAdminByEmpName?month=${month}&name=${empName}&page=${page}`)
        if(result?.status == 200){
            dispatch(attendAdmin(result))
        }
        if(result == null){
            toast.error("존재하는 사원이 없습니다.")
        }
    }
}
export const callModifyAttendAPI = (form,attendNo) => {
    return async (dispatch,getState) => {
        const result = await authRequest.put(`/api/v1/modifyAttend/${attendNo}`,JSON.stringify(form),
            {
                headers:{
                    'Content-Type' : 'application/json'
                }
            }
            ).catch(e=>console.log(e))



        if(result.status == 201){
            dispatch(attendModifySuccess(result))
        }

    }
}

export const callAttendByLateAPI = (month, page, standard) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/getAttendByLate?month=${month}&page=${page}&value=${standard}`).catch(e => console.log(e))

        if (result?.status == 200) {


            dispatch(attendAdminByType(result))
        }
    }
}
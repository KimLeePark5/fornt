import {authRequest} from "./Api";
import {getRequireState, getUsedVacation, getVacation} from "../modules/VacationModules";
import async from "async";
import {postSuccess} from "../modules/CustomerModule";

// 연차 현황 조회
export const callVacationStateAPI = () => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/vacation`)
        console.log("callVacationStateAPI 호출 성공: ", result);

        if (result?.status === 200) {
            dispatch(getVacation(result));
        }
    }
};

// 연차 신청
export const callVacationRequireAPI = ({requireForm}) => {
    return async (dispatch, getState) => {

        console.log("연차 상신 폼 : ", requireForm);

        const result = await authRequest.post(`api/vi/require`, requireForm);
        console.log("callVacationRequireAPI 호출 성공: ", result);

        if (result.status === 201) {
            dispatch(postSuccess());
        }
    }
}



// 연차 신청 현황 조회
export const callRequireStateAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get("/api/v1/requireState");
        console.log("callRequireStateAPI 호출 성공: ", result);

        if (result?.status === 200) {
            dispatch(getRequireState(result));
        }
    }
};


// 연차 사용 리스트 조회
export const callUsedVacationAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/usedVacation?page=${currentPage}`);
        console.log("callUsedVacationAPI 호출 성공: ", result);

        if (result?.status === 200) {
            dispatch(getUsedVacation(result));
        }
    }
};



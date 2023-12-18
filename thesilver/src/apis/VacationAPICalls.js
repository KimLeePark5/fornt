import {authRequest} from "./Api";
import {getProceedRequire, getRequireState, getUsedVacation, getVacation} from "../modules/VacationModules";
import async from "async";
import {postSuccess} from "../modules/CustomerModule";
import {NavigationType} from "react-router-dom";

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

// 연차 신청 폼 오픈
export const callRequireFormOpen = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/vacation`)
        console.log("callRequireFormOpen 호출 성공: ", result);

        if (result?.status === 200) {
            dispatch(getVacation(result));
        }
    }
}

// 연차 신청
export const callVacationRequireAPI = ({requireForm}) => {
    return async (dispatch, getState) => {

        console.log("연차 상신 폼 : ", requireForm);

        const result = await authRequest.post(`api/vi/require`, requireForm);
        console.log("callVacationRequireAPI 호출 성공: ", result);

        if (result?.status === 201) {
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

export const callProceedRequireAPI = ({currentPage = 1,navType = "상신", proceedRequire}) => {
    return async (dispatch, getState) => {
        console.log("확인", navType)
    const result = await authRequest.get(`/api/v1/ProceedRequireAdmin?page=${currentPage}&signStatus=${navType}`);
    console.log("callRequireAPI 호출 성공: ", result);

    if (result?.status === 200) {
        dispatch(getProceedRequire(result));
    }
}
};



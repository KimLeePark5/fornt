import {authRequest, request} from "./Api";
import {
    getProceedRequire,
    getRequireState,
    getUsedVacation,
    getVacation,
    putSuccess,
    requireSuccess, updateSuccess
} from "../modules/VacationModules";



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

        const result = await authRequest.post(`/api/v1/require`, requireForm);
        console.log("callVacationRequireAPI 호출 성공: ", result);

        if (result?.status === 201) {
            dispatch(requireSuccess());
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

// 결재 현황 리스트
export const callProceedRequireAPI = ({currentPage = 1, navType = "상신"}) => {
    return async (dispatch, getState) => {
        console.log("확인", navType)
        const result = await authRequest.get(`/api/v1/ProceedRequireAdmin?page=${currentPage}&signStatus=${navType}`);
        console.log("callRequireAPI 호출 성공: ", result);

        if (result?.status === 200) {
            dispatch(getProceedRequire(result));
        }
    }
};


// 결재
export const callSignRequireAPI = ({reqNo}) => {
    return async(dispatch, getState) => {
        console.log("requireNUMBER : ", reqNo);

        const result = await authRequest.put(`api/v1/require/${reqNo}/pass`, {
            reqStatus: '결재완료',
        });
        console.log("callSignRequireAPI 호출 성공 : ", result);

        if (result?.status === 201) {
            dispatch(putSuccess());
        }
    }
};

export const callReturnRequireAPI = ({reqNo,form}) => {
    return async(dispatch, getState) => {

        const updateForm = {...form, reqStatus: '반려'}

        console.log("form : ", updateForm);


        const result = await authRequest.put(`api/v1/require/${reqNo}/return`, updateForm);
        console.log("callReturnRequireAPI 호출 성공 : ", result);

        if (result?.status === 201) {
            dispatch(putSuccess());
        }
    }
};

export const callCancelRequireAPI = ({reqNo}) => {
    return async(dispatch, getState) => {
        console.log("requireNUMBER : ", reqNo);

        const result = await authRequest.put(`api/v1/require/${reqNo}/cancel`, {
            reqStatus: '취소',
        });
        console.log("callCancelRequireAPI 호출 성공 : ", result);

        if (result?.status === 201) {
            dispatch(putSuccess());
        }
    }
};






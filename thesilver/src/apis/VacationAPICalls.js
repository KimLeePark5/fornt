import {authRequest} from "./Api";
import {getRequireState, getUsedVacation, getVacation} from "../modules/VacationModules";

export const callVacationStateAPI = () => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/vacation`)
        console.log("callVacationStateAPI 호출 성공: ", result);

        if (result.status === 200) {
            dispatch(getVacation(result));
        }
    }
};

export const callRequireStateAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get("/api/v1/requireState");
        console.log("callRequireStateAPI 호출 성공: ", result);

        if (result.status === 200) {
            dispatch(getRequireState(result));
        }
    }
};

export const callUsedVacationAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/usedVacation?page=${currentPage}`);
        console.log("callUsedVacationAPI 호출 성공: ", result);

        if (result.status === 200) {
            dispatch(getUsedVacation(result));
        }
    }
};


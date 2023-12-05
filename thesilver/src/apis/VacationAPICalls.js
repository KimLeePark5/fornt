import { request } from "./Api";
import { vacation } from "../modules/VacationModules";


export const callVacationStateAPI = (employeeCode) => {
    return async (dispatch, getState) => {
        try {
            const result = await request("GET", `/api/v1/vacation/${employeeCode}`);
            console.log("API 호출 성공: ", result);
            dispatch(vacation(result)); // 'payload'에 실제 데이터를 담아서 전달
        } catch (error) {
            console.log("API 호출 에러: ", error);
            // API 호출 중에 에러가 발생하면 여기로 들어옴
            if (error.response && error.response.status === 401) {
                // Unauthorized (401) 에러인 경우 로그아웃 액션을 디스패치

            }
        }
    };
};
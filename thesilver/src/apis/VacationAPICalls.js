import {authRequest} from "./Api";
import {getVacation} from "../modules/VacationModules";
import {getCustomers} from "../modules/CustomerModule";


// export const callVacationStateAPI = (employeeCode) => {
//     return async (dispatch, getState) => {
//         try {
//             const result = await authRequest.get("/api/v1/vacation");
//             console.log("API 호출 성공: ", result);
//             dispatch(getVacation(result)); // 'payload'에 실제 데이터를 담아서 전달
//         } catch (error) {
//             console.log("API 호출 에러: ", error);
//             // API 호출 중에 에러가 발생하면 여기로 들어옴
//             if (error.response && error.response.status === 401) {
//                 // Unauthorized (401) 에러인 경우 로그아웃 액션을 디스패치
//
//             }
//         }
//     };
// };

// export const callVacationStateAPI = () => {
//     return async (dispatch, getState) => {
//         try {
//             const result = await authRequest.get("/api/v1/vacation");
//             console.log("API 호출 성공: ", result);
//             dispatch(getVacation(result)); // 'payload'에 실제 데이터를 담아서 전달
//         } catch (error) {
//             console.log("API 호출 에러: ", error);
//             // API 호출 중에 에러가 발생하면 여기로 들어옴
//             if (error.response && error.response.status === 401) {
//                 // Unauthorized (401) 에러인 경우 로그아웃 액션을 디스패치
//
//             }
//         }
//     };
// };

export const callVacationStateAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/vacation`)
        console.log('콜 성공 : ', result);

        if (result.status === 200) {
            dispatch(getVacation(result));
        }
    }
}
// import {authRequest} from "./Api";
// import {getVacation} from "../modules/VacationModules";
//
// export const callVacationStateAPI = (employeeCode) => {
//     return async (dispatch, getState) => {
//         const result = await authRequest.get(`/api/v1/vacation/${employeeCode}`)
//
//         console.log('callVacationStateAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getVacation(result));
//         }
//     }
// }
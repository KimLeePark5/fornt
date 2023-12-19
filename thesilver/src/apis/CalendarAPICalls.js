// import {authRequest} from "./Api";
//
// export const callCalendarListAPI = ({ }) => {
//     return async (dispatch, getState) => {
//         try {
//             console.log("::: 요청 시작 > callGetProgramListAPI :::");
//
//             const result = await authRequest.get(`/api/v1/calendar`);
//
//             if (result?.status !== 200) {
//                 console.error("::: 요청 실패 > callGetProgramListAPI :::", result.data);
//             } else {
//                 console.log("::: 요청 성공 > callGetProgramListAPI :::");
//                 console.log('callGetProgramListAPI result : ', result);
//                 dispatch(getPrograms(result));
//             }
//         } catch (error) {
//             console.error("::: 요청 실패 > callGetProgramListAPI :::", error.message);
//         }
//     };
// };
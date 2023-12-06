import {authRequest, request} from "./Api";
import {getPrograms} from "../modules/ProgramsModule";


export const callGetProgramListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        console.log("::: 요청 시작 > callProgramListAPI :::");

        const result = await request('GET', `/api/v1/programs?page=${currentPage}`);
        // 인증이 필요한 요청으로, await request 대신 await authRequest.get 사용
        // const result = await authRequest.get(`/api/v1/programs?page=${currentPage}`)

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callProgramListAPI :::");
            console.log('callProgramListAPI result : ', result);
            dispatch(getPrograms(result));
        }
    }
};
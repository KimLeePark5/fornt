import {authRequest, request} from "./Api";
import {getPrograms} from "../modules/ProgramsModule";


export const callGetProgramListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        console.log("::: 요청 시작 > callGetProgramListAPI :::");

        const result = await request('GET', `/api/v1/programs?page=${currentPage}`);

        // 인증이 필요한 요청으로, await request 대신 await authRequest.get 사용
        // const result = await authRequest.get(`/api/v1/programs?page=${currentPage}`)

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetProgramListAPI :::");
            console.log('callGetProgramListAPI result : ', result);
            dispatch(getPrograms(result));
        }
    }
};

export const callprogramSearchListAPI = ({ categoryName, currentPage = 1 }) => { // 카테고리이름으로 검색조회

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/programs/search?categoryName=${categoryName}&page=${currentPage}`); //url
        console.log('callprogramSearchListAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callprogramSearchListAPI :::");
        } else {
            console.log("::: 요청 성공 > callprogramSearchListAPI :::");
            console.log('callprogramSearchListAPI result : ', result);
            dispatch(getPrograms(result));
        }
    }
};
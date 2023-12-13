import {authRequest, request} from "./Api";
import {getProgram, getPrograms, programSuccess} from "../modules/ProgramsModule";
import {toast} from "react-toastify";

export const callGetProgramListAPI = ({currentPage = 1}) => { //전체조회

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

export const callProgramSearchListAPI = ({ categoryName, currentPage = 1 }) => { // 카테고리이름으로 검색조회

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

export const callProgramDetailAPI = ({ code }) => { // 상세 (관리자는 등록 버튼 보이게)

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/programs/${code}`); //url
        console.log('callProgramDetailAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetProgramListAPI :::");
            console.log('callGetProgramListAPI result : ', result);
            dispatch(getProgram(result));
        }

    }
};

export const callAdminProgramRegistAPI = ({registRequest}) => { //등록

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/programs', registRequest);
        console.log('callAdminProgramRegistAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetProgramListAPI :::");
            console.log('callGetProgramListAPI result : ', result);
            dispatch(programSuccess());
            toast.info("프로그램 등록이 완료되었습니다.");
        }
    }
}


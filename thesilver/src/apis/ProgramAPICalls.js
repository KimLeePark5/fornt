import {authRequest} from "./Api";
import {
    getProgram,
    getProgramList,
    getPrograms,
    postProgramSuccess,
    putProgramSuccess
} from "../modules/ProgramsModule";
import {toast} from "react-toastify";


export const callGetProgramListAPI = ({ currentPage = 1 }) => { //프로그램 전체 조회
    return async (dispatch, getState) => {
        try {
            console.log("::: 요청 시작 > callGetProgramListAPI :::");

            const result = await authRequest.get(`/api/v1/programs?page=${currentPage}`);

            if (result?.status !== 200) {
                console.error("::: 요청 실패 > callGetProgramListAPI :::", result.data);
            } else {
                console.log("::: 요청 성공 > callGetProgramListAPI :::");
                console.log('callGetProgramListAPI result : ', result);
                dispatch(getPrograms(result));
            }
        } catch (error) {
            console.error("::: 요청 실패 > callGetProgramListAPI :::", error.message);
        }
    };
};

export const callProgramSearchListAPI = ({ categoryName, currentPage = 1 }) => { // 프로그램 이름으로 검색조회

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/programs/search?categoryName=${categoryName}&page=${currentPage}`); //url
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

        const result = await authRequest.get(`/api/v1/programs/${code}`); //url
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

        if(result?.status != 201) {
            console.log("::: 요청 실패 > callGetProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetProgramListAPI :::");
            console.log('callGetProgramListAPI result : ', result);
            dispatch(postProgramSuccess());
            toast.info("프로그램 등록이 완료되었습니다.");
        }
    }
}

export const callAdminProgramModifyAPI = ({code, modifyRequest}) => { // 수정

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/api/v1/programs/${code}`, modifyRequest);
        console.log('callAdminProgramModifyAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetProgramListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetProgramListAPI :::");
            console.log('callGetProgramListAPI result : ', result);
            dispatch(putProgramSuccess());
            toast.info("프로그램 수정이 완료되었습니다.");
        }
    }
}



export const callProgramDeleteAPI = ({ code }) => { // 삭제
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/programs/${code}`);

            if (result?.status !== 200) {
                console.log("::: 요청 실패 > callProgramDeleteAPI :::");
            } else {
                console.log("::: 요청 성공 > callProgramDeleteAPI :::");
                console.log('callProgramDeleteAPI result : ', result);
            }
        } catch (error) {
            console.error("프로그램 삭제 실패:", error);
            toast.error("프로그램 삭제 중 오류가 발생했습니다.");
        }
    };
};

export const callProgramList = ()=>{
    return async (dispatch,getState) => {
        const result = await authRequest.get(`/api/v1/program/myProgram`)

        if(result?.status == 200){
            dispatch(getProgramList(result));
        }
    }
}

import {authRequest, request} from "./Api";
import {


    getJournal,
    getJournals, postJournalSuccess, putJournalSuccess
} from "../modules/JournalsModule";
import {toast} from "react-toastify";


export const callGetJournalListAPI = ({currentPage = 1}) => { // 전체 조회

    return async (dispatch, getState) => {

        console.log("::: 요청 시작 > callGetJournalListAPI :::");

        const result = await authRequest.get(`/api/v1/journals?page=${currentPage}`);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetJournalListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetJournalListAPI :::");
            console.log('callGetJournalListAPI result : ', result);
            dispatch(getJournals(result));
        }
    }
};

//-----------------------------------------------------------------
export const callJournalManySearchListAPI = ({ categoryName, employeeName, observation, currentPage = 1 }) => { // 다중 검색
    return async (dispatch, getState) => {
        try {
            const queryParams = {
                page: currentPage,
            };

            if (employeeName) {
                queryParams.employeeName = employeeName;
            }

            if (categoryName) {
                queryParams.categoryName = categoryName;
            }

            if (observation) {
                queryParams.observation = observation;
            }
            const result = await authRequest.get('/api/v1/journals/search', { params: queryParams });

            console.log('callJournalManyListAPI result 검색 : ', result);

            if (result?.status !== 200) {
                console.log("::: 요청 실패 > callJournalManyListAPI :::");
            } else {
                console.log("::: 요청 성공 > callJournalManyListAPI :::");
                console.log('callJournalManyListAPI result : ', result);
                dispatch(getJournals(result));
            }
        } catch (error) {
            console.error("::: 요청 실패 > callJournalManyListAPI ::: ", error);
        }
    };
};

//----------------------------------------------------------------------

export const callJournalDetailAPI = ({ journalCode }) => { // 상세

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/journals/${journalCode}`); //url
        console.log('callJournalDetailAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callJournalDetailAPI :::");
        } else {
            console.log("::: 요청 성공 > callJournalDetailAPI :::");
            console.log('callJournalDetailAPI result : ', result); //데이터 잘 나옴
            dispatch(getJournal(result));
        }

    }
};

export const callJournalRegistAPI = ({registJournalRequest}) => { //등록

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/journals', registJournalRequest);
        console.log('callJournalRegistAPI result : ', result);

        if(result?.status != 201) {
            console.log("::: 요청 실패 > callJournalRegistAPI :::");
        } else {
            console.log("::: 요청 성공 > callJournalRegistAPI :::");
            console.log('callJournalRegistAPI result : ', result);
            dispatch(postJournalSuccess());
            toast.info("프로그램 등록이 완료되었습니다.");
        }
    }
}

export const callJournalModifyAPI = ({journalCode, modifyJournalRequest}) => { // 수정

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/api/v1/journals/${journalCode}`, modifyJournalRequest);
        console.log('callJournalModifyAPI result : ', result);

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callJournalModifyAPI :::");
        } else {
            console.log("::: 요청 성공 > callJournalModifyAPI :::");
            console.log('callJournalModifyAPI result : ', result);
            dispatch(putJournalSuccess());
            toast.info("프로그램 수정이 완료되었습니다.");
        }
    }
}

export const callJournalDeleteAPI = ({ journalCode }) => { // 삭제
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/journals/${journalCode}`);

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

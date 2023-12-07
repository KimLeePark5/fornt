import {authRequest, request} from "./Api";
import {getJournals} from "../modules/JournalsModule";


export const callGetJournalListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        console.log("::: 요청 시작 > callGetJournalListAPI :::");

        const result = await request('GET', `/api/v1/journals?page=${currentPage}`);

        // 인증이 필요한 요청으로, await request 대신 await authRequest.get 사용
        // const result = await authRequest.get(`/api/v1/journals?page=${currentPage}`)

        if(result?.status != 200) {
            console.log("::: 요청 실패 > callGetJournalListAPI :::");
        } else {
            console.log("::: 요청 성공 > callGetJournalListAPI :::");
            console.log('callGetJournalListAPI result : ', result);
            dispatch(getJournals(result));
        }
    }
};
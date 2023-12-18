import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {
    // employeeNames: [], // 추가: 직원 이름 목록
    // categoryNames: [], // 추가: 카테고리 이름 목록
};

/* 액션 타입 */
const GET_JOURNALS = 'journal/GET_JOURNALS';
const GET_JOURNAL = 'journal/GET_JOURNAL';

const POST_JOURNAL_SUCCESS = 'journal/POST_JOURNAL_SUCCESS'; // 등록
const PUT_JOURNAL_SUCCESS = 'journal/PUT_JOURNAL_SUCCESS';

/* 액션 함수 */
export const {journal: {getJournals, getJournal,    postJournalSuccess, putJournalSuccess }} = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_JOURNALS]: result => ({journals: result.data}),
    [GET_JOURNAL]: result => ({journal: result.data}),

    [POST_JOURNAL_SUCCESS] : () => ({postJournalSuccess : true}),
    [PUT_JOURNAL_SUCCESS] : () => ({putJournalSuccess : true}),

});

/* 리듀서 */
const journalReducer = handleActions({
    [GET_JOURNALS]: (state, {payload}) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값
    [GET_JOURNAL]: (state, {payload}) => payload,

    [POST_JOURNAL_SUCCESS] : (state, {payload}) => payload,
    [PUT_JOURNAL_SUCCESS] : (state, {payload}) => payload,

}, initialState);

export default journalReducer;
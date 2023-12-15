import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_JOURNALS = 'journal/GET_JOURNALS';
const GET_JOURNAL = 'journal/GET_JOURNAL';
const GET_EMPLOYEE_NAME = 'journal/GET_EMPLOYEE_NAME';
const GET_CATEGORY_NAME = 'journal/GET_CATEGORY_NAME';

const POST_JOURNAL_SUCCESS = 'journal/POST_JOURNAL_SUCCESS'; // 등록
const PUT_JOURNAL_SUCCESS = 'journal/PUT_JOURNAL_SUCCESS';

/* 액션 함수 */
export const {journal: {getJournals, getJournal, getEmployeeName, getCategoryName, postJournalSuccess, putJournalSuccess }} = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_JOURNALS]: result => ({journals: result.data}),
    [GET_JOURNAL]: result => ({journal: result.data}),
    [GET_EMPLOYEE_NAME]: employeeName => ({ journal: employeeName.data }),
    [GET_CATEGORY_NAME]: categoryName => ({ journal: categoryName.data }),

    [POST_JOURNAL_SUCCESS] : () => ({postJournalSuccess : true}),
    [PUT_JOURNAL_SUCCESS] : () => ({putJournalSuccess : true}),

});

/* 리듀서 */
const journalReducer = handleActions({
    [GET_JOURNALS]: (state, {payload}) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값
    [GET_JOURNAL]: (state, {payload}) => payload,
    [GET_EMPLOYEE_NAME]: (state, { payload }) => payload,
    [GET_CATEGORY_NAME]: (state, { payload }) => payload,

    [POST_JOURNAL_SUCCESS] : (state, {payload}) => payload,
    [PUT_JOURNAL_SUCCESS] : (state, {payload}) => payload,

}, initialState);

export default journalReducer;
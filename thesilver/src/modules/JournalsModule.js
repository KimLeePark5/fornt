import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_JOURNALS = 'journal/GET_JOURNALS';


/* 액션 함수 */
export const {journal: {getJournals, deleteJournal }} = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_JOURNALS]: result => ({journals: result.data}),
    //[DELETE_PROGRAM]: deletedProgramId => ({ deletedProgramId }),
});

/* 리듀서 */
const journalReducer = handleActions({
    [GET_JOURNALS]: (state, {payload}) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값


}, initialState);

export default journalReducer;
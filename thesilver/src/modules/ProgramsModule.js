import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_PROGRAMS = 'program/GET_PROGRAMS';


/* 액션 함수 */
export const {program: {getPrograms }} = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_PROGRAMS]: result => ({programs: result.data}),

});

/* 리듀서 */
const programReducer = handleActions({
    [GET_PROGRAMS]: (state, {payload}) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값


}, initialState);

export default programReducer;
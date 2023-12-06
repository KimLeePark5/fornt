import {createActions, handleActions} from "redux-actions";

const initialState = {};
/* 액션 타입 */
const GET_VACATION = 'vacation/GET_VACATION';

/* 액션 함수*/
export const {vacation: {getVacation}} = createActions({
    [GET_VACATION]: (result) => ({vacation: result.data})
});

/* 리듀서 함수 */
export const vacationReducer = handleActions({
    [GET_VACATION]: (state, {payload}) => payload,
}, initialState);


export default vacationReducer;
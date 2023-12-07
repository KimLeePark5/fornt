import {createActions, handleActions} from "redux-actions";

const initialState = {};
/* 액션 타입 */
const GET_VACATION = 'vacation/GET_VACATION';
const GET_REQUIRE_STATE = 'vacation/GET_REQUIRE_STATE'

/* 액션 함수*/
export const {vacation: {getVacation, getRequireState}} = createActions({
    [GET_VACATION]: result => ({vacation: result.data}),
    [GET_REQUIRE_STATE]: result => ({require: result.data})
});

/* 리듀서 함수 */
export const vacationReducer = handleActions({
    [GET_VACATION]: (state, {payload}) =>({...state, ...payload}),
    [GET_REQUIRE_STATE]: (state, {payload}) => ({...state, ...payload})
}, initialState);


export default vacationReducer;
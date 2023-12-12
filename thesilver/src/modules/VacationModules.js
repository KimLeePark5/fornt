import {createActions, handleActions} from "redux-actions";


const initialState = {};
/* 액션 타입 */
const GET_VACATION = 'vacation/GET_VACATION';
const REQUIRE_SUCCESS = 'vacation/REQUIRE_SUCCESS';
const GET_REQUIRE_STATE = 'vacation/GET_REQUIRE_STATE'
const GET_USED_VACATION = 'vacation/GET_USED_VACATION'

/* 액션 함수*/
export const {vacation: {getVacation, requireSuccess, getRequireState, getUsedVacation}} = createActions({
    [GET_VACATION]: result => ({vacation: result.data}),
    [REQUIRE_SUCCESS]: () => ({requireSuccess: true}),
    [GET_REQUIRE_STATE]: result => ({require: result.data}),
    [GET_USED_VACATION]: result => ({usedVacation: result.data})
});

/* 리듀서 함수 */
export const vacationReducer = handleActions({
    [GET_VACATION]: (state, {payload}) =>({...state, ...payload}),
    [REQUIRE_SUCCESS]: (state, {payload}) => payload,
    [GET_REQUIRE_STATE]: (state, {payload}) => ({...state, ...payload}),
    [GET_USED_VACATION]: (state, {payload}) => ({...state, ...payload})
}, initialState);

export default vacationReducer;
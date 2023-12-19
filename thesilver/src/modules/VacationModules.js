import {createActions, handleActions} from "redux-actions";



const initialState = {};
/* 액션 타입 */
const GET_VACATION = 'vacation/GET_VACATION';
const REQUIRE_SUCCESS = 'vacation/REQUIRE_SUCCESS';
const GET_REQUIRE_STATE = 'vacation/GET_REQUIRE_STATE';
const GET_USED_VACATION = 'vacation/GET_USED_VACATION';
const GET_PROCEED_REQUIRE = "vacation/GET_PROCEED_REQUIRE";
const PUT_SUCCESS = 'vacation/PUT_SUCCESS';
const UPDATE_SUCCESS = 'vacation/UPDATE_SUCCESS'

/* 액션 함수*/
export const {vacation: {getVacation, requireSuccess, getRequireState, getUsedVacation, getProceedRequire, putSuccess, updateSuccess}} = createActions({
    [GET_VACATION]: result => ({vacation: result.data}),
    [REQUIRE_SUCCESS]: () => ({requireSuccess: true}),
    [GET_REQUIRE_STATE]: result => ({require: result.data}),
    [GET_USED_VACATION]: result => ({usedVacation: result.data}),
    [GET_PROCEED_REQUIRE]: result => ({proceedRequire: result.data}),
    [PUT_SUCCESS]: () => ({putSuccess: true}),
    [UPDATE_SUCCESS]: () => ({updateSuccess: true}),
});

/* 리듀서 함수 */
export const vacationReducer = handleActions({
    [GET_VACATION]: (state, {payload}) =>({...state, ...payload}),
    [REQUIRE_SUCCESS]: (state, {payload}) => ({...state, ...payload}),
    [GET_REQUIRE_STATE]: (state, {payload}) => ({...state, ...payload}),
    [GET_USED_VACATION]: (state, {payload}) => ({...state, ...payload}),
    [GET_PROCEED_REQUIRE]: (state, {payload}) => ({...state, ...payload}),
    [PUT_SUCCESS]: (state, {payload}) => payload,
    [UPDATE_SUCCESS]: (state, {payload}) => payload,
}, initialState);

export default vacationReducer;
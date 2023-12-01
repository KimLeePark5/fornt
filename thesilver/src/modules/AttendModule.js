import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const MY_ATTEND = 'attend/MY_ATTEND'
const TODAY_ATTEND = 'attend/TODAY_ATTEND'
const ATTEND_ADMIN = 'attend/ATTEND_ADMIN'

/* 액션 함수 */
export const {attend : {myAttend, todayAttend, attendAdmin}} = createActions({
    [MY_ATTEND] : result => ({ myAttend : result.data}),
    [TODAY_ATTEND] : result => ({todayAttend : result.data}),
    [ATTEND_ADMIN] : result => ({attendAdmin : result.data})
});

/* 리듀서 */
export const attendReducer = handleActions({
    [MY_ATTEND] : (state, {payload}) => ({
        ...state,
        ...payload
    }),
    [TODAY_ATTEND] : (state, {payload}) => ({
        ...state,
        ...payload
    }),
    [ATTEND_ADMIN] : (state, {payload}) => payload
},initialState)

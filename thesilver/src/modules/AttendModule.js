import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const MY_ATTEND = 'attend/MY_ATTEND'
const TODAY_ATTEND = 'attend/TODAY_ATTEND'

/* 액션 함수 */
export const {attend : {myAttend, todayAttend}} = createActions({
    [MY_ATTEND] : result => ({ myAttend : result.data}),
    [TODAY_ATTEND] : result => ({todayAttend : result.data})
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
    })
},initialState)

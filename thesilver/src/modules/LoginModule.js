import {createActions, handleActions} from "redux-actions";

const initialState = {};

// 액션 타입
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const RESET_SUCCESS = 'login/RESET_SUCCESS';
const RESET_FAILURE = 'login/RESET_FAILURE';
const RESET_RESET = 'login/RESET_RESET';
const CHANGE_PW_SUCCESS = 'login/CHANGE_PW_SUCCESS';

// 액션 함수
export const {
    login: {
        loginSuccess,
        loginFailure,
        resetSuccess,
        resetFailure,
        resetReset,
        changePwSuccess
    }
} = createActions({
    [LOGIN_SUCCESS]: (accountStatus) => ({loginSuccess: true, accountStatus}),
    [LOGIN_FAILURE]: () => ({loginSuccess: false}),
    [RESET_SUCCESS]: () => ({resetSuccess: "on"}),
    [RESET_FAILURE]: () => ({resetSuccess: "off"}),
    [RESET_RESET]: () => ({resetSuccess: "none"}),
    [CHANGE_PW_SUCCESS]: () => ({changePwSuccess: true})
})

export const loginReducer = handleActions({
    [LOGIN_SUCCESS]: (state, {payload}) => payload,
    [LOGIN_FAILURE]: (state, {payload}) => payload,
    [RESET_SUCCESS]: (state, {payload}) => payload,
    [RESET_FAILURE]: (state, {payload}) => payload,
    [RESET_RESET]: (state, {payload}) => payload,
    [CHANGE_PW_SUCCESS]: (state, {payload}) => payload

}, initialState);

export default loginReducer;

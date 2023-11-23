import {createActions, handleActions} from "redux-actions";

const initialState = {};

const SIGNUP_SUCCESS = 'member/SIGNUP_SUCCESS';

export const { member : { signupSuccess } } = createActions({
    [SIGNUP_SUCCESS] : () => ({ signupSuccess : true })
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [SIGNUP_SUCCESS] : (state, { payload }) => payload
}, initialState);

export default customerReducer;
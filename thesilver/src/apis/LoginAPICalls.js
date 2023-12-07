import async from "async";
import {authRequest, request} from "./Api";
import {isLogin, saveToken} from "../utils/TokenUtils";
import {loginFailure, loginSuccess, resetFailure, resetSuccess} from "../modules/LoginModule";
import {getCustomers} from "../modules/CustomerModule";

export const callLoginAPI = ({loginForm}) => {

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/login',
            {'Content-Type' : 'application/json'},
            JSON.stringify(loginForm)
        )

        if(result?.status === 200) {
            saveToken(result.headers);
            dispatch(loginSuccess());
        } else {
            dispatch(loginFailure());
        }
    }
}

export const callResetPasswordAPI = ({resetPasswordForm}) => {
    return async (dispatch, getState) => {
    const result = await request("POST","/api/v1/password-reset",'application/json', resetPasswordForm)
        console.log('callResetPasswordAPI : ', result);

        if (result?.status === 200) {
            dispatch(resetSuccess());
        } else {
            dispatch(resetFailure())
        }
}}


import async from "async";
import {authRequest, request} from "./Api";
import {isLogin, saveToken} from "../utils/TokenUtils";
import {changePwSuccess, loginFailure, loginSuccess, resetFailure, resetSuccess} from "../modules/LoginModule";
import {getCustomers} from "../modules/CustomerModule";
import error from "../pages/Error";

// 로그인
export const callLoginAPI = ({loginForm}) => {

    return async (dispatch, getState) => {
        try {
            const result = await request(
                'POST',
                '/login',
                {'Content-Type': 'application/json'},
                JSON.stringify(loginForm)
            )

            if (result?.status === 200) {
                saveToken(result.headers);
                const accountStatus = result.data.accountStatus;
                console.log("accountStatus", accountStatus)
                dispatch(loginSuccess(accountStatus));
            } else {
                dispatch(loginFailure());
            }
        } catch (error) {
            const errorCode = error.response?.data.code
            const errorMessage = error.response?.data.message

            if (errorCode == "9004") {
                alert(errorMessage)
            } else if (errorCode == "9002") {
                alert(errorMessage)
            } else if (errorCode == "9000") {
                alert(errorMessage)
            } else {
                console.log(error)
                dispatch(loginFailure());
            }
        }
    }
}

// 비밀번호 찾기
export const callResetPasswordAPI = ({resetPasswordForm}) => {
    return async (dispatch, getState) => {
        try {
            const result = await request("POST", "/api/v1/password-reset", 'application/json', resetPasswordForm)
            console.log('callResetPasswordAPI : ', result);
            if (result?.status === 200) {
                dispatch(resetSuccess());
            }
        } catch (error) {
            dispatch(resetFailure())
            console.log(error)
        }
    }
}

// 비밀번호 변경
export const callChangePasswordAPI = ({changePasswordForm}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post("/api/v1/password-change", changePasswordForm)
            console.log('callResetPasswordAPI : ', result);
            if (result?.status === 200) {
                dispatch(changePwSuccess());
            }
        } catch(error) {
            const errorMessage = error.response.data.message
            alert(errorMessage)
        }
    }
}


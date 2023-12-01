import async from "async";
import {request} from "./Api";
import {isLogin, saveToken} from "../utils/TokenUtils";
import {loginFailure, loginSuccess} from "../modules/LoginModule";

export const callLoginAPI = ({loginForm}) => {

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/login',
            {'Content-Type' : 'application/json'},
            JSON.stringify(loginForm)
        )

        console.log(result)

        if(result?.status === 200) {
            saveToken(result.headers);
            dispatch(loginSuccess());
        } else {
            dispatch(loginFailure());
        }


    }
}
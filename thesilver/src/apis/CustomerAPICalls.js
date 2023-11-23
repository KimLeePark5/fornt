import {request} from "./Api";

export const callTestAPI = () => {
    return async (dispatch, getState) => {
        const result = await request("GET","/test")

        console.log("callTestAPI결과 : " , result)
    }
}
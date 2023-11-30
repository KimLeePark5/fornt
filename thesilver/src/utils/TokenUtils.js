import {jwtDecode} from "jwt-decode";

export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}


const getAccessToken = () => window.localStorage.getItem('access-token');
const getRefreshToken = () => window.localStorage.getItem('refresh-token');
const getDecodeAccessToken = () => {
    return getAccessToken() && jwtDecode(getAccessToken());
}
const getDecodeRefreshToken = () => {
    return getRefreshToken() && jwtDecode(getRefreshToken());
}

export const isLogin = () => {
    console.log(getDecodeAccessToken());
    console.log(getDecodeRefreshToken());
    return getAccessToken() && getRefreshToken()
}
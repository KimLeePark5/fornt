import LoginForm from "../components/login/form/LoginForm";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {resetLoginState} from "../modules/LoginModule";
import {isLogin} from "../utils/TokenUtils";
import {jwtDecode} from "jwt-decode";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginSuccess } = useSelector(state => state.loginReducer);

    useEffect(() => {
        if(loginSuccess === true) {
            console.log("확인@@@@@@@@@@@@@@@@@@@@@")
            window.location.replace("/customers");
        } else if(loginSuccess === false) {
            alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
            isLogin();
        }
    }, );




    return (
        <>
            <div className="login-page">
                <div className="login-header"><img src='/img/logo.png' className="login-img"/></div>
                <LoginForm/>
                <div className="login-footer"><p>© 2023 KimLeePark. All Rights Reserved.</p></div>
            </div>
        </>
    )
}

export default Login;
import {isLogin} from "../../utils/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute({ loginCheck, children }) {

    if(loginCheck) {
        // 로그인 해야만 볼 수 있는 기능
        return isLogin() ? children : <Navigate to="/login"/>
    } else {
        // 로그인 하면 볼 수 없는 기능 (로그인, 회원가입)
        return !isLogin() ? children : <Navigate to="/customers"/>

    }
}

export default ProtectedRoute;
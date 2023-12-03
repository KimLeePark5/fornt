import {isAdmin, isLogin, isMaster} from "../../utils/TokenUtils";
import {Navigate, useNavigate} from "react-router-dom";

function ProtectedRoute({ onlyAdminMaster, onlyMaster, onlyAdmin, onlyLogin, onlyUnLogin, children }) {

    // '팀장,센터장' 만 접근 가능
    if(onlyAdminMaster) {
        console.log("only admin and Master !")
        return (isAdmin() || isMaster()) ? children : <Navigate to="/customers"/>
    }

    // '센터장' 만 접근 가능
    if(onlyMaster) {
        console.log("only Master !")
        return isMaster() ? children : <Navigate to="/customers"/>
    }

    // '팀장' 만 접근 가능
    if(onlyAdmin) {
        console.log("only Admin !")
        return isAdmin() ? children : <Navigate to="/customers"/>
    }

    // '로그인' 만 접근 가능
    if(onlyLogin) {
        console.log("only 로그인 !")
        return isLogin() ? children : <Navigate to="/login"/>
    }

    // '비로그인' 만 접근 가능
    if (onlyUnLogin) {
        console.log("only unLogin !")
        return !isLogin() ? children : <Navigate to="/customers"/>
    }

    // 모든 로직에 걸리지 않을 경우
    return children;
}

export default ProtectedRoute;
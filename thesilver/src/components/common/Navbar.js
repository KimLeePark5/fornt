import {NavLink, useNavigate} from "react-router-dom"
import {useState} from "react";
import {getDecodeAccessToken, isAdmin, isLogin, isMaster, removeToken} from "../../utils/TokenUtils";
import ProtectedRoute from "../router/ProtectedRoute";

function Navbar() {

    const navigate = useNavigate();

    const [isSubMenuOpen, setSubMenuOpen] = useState({
        customer: false,
        program: false,
        schedule: false,
        attendance: false,
        employee: false,
        myInfo: false
    });

    /* Menu class 클릭 시 subMenu 보이기 */
    const onClickMenuHandler = (menu) => {
        setSubMenuOpen((prevState) => ({
            ...Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === menu ? !prevState[key] : false;
                return acc;
            }, {}),
        }));
    };

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/login");
    }

    return (
        <div className="navbar-div">
            <NavLink to="/">
                <img src='/img/logo.png' className="imgLogo"/>
            </NavLink>
            <ul className="nav-list-ul">
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("customer")}>고객 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.customer ? 'active' : ''}`}>
                        <li><NavLink to="/regist-customer">고객 신규 등록</NavLink></li>
                        <li><NavLink to="/customers">고객 정보 관리</NavLink></li>
                    </ul>

                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("program")}>프로그램</a>
                    <ul className={`subMenu ${isSubMenuOpen.program ? 'active' : ''}`}>
                        <li><NavLink to="/programs">프로그램 소개</NavLink></li>
                        <li><NavLink to="">프로그램 일지</NavLink></li>
                    </ul>
                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("schedule")}>일정 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.schedule ? 'active' : ''}`}>
                        <li><NavLink to="">월간 스케줄</NavLink></li>
                    </ul>
                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("attendance")}>근태/연차 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.attendance ? 'active' : ''}`}>
                        <li><NavLink to="/myAttend">근태 관리</NavLink></li>
                        <li><NavLink to="">연차 관리</NavLink></li>
                    </ul>
                </li>
                <ProtectedRoute onlyAdminMaster={true}>
                    <li>
                        <a className="Menu" onClick={() => onClickMenuHandler("employee")}>직원 관리</a>
                        {isSubMenuOpen.employee && (
                            <ul className="subMenu">
                                <li><NavLink to="/attend-management">직원 근태 관리</NavLink></li>
                                <li><NavLink to="/employees">직원 정보 관리</NavLink></li>
                                <li><NavLink to="">직원 연차 관리</NavLink></li>
                            </ul>
                        )}

                    </li>
                </ProtectedRoute>

                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("myInfo")}>내정보 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.myInfo ? 'active' : ''}`}>
                        <li><NavLink to="">내정보 관리</NavLink></li>
                    </ul>
                </li>
            </ul>
            <img
                src='/img/logout.png'
                className="imgLogout"
                title="로그아웃"
                onClick={onClickLogoutHandler}
            />
        </div>


    );
}

export default Navbar;
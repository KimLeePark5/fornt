import {NavLink} from "react-router-dom"
import {useState} from "react";

function Navbar(){

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

    return(
        <div className="navbar-div">
            <NavLink to="/">
                <img src='/img/logo.png' className="imgLogo"/>
            </NavLink>
            <ul className="nav-list-ul">
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("customer")}>고객 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.customer ? 'active' : ''}`} >
                        <li><NavLink to="">고객 신규 등록</NavLink></li>
                        <li><NavLink to="">고객 정보 관리</NavLink></li>
                    </ul>

                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("program")}>프로그램</a>
                    <ul className={`subMenu ${isSubMenuOpen.program ? 'active' : ''}`}>
                        <li><NavLink to="">프로그램 소개</NavLink></li>
                        <li><NavLink to="">프로그램 일지</NavLink></li>
                    </ul>
                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("schedule")}>일정 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.schedule ? 'active' : ''}`}>
                        <li><NavLink to="">월간 스케줄</NavLink></li>
                    </ul>
                    )}
                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("attendance")}>근태/연차 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.attendance ? 'active' : ''}`}>
                        <li><NavLink to="">근태 관리</NavLink></li>
                        <li><NavLink to="">연차 관리</NavLink></li>
                    </ul>
                 </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("employee")}>직원 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.employee ? 'active' : ''}`}>
                        <li><NavLink to="/employees">직원 정보 관리</NavLink></li>
                        <li><NavLink to="">직원 근태 관리</NavLink></li>
                        <li><NavLink to="">직원 연차 관리</NavLink></li>
                    </ul>
                </li>
                <li>
                    <a className={`Menu`} onClick={() => onClickMenuHandler("myInfo")}>내정보 관리</a>
                    <ul className={`subMenu ${isSubMenuOpen.myInfo ? 'active' : ''}`}>
                        <li><NavLink to="">내정보 관리</NavLink></li>
                    </ul>
                </li>
            </ul>
            <img src='/img/logout.png' className="imgLogout" title="로그아웃"/>
        </div>
    );
}

export default Navbar;
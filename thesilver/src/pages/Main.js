import MainTodoList from "../components/main/MainTodoList";
import {ToastContainer} from "react-toastify";
import MainAttend from "../components/main/MainAttend";
import MainCommuteBt from "../components/main/MainCommuteBt";
import SideCalendar from "../components/main/SideCalender";
import EmpSimpleInfo from "../components/main/EmpSimpleInfo";
import MainCal from "../components/main/MainCal";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ChangePwModal from "../components/login/form/ChangePwModal";

function Main() {
    // -- 용민 --
    const [searchParams] = useSearchParams();
    const accountStatus = searchParams.get('accountStatus')
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (accountStatus === "INACTIVE") {
            setModal(true)
        }
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div class='mainContainer'>
                <EmpSimpleInfo/>
                <div class='mainCal'>일정 달력</div>
                <MainCommuteBt/>
                <MainTodoList/>
                <div class='mainMiniCal'><SideCalendar/></div>
                <MainAttend/>
            </div>

            { modal && (
                <ChangePwModal setModal={setModal}/>
            )}
        </>
    )
}

export default Main;
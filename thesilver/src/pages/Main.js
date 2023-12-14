import MainTodoList from "../components/main/MainTodoList";
import {ToastContainer} from "react-toastify";
import MainAttend from "../components/main/MainAttend";
import MainCommuteBt from "../components/main/MainCommuteBt";
import SideCalendar from "../components/main/SideCalender";
import EmpSimpleInfo from "../components/main/EmpSimpleInfo";

function Main(){

    return(

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
        </>
    )
}
export default Main;
import AttendItem from "../components/items/AttendItems/AttendItem";
import CommuteBt from "../components/items/CommuteBt";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AttendCalender from "../components/items/AttendItems/AttendCalender";
function MyAttend(){

    return(
        <>
            <h2 style={{marginTop : "-20px"}}>근무 현황</h2>
            <div className="attend-box">
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <AttendItem/>
            <CommuteBt/>
            </div>

        </>
    )
}
export default MyAttend;
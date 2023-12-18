import AttendItem from "../components/items/AttendItems/AttendItem";
import CommuteBt from "../components/items/CommuteBt";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyAttend(){

    return(
        <>

            <div className="pageTitle-attend" style={{marginTop : "-20px"}}>근무 현황</div>
            <div className="attend-box">
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <AttendItem/>

            <CommuteBt/>
            </div>

        </>
    )
}
export default MyAttend;
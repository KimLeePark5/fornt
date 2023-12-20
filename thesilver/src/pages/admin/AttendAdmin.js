import {useEffect, useState} from "react";
import {callGetAttendAdminResultAPI} from "../../apis/AttendAPICalls";
import {useDispatch, useSelector} from "react-redux";
import EmployeeInfo from "../../components/items/AttendItems/EmployeeInfo";
import AdminAttendHeader from "../../components/items/AttendItems/AdminAttendHeader";
import PagingBar from "../../components/common/PagingBar";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

function AttendAdmin() {
    const date = new Date();
    const today = String(date.getFullYear()) + '-' + String(date.getMonth() + 1);
    const [month, setMonth] = useState(today);
    const [page, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {attendAdmin, attendModifySuccess} = useSelector(state => state.attendReducer)

    useEffect(() => {
        dispatch(callGetAttendAdminResultAPI(month, page))
    }, [month, page, attendModifySuccess]);

    const navigate = useNavigate();
    return (
        <>
            {attendAdmin &&
                <div>
                    <div style={{cursor:"pointer"}} className="attendAdminHead" onClick={()=>{window.location.replace("attend-management")}}>직원 근태 관리</div>
                    <div className="attendBackAdmin">
                        <ToastContainer hideProgressBar={true} position="top-center" style={{zIndex:500000000000}}/>
                        <AdminAttendHeader month={month} setMonth={setMonth}/>
                        <EmployeeInfo attendAdmin={attendAdmin} setMonth={setMonth} month={month}/>
                        <PagingBar setCurrentPage={setCurrentPage} pageInfo={attendAdmin.pageInfo}/>
                    </div>
                </div>
            }
        </>
    )
}

export default AttendAdmin;
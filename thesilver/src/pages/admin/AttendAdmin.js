import {useEffect, useState} from "react";
import {callGetAttendAdminResultAPI} from "../../apis/AttendAPICalls";
import {useDispatch, useSelector} from "react-redux";
import EmployeeInfo from "../../components/items/AttendItems/EmployeeInfo";
import AdminAttendHeader from "../../components/items/AttendItems/AdminAttendHeader";
import PagingBar from "../../components/common/PagingBar";

function AttendAdmin(){
    const date = new Date();
    const today = String(date.getFullYear()) +'-'+ String(date.getMonth()+1);
    const[month, setMonth]=useState(today);
    const[page, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {attendAdmin} = useSelector(state=>state.attendReducer)

    useEffect(() => {
        dispatch(callGetAttendAdminResultAPI(month,page))
    }, [month,page]);

    useEffect(() => {
        dispatch(callGetAttendAdminResultAPI(month,page))
    },[])


    return(
        <>
        {attendAdmin &&
            <div>
                <div className="attendAdminHead">직원 근태 관리</div>
                <div className="attendBackAdmin">
                <AdminAttendHeader month={month} setMonth={setMonth} />
                <EmployeeInfo attendAdmin={attendAdmin} setMonth={setMonth} month={month}/>
                <PagingBar setCurrentPage={setCurrentPage} pageInfo={attendAdmin.pageInfo}/>
                </div>
            </div>
        }
        </>
    )
}
export default AttendAdmin;
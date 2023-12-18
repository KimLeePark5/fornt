import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {callAttendByLateAPI} from "../../apis/AttendAPICalls";
import AdminAttendHeader from "../../components/items/AttendItems/AdminAttendHeader";
import PagingBar from "../../components/common/PagingBar";
import EmployeeInfoTwo from "../../components/items/AttendItems/EmployeeInfoTwo";

function AttendAdminByType(){
    const date = new Date();
    const today = String(date.getFullYear()) +'-'+ String(date.getMonth()+1);
    const[month, setMonth]=useState(today);
    const[page, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const standard = searchParams.get("sort");
    const {attendAdminType,attendModifySuccess}=useSelector(state=>state.attendReducer)
    useEffect(() => {
        dispatch(callAttendByLateAPI(month,page,standard))
    }, [month,page,standard,attendModifySuccess]);





    return(
        <>
            {attendAdminType &&
                <div>
                    <div className="attendAdminHead">직원 근태 관리</div>
                    <div className="attendBackAdmin">
                        <AdminAttendHeader month={month} setMonth={setMonth} />
                        <EmployeeInfoTwo attendAdmin={attendAdminType} setMonth={setMonth} month={month} />
                        <PagingBar setCurrentPage={setCurrentPage} pageInfo={attendAdminType.pageInfo}/>
                    </div>
                </div>
            }
        </>
    )
}
export default AttendAdminByType;
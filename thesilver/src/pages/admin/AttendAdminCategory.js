import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetAttendAdminByCategoryResultAPI, callGetAttendAdminResultAPI} from "../../apis/AttendAPICalls";
import AdminAttendHeader from "../../components/items/AttendItems/AdminAttendHeader";
import EmployeeInfo from "../../components/items/AttendItems/EmployeeInfo";
import PagingBar from "../../components/common/PagingBar";
import {useSearchParams} from "react-router-dom";

function AttendAdminCategory(){
    const date = new Date();
    const today = String(date.getFullYear()) +'-'+ String(date.getMonth()+1);
    const[month, setMonth]=useState(today);
    const[page, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const sort = searchParams.get("sort");
    const {attendAdmin,attendModifySuccess}=useSelector(state=>state.attendReducer)
    useEffect(() => {
        dispatch(callGetAttendAdminByCategoryResultAPI(month,page,sort))
    }, [month,page,attendModifySuccess]);

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
export default AttendAdminCategory;
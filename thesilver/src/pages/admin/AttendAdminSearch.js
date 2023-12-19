
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AdminAttendHeader from "../../components/items/AttendItems/AdminAttendHeader";
import EmployeeInfo from "../../components/items/AttendItems/EmployeeInfo";
import {useEffect, useState} from "react";
import {callSearchNameAPICalls} from "../../apis/AttendAPICalls";
import PagingBar from "../../components/common/PagingBar";

function AttendAdminSearch(){
    const date = new Date();
    const today = String(date.getFullYear()) +'-'+ String(date.getMonth()+1);
    const[month, setMonth]=useState(today);
    const[page, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const nameValue = searchParams.get("name");
    const dispatch = useDispatch();
    const {attendAdmin} = useSelector(state=>state.attendReducer)

    useEffect(() => {
        dispatch(callSearchNameAPICalls(month,nameValue,page));
    }, [month,page,searchParams]);

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

export default AttendAdminSearch;
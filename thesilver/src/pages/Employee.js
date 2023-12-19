import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callEmployeeAPI} from "../apis/EmployeesAPICalls";
import EmployeeItem from "../components/employee/items/EmployeeItem";
import EmployeeModifyItem from "../components/employee/items/EmployeeModifyItem";

function Employee() {
    const dispatch = useDispatch();
    const {employee, putSuccess} = useSelector(state => state.employeesReducer);
    const [employeeModify, setEmployeeModify] = useState(false)

    useEffect(() => {
        dispatch(callEmployeeAPI());
    }, [putSuccess]);

    const employeeModifyMode = () => {
        setEmployeeModify(true)
    }

    return(
        <>
            {!employeeModify ?
                <>
                <h1>내 정보</h1>
                <button onClick={employeeModifyMode} className="employees-list-update-btn" style={{display:"inline", float:"right", marginRight:70, marginTop:-15}}>수정</button>
                </>
                :
                <h1>내 정보 수정</h1>
            }

            {employee&&(
                <>
                    {!employeeModify ?
                        <EmployeeItem employee={employee}/>
                        :
                        <EmployeeModifyItem employees={employee} setEmployeeModify={setEmployeeModify}/>
                    }
                </>
            )}
        </>
    )
}
export default Employee
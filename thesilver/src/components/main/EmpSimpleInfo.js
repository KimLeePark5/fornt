import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeeAPI, callEmployeeInfoAPI} from "../../apis/EmployeesAPICalls";

function EmpSimpleInfo() {
    const dispatch = useDispatch();
    const {employee} = useSelector(state => state.employeesReducer);

    useEffect(() => {
        dispatch(callEmployeeInfoAPI())
    }, []);
    return (
        <div className='simpleinfoCon'>
            {employee &&
                <>
                    {/*<img className='simpleinfoimg'*/}
                    {/*     src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hq0WZBhFK7trcEApAsmPWKPUbBBZdDg8GPjcVTywD8-BGgE5KvBp55RPRb-bgxuHmE0&usqp=CAU'}/>*/}
                    <img className='simpleinfoimg' src={employee.employeePicture}/>
                    <div className='simpleinfoName'> {employee.employeeName} {employee.rank.rankName}</div>
                </>
            }
        </div>


    )
}

export default EmpSimpleInfo;
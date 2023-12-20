import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeeInfoAPI} from "../../apis/EmployeesAPICalls";

function EmpSimpleInfo() {
    const dispatch = useDispatch();
    const {MainEmployee} = useSelector(state => state.employeesReducer);

    useEffect(() => {
        dispatch(callEmployeeInfoAPI())
    }, []);
    return (

        <div className='simpleinfoCon'>
            {MainEmployee &&
                <>
                    <img className='simpleinfoimg' src={MainEmployee.employeePicture}/>
                    <div className='simpleinfoName'>{MainEmployee.employeeName} {MainEmployee.rank.rankName} </div>
                </>
            }

        </div>
    )


}

export default EmpSimpleInfo;
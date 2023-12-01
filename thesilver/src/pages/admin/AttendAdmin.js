import {useEffect} from "react";
import {callGetAttendAdminResultAPI} from "../../apis/AttendAPICalls";
import {useDispatch, useSelector} from "react-redux";

function AttendAdmin(){
    const dispatch = useDispatch();
    const {attendAdmin} = useSelector(state=>state.attendReducer)

    useEffect(() => {
        dispatch(callGetAttendAdminResultAPI())
    }, []);


    return(
        <>
        {attendAdmin &&
            <div>
                <div>직원 근태 관리</div>
                <div>
                    <div className="admin-attend-head">
                        <input type="text"/>
                        <div>2023년 11월</div>
                        <select>
                            <option>123</option>
                            <option>123</option>
                            <option>123</option>
                        </select>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>근무율</td>
                            <td>결근</td>
                            <td>지각</td>
                            <td>조퇴</td>
                            <td>휴가</td>
                            <td>연장근무</td>
                            <td>상세정보</td>
                        </tr>
                        {(attendAdmin.data.responseAttendAdmin.content).map( emp => <tr><td>{emp.empName}</td></tr>)}
                    </tbody>
                </table>

            </div>
        }
        </>
    )
}
export default AttendAdmin;
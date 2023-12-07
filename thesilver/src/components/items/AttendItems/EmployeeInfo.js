import React, {useState} from "react";
import AttendModal from "./AttendModal";

function EmployeeInfo({attendAdmin, setMonth,month}) {

    const [attendModal, setAttendModal] = useState(false);
    const [empNo, setEmpNo] = useState(0);


    const attendDetailOnclickHandler = (empNo)=>{
        setEmpNo(empNo);
        setAttendModal(true);
    }
    return (
        <div className="attendAdminMain">
            {attendModal &&
                <AttendModal  setAttendModal={setAttendModal} empNo={empNo} attendAdmin={attendAdmin}
                              setMonth={setMonth} month={month}
            />}

            <table className="attendTable">
                <thead>
                <tr>
                    <th>1</th>
                    <td className="att-late" style={{
                        fontSize:20
                    }}>근무율</td>
                    <th>결근</th>
                    <th>지각</th>
                    <th>조퇴</th>
                    <th>휴가</th>
                    <th>연장근무</th>
                </tr>
                </thead>
                <tbody className="att-tbody">
                {(attendAdmin.data.responseAttendAdmin.content).map((emp, index) =>
                    <tr key={emp.empCode} className="att-tr">
                        <td className="att-empName">{emp.empName}</td>
                        <td className="att-late">100%</td>
                        <td>{attendAdmin.data.responseAttendTypes.content[index].absentCount}회</td>
                        <td>{attendAdmin.data.responseAttendTypes.content[index].lateCount}회</td>
                        <td>{attendAdmin.data.responseAttendTypes.content[index].leaveEarlyCount}회</td>
                        <td>{attendAdmin.data.responseAttendTypes.content[index].vacationCount}회</td>
                        <td>{}</td>
                        <td>
                            <button onClick={(e) => {
                                attendDetailOnclickHandler(emp.empCode)
                            }} className='attenddetailbtn'>상세정보
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeInfo;
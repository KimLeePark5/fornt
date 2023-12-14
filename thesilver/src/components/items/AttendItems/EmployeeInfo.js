import React, {useState} from "react";
import AttendModal from "./AttendModal";
import {useSelector} from "react-redux";


function EmployeeInfo({attendAdmin, setMonth, month}) {
    const [attendModal, setAttendModal] = useState(false);
    const [empNo, setEmpNo] = useState(0);

    const getAttlate = (attendAdmin, i, month) => {
        const date = new Date();
        let start = new Date(String(month).substring(0, 4), (String(month).substring(5,7))-1, 1)
        let end = new Date(start.getFullYear(), start.getMonth()+1,0)
        let now = new Date(date)

        let dayoff = 0;
        const thisMonth = Boolean(start.getMonth()==date.getMonth());
        if (thisMonth) {
            for (let i = 1; start <= now; i++) {
                if (start.getDay() == 0) {
                    dayoff += 1
                } else if (start.getDay() == 6) {
                    dayoff += 1
                }
                start.setDate(start.getDate() + 1)
            }
        }else{
            for (let i = 1; start <= end; i++) {
                if (start.getDay() == 0) {
                    dayoff += 1
                } else if (start.getDay() == 6) {
                    dayoff += 1
                }
                start.setDate(start.getDate() + 1)
            }

        }

        let abs = 0;
        let vac = 0;
        attendAdmin.data.responseAttendAdmin.content[i].attendList.map(att => {
            if (att.note == '결근') {
                abs += 1;
            } else if (att.note == '휴가') {
                vac += 1;
            }
        })
        const attendDate = attendAdmin.data.responseAttendAdmin.content[i].attendList.length - abs - vac;
        let week = 0;
        attendAdmin.data.responseAttendAdmin.content[i].attendList.map(att => {
            if (new Date(att.attendDate).getDay() == 0) {
                week += 1;
            } else if (new Date(att.attendDate).getDay() == 6) {
                week += 1;
            }
        })

        return parseInt(((attendDate - week) /  ( (thisMonth ? date.getDate() : end.getDate()) - dayoff)) * 100);
    }

    const attendDetailOnclickHandler = (empNo, index) => {

        setEmpNo(empNo);
        setAttendModal(true);
    }

    return (
        <div className="attendAdminMain">
            {attendModal &&
                <AttendModal setAttendModal={setAttendModal} empNo={empNo} attendAdmin={attendAdmin}
                             setMonth={setMonth} month={month}
                />}
            <div className='empatinfohead'>
                <div>근무율</div>
                <div>결근</div>
                <div>지각</div>
                <div>조퇴</div>
                <div>휴가</div>
                <div>연장근무</div>
            </div>
            <div className='allempatinfo'>
                {(attendAdmin.data.responseAttendAdmin.content).map((emp, index) =>
                    <div className='empatinfo'>
                        <div style={{width: 150}}><span>{emp.empName} </span><span style={{
                            fontSize: 14,
                            color: "#a3a1a1"
                        }}> {emp.team != '미지정' ? emp.team : ''} {emp.empRank}</span></div>
                        <div className='emalte' style={getAttlate(attendAdmin, index,month) == 100 ? {
                            color: '#3CB371',
                            backgroundColor: '#86ED93'
                        } : {color: 'red', backgroundColor: '#FFB2B2'}}>
                            <div className='ele2'>{getAttlate(attendAdmin, index, month)}%</div>
                        </div>
                        <div
                            style={{marginLeft: 42}}>{attendAdmin.data.responseAttendTypes.content[index].absentCount}회
                        </div>
                        <div style={{marginLeft: 13}}>{attendAdmin.data.responseAttendTypes.content[index].lateCount}회
                        </div>
                        <div
                            style={{marginLeft: 12}}>{attendAdmin.data.responseAttendTypes.content[index].leaveEarlyCount}회
                        </div>
                        <div
                            style={{marginLeft: 13}}>{attendAdmin.data.responseAttendTypes.content[index].vacationCount}회
                        </div>
                        <div style={{marginLeft: 20}}>12시간</div>
                        <div>
                            <button onClick={(e) => {
                                attendDetailOnclickHandler(emp.empCode)
                            }} className='attenddetailbtn' style={{marginLeft: 50}}>상세정보
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmployeeInfo;
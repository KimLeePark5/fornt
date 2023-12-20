import React, {useState} from "react";
import AttendModal from "./AttendModal";
import AttendModalTwo from "./AttendModalTwo";

function EmployeeInfoTwo({attendAdmin, setMonth, month}){
    const [attendModal, setAttendModal] = useState(false);
    const [empNo, setEmpNo] = useState(0);

    const getAttlate = (attendAdmin,i)=>{
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
        attendAdmin.data.responseAttendAdminTwos.content[i].attendList.map(att => {
            if(att.note == '결근'){
                abs += 1;
            }else if(att.note == '휴가'){
                vac += 1;
            }
        })

        const attendDate = attendAdmin.data.responseAttendAdminTwos.content[i].attendList.length - abs;

        let week = 0;
        attendAdmin.data.responseAttendAdminTwos.content[i].attendList.map(att=>{
            console.log(att.attendDate)
            if(new Date(att.attendDate).getDay() == 0){
                week += 1;
            }else if(new Date(att.attendDate).getDay() == 6){
                week += 1;
            }
        })

        console.log("*****************")
        console.log(month)
        console.log(attendDate)
        console.log(week)
        console.log(date.getDate())
        console.log(end.getDate())
        console.log(end)
        console.log(dayoff)
        console.log("*****************")

        return parseInt(((attendDate - week) /  ( (thisMonth ? date.getDate() : end.getDate()) - dayoff)) * 100);
    }




    const attendDetailOnclickHandler = (empNo,index)=>{
        setEmpNo(empNo);
        setAttendModal(true);
    }

    return (
        <div className="attendAdminMain">
            {attendModal &&
                <AttendModalTwo  setAttendModal={setAttendModal} empNo={empNo} attendAdmin={attendAdmin}
                                 setMonth={setMonth} month={month}
                />}
            <div className='empatinfohead'>
                <div>근무율</div>
                <div>결근</div>
                <div>지각</div>
                <div>조퇴</div>
                <div>휴가</div>
                <div>근무시간</div>
            </div>
            <div className='allempatinfo'>
                {(attendAdmin.data.responseAttendAdminTwos.content).map((emp, index) =>
                    <div className='empatinfo'>
                        <div style={{width:150}}> <span>{emp.empName} </span><span style={{fontSize:14,color:"#a3a1a1"}}> {emp.team != '미지정' ? emp.team : ''} {emp.empRank}</span></div>
                        <div  className='emalte' style={getAttlate(attendAdmin,index,month) == 100 ? {color:'#3CB371',backgroundColor:'#86ED93'} : {color:'red',backgroundColor:'#FFB2B2'}}><div className='ele2'>{getAttlate(attendAdmin,index)}%</div></div>
                        <div style={{marginLeft:42}}>{attendAdmin.data.responseAttendAdminTwos.content[index].absentCount}회</div>
                        <div style={{marginLeft:13}}>{attendAdmin.data.responseAttendAdminTwos.content[index].lateCount}회</div>
                        <div style={{marginLeft:12}}>{attendAdmin.data.responseAttendAdminTwos.content[index].leaveEarlyCount}회</div>
                        <div style={{marginLeft:13}}>{attendAdmin.data.responseAttendAdminTwos.content[index].vacCount}회</div>
                        <div style={{marginLeft: 20}}>{attendAdmin.data.responseAttendAdminTwos.content[index].attendTime==0?'':`${attendAdmin.data.responseAttendAdminTwos.content[index].attendTime}시간`}</div>
                        <div> <button onClick={(e) => {
                            attendDetailOnclickHandler(emp.empCode)
                        }} className='attenddetailbtn' style={{marginLeft:50}}>상세정보
                        </button></div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default EmployeeInfoTwo;
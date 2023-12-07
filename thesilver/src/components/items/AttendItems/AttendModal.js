import {useRef, useState} from "react";
import AttendHistoryModal from "./AttendHistoryModal";
import {style} from "redux-logger/src/diff";
import ModifyAttendModal from "./ModifyAttendModal";

function AttendModal({attendAdmin, setMonth, month, empNo, setAttendModal, attendAdmin: {data: {responseAttendAdmin: {content}}}}) {
    console.log(empNo)
    const empAttendInfo = content.filter((content) => content.empCode == empNo);
    console.log(empAttendInfo)
    console.log("abcd",attendAdmin);
    const curMonth = month.substring(5);
    const keyValue = useRef();
    const date = new Date;
    const lastDay = new Date(date.getFullYear(), Number(curMonth), 0).getDate();
    const [attendNo, setAttendNo] = useState(0);
    const [attendHistoryBtn, setattendHistoryBtn] = useState(false);
    const [attModifyBtn, setAttModifyBtn] = useState(false);
    const attendHistoryOnclickHandler = (code) => {
        console.log('code',code)
        setattendHistoryBtn(true);
        setAttendNo(code)
        console.log('attno',attendNo)

    }
    const attendModifyBtnHandler = (code)=>{
        console.log('cccccddd',code)
        setAttModifyBtn(true)
        setAttendNo(code)
    }



    const matchDay = (month) => {
        return empAttendInfo[0].attendList.filter(attend => attend.attendDate == month);
    }
    const getAttend = (month) => {
        const curDate = month + '-01';
        let curDay =  new Date(curDate).getDay();
        const day = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];


        let arr = [];

        for (let i = 0; i < lastDay; i++) {
            let dayInfo = matchDay(`${month}-${ String(i+1).length == 1 ? '0'+(i+1) : i+1 }`);
            console.log('day :',dayInfo)
            arr.push(
                <>
                <tr key={i} className="tbodyattend" onClick={(e) => attendModifyBtnHandler(dayInfo[0]?.attendCode) }>
                    <td style=
                            {
                            curDay%7 == 0 ? {
                        color:'red'
                    } : curDay%7 == 6 ? {
                           color:'blue'
                        } : {}
                    }>
                        {curMonth}. {i + 1} {day[curDay%7]} </td>
                    <td>{dayInfo[0]?.type}</td>
                    <td>{dayInfo[0]?.enterTime}{dayInfo[0]?.enterTime ? '  ~ ' : ''}{dayInfo[0]?.leaveTime}</td>
                    <td>{dayInfo[0]?.attendTime}{dayInfo[0]?.attendTime ? '시간' : ''} </td>
                    <td>{dayInfo[0]?.note}</td>
                    <td>
                        <button ref={keyValue} value={dayInfo[0]?.attendCode} className="getmodibtn" onClick={(e) => {
                            e.stopPropagation();
                            attendHistoryOnclickHandler(e.target.value);
                        }}>확인
                        </button>
                    </td>
                </tr>
                </>

            )
            curDay += 1;
        }


        return arr;
    }
    return (
        <>
        {attendHistoryBtn && <AttendHistoryModal attendNo={attendNo} setattendHistoryBtn={setattendHistoryBtn} attendAdmin={attendAdmin} month={month}/>}
        {attModifyBtn && <ModifyAttendModal setModifyBtn={setAttModifyBtn} attendNo={attendNo} empName={empAttendInfo[0].empName} attendAdmin={attendAdmin}/>}
        <div className="attendModal">
            <div className="attendModal-container">
                <div className="attendmodalcontent">
                    <div className="modifiedHeader">
                        <span className="attendEmpName">{empAttendInfo[0].empName}</span>
                        <input value={month} className="attendcal" type="month" onChange={(e) => setMonth(e.target.value)}/>
                        <button className="modifibtn" onClick={() => {
                            setAttendModal(false)
                        }}>X
                        </button>
                    </div>
                    <table className="headattend">
                        <thead>
                        <tr className="attendmodalHead">
                            <td>날짜</td>
                            <td>구분</td>
                            <td>근무시간</td>
                            <td>연장 근무</td>
                            <td>비고</td>
                            <td>수정이력</td>
                        </tr>
                        </thead>
                    </table>

                    <table className="attendbodyTable">
                        <tbody className="adminattendbody">
                        {getAttend(month)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}



export default AttendModal;
import {useState} from "react";
import AttendHistoryModal from "./AttendHistoryModal";

function AttendModal({attendAdmin, setMonth, month, empNo, setAttendModal, attendAdmin: {data: {responseAttendAdmin: {content}}}}) {
    console.log(empNo)
    const empAttendInfo = content.filter((content) => content.empCode == empNo);
    console.log(empAttendInfo)
    console.log("abcd",attendAdmin);
    const curMonth = month.substring(5);

    const date = new Date;
    const lastDay = new Date(date.getFullYear(), Number(curMonth), 0).getDate();
    const [attendNo, setAttendNo] = useState(0);
    const [attendHistoryBtn, setattendHistoryBtn] = useState(false);
    const attendHistoryOnclickHandler = (code) => {
        setattendHistoryBtn(true);
        setAttendNo(code)
        console.log(attendNo)

    }
    const getAttend = (month) => {
        const curDate = month + '-01';
        let curDay =  new Date(curDate).getDay();
        const day = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];



        let arr = [];
        for (let i = 0; i < lastDay; i++) {
            arr.push(
                <tr key={i}>
                    <td>{curMonth}. {i + 1} {day[curDay%7]}</td>
                    <td>{empAttendInfo[0].attendList[i]?.type}</td>
                    <td>{empAttendInfo[0].attendList[i]?.enterTime}{empAttendInfo[0].attendList[i]?.enterTime ? '~' : ''}{empAttendInfo[0].attendList[i]?.leaveTime}</td>
                    <td>{empAttendInfo[0].attendList[i]?.attendTime}{empAttendInfo[0].attendList[i]?.attendTime ? '시간' : ''} </td>
                    <td>{empAttendInfo[0].attendList[i]?.note}</td>
                    <td>
                        <button onClick={() => {
                            attendHistoryOnclickHandler(empAttendInfo[0].attendList[i]?.attendCode)
                        }}>확인
                        </button>
                    </td>
                </tr>
            )
            curDay += 1;
        }
        return arr;
    }
    return (
        <>
        {attendHistoryBtn && <AttendHistoryModal attendNo={attendNo} setattendHistoryBtn={setattendHistoryBtn} attendAdmin={attendAdmin} month={month}/>}
        <div className="attendModal">
            <div className="attendModal-container">
                <div className="attendmodalcontent">
                    <div className="modifiedHeader">
                        <span>{empAttendInfo[0].empName}</span>
                        <input type="month" onChange={(e) => setMonth(e.target.value)}/>
                        <button onClick={() => {
                            setAttendModal(false)
                        }}>X
                        </button>
                    </div>
                    <table>
                        <thead>
                        <tr className="attendmodalHead">
                            <td>날짜</td>
                            <td>구분</td>
                            <td colSpan="2">근무시간</td>
                            <td>비고</td>
                            <td>수정이력</td>
                        </tr>
                        </thead>
                    </table>


                    <table style={{paddingTop:130}}>
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
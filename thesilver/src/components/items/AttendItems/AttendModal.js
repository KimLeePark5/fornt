import {useRef, useState} from "react";
import AttendHistoryModal from "./AttendHistoryModal";
import {style} from "redux-logger/src/diff";
import ModifyAttendModal from "./ModifyAttendModal";


function AttendModal({
                         attendAdmin,
                         setMonth,
                         month,
                         empNo,
                         setAttendModal,
                         attendAdmin: {data: {responseAttendAdmin: {content}}}
                     }) {
    console.log(empNo)
    const empAttendInfo = content.filter((content) => content.empCode == empNo)[0];
    console.log(empAttendInfo)
    console.log("abcd", attendAdmin);

    const curMonth = month.substring(5);
    const keyValue = useRef();
    const date = new Date;
    const lastDay = new Date(date.getFullYear(), Number(curMonth), 0).getDate();
    const [attendNo, setAttendNo] = useState(0);
    const [attendHistoryBtn, setattendHistoryBtn] = useState(false);
    const [attModifyBtn, setAttModifyBtn] = useState(false);
    const day22 = useRef();
    console.log(attendHistoryBtn)
    console.log(attModifyBtn)
    const escKeyModalClose = (e) => {
        console.log(e)
        if (e.key == 'Escape') {
            if (attendHistoryBtn) {
                setattendHistoryBtn(false);
            } else if (attModifyBtn) {
                setAttModifyBtn(false);
            }else{
                setAttendModal(false);
            }
        }
    };
    window.addEventListener("keydown", escKeyModalClose);

    const attendHistoryOnclickHandler = (code) => {

        setattendHistoryBtn(true);
        setAttendNo(code)


    }
    const attendModifyBtnHandler = (code) => {
        if (!code) {
            return;
        }
        console.log(code)
        setAttendNo(code)
        setAttModifyBtn(true)
    }


    const matchDay = (month) => {
        return empAttendInfo.attendList.filter(attend => attend.attendDate == month)[0];
    }
    const getAttend = (month) => {
        const curDate = month + '-01';
        let curDay = new Date(curDate).getDay();
        const day = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];


        let arr = [];

        for (let i = 0; i < lastDay; i++) {
            let dayInfo = matchDay(`${month}-${String(i + 1).length == 1 ? '0' + (i + 1) : i + 1}`);
            console.log('day :', dayInfo)
            arr.push(
                <div key={i} className="attenddiv" onClick={(e) => attendModifyBtnHandler(dayInfo?.attendCode)}>
                    <div ref={day22} style=
                        {
                            curDay % 7 == 0 ? {
                                color: 'red'
                            } : curDay % 7 == 6 ? {
                                color: 'blue'
                            } : {}
                        }>
                        {curMonth}. {i + 1} {day[curDay % 7]} </div>
                    <div style={{marginLeft: 10}}>{dayInfo?.type}</div>
                    <div style={{
                        width: 220,
                        marginLeft: 10
                    }}>{dayInfo?.enterTime}{dayInfo?.enterTime ? '  ~ ' : ''}{dayInfo?.leaveTime}</div>
                    <div
                        style={{marginLeft: 5}}>{dayInfo?.attendTime == 0 ? '' : dayInfo?.attendTime}{dayInfo?.attendTime ? '시간' : ''} </div>
                    <div style={{marginLeft: 28}}>{dayInfo?.note}</div>
                    <div style={{marginLeft: 26}}>
                        <button ref={keyValue} value={dayInfo?.attendCode} className="getmodibtn" onClick={(e) => {
                            e.stopPropagation();
                            attendHistoryOnclickHandler(e.target.value);
                        }}>확인
                        </button>
                    </div>
                </div>
            )
            curDay += 1;
        }


        return arr;
    }
    return (
        <>
            {attendHistoryBtn && <AttendHistoryModal attendNo={attendNo} setattendHistoryBtn={setattendHistoryBtn}
                                                     attendAdmin={attendAdmin} month={month}
                                                     today={day22.current ? day22.current.textContent : ''}/>}
            {attModifyBtn &&
                <ModifyAttendModal setModifyBtn={setAttModifyBtn} attendNo={attendNo} empName={empAttendInfo.empName}
                                   attendAdmin={attendAdmin}/>}

            <div className="attendModal">
                <div className="attendModal-container">
                    <div className="attendmodalcontent">
                        <div className="modifiedHeader">
                            <span>{empAttendInfo.empName} </span><span
                            style={{fontSize: 18, color: '#a3a1a1'}}> {empAttendInfo.empRank}</span>
                            <input value={month} className="attendcal" type="month"
                                   onChange={(e) => setMonth(e.target.value)}/>
                            <button className="modifibtn" onClick={() => {
                                setAttendModal(false)
                            }}>X
                            </button>
                        </div>
                        <div className="headattend">
                            <div style={{marginLeft: 75}}>날짜</div>
                            <div style={{marginLeft: 75}}>구분</div>
                            <div style={{marginLeft: 110}}>출/퇴근시간</div>
                            <div style={{marginLeft: 80}}>근무시간</div>
                            <div style={{marginLeft: 75}}>비고</div>
                            <div style={{marginLeft: 75}}>수정이력</div>
                        </div>
                        <div className="attendbodyTable">
                            {getAttend(month)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default AttendModal;
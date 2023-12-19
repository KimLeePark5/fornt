
import {useRef, useState} from "react";
import AttendHistoryModalTwo from "./AttendHistoryModalTwo";
import ModifyAttendModalTwo from "./ModifyAttendModalTwo";

function AttendModalTwo({attendAdmin:{data :{responseAttendAdminTwos:{content}}}, setAttendModal, month, setMonth, empNo, attendAdmin}) {


    const empAttendInfo = content.filter((content) => content.empCode == empNo);
    console.log(empAttendInfo)

    const curMonth = month.substring(5);
    const keyValue = useRef();
    const date = new Date;
    const lastDay = new Date(date.getFullYear(), Number(curMonth), 0).getDate();
    const [attendNo, setAttendNo] = useState(0);
    const [attendHistoryBtn, setattendHistoryBtn] = useState(false);
    const [attModifyBtn, setAttModifyBtn] = useState(false);
    const day22 =useRef();

    const attendHistoryOnclickHandler = (code) => {
        setattendHistoryBtn(true);
        setAttendNo(code)
    }
    const attendModifyBtnHandler = (code)=>{
        if(!code){
            return;
        }
        console.log(code)
        setAttendNo(code)
        setAttModifyBtn(true)
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
                <div key={i} className="attenddiv" onClick={(e) => attendModifyBtnHandler(dayInfo[0]?.attendCode) }>
                    <div  ref={day22} style=
                            {
                            curDay%7 == 0 ? {
                        color:'red'
                    } : curDay%7 == 6 ? {
                           color:'blue'
                        } : {}
                    }>
                        {curMonth}. {i + 1} {day[curDay%7]} </div>
                    <div style={{marginLeft:10}}>{dayInfo[0]?.enterTime != null ? dayInfo[0]?.type : ''}</div>
                    <div style={{width:220,marginLeft:10}}>{dayInfo[0]?.enterTime}{dayInfo[0]?.enterTime ? '  ~ ' : ''}{dayInfo[0]?.leaveTime}</div>
                    <div style={{marginLeft:5}}>{dayInfo[0]?.attendTime == 0 ? '' : dayInfo[0]?.attendTime-1 <=0 ? '' : dayInfo[0]?.attendTime}{dayInfo[0]?.attendTime ? '시간' : ''} </div>
                    <div style={{marginLeft:28}}>{dayInfo[0]?.note}</div>
                    <div style={{marginLeft:26}}>
                        <button ref={keyValue} value={dayInfo[0]?.attendCode} className="getmodibtn" onClick={(e) => {
                            e.stopPropagation();
                            attendHistoryOnclickHandler(e.target.value);
                        }} style={ i < new Date().getDate() ? null : {display:"none"}}>확인
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
        {attendHistoryBtn && <AttendHistoryModalTwo attendNo={attendNo} setattendHistoryBtn={setattendHistoryBtn} attendAdmin={attendAdmin} month={month} today={day22.current ? day22.current.textContent : ''}/>}
        {attModifyBtn && <ModifyAttendModalTwo setModifyBtn={setAttModifyBtn} attendNo={attendNo} empName={empAttendInfo[0].empName} attendAdmin={attendAdmin}/>}

        <div className="attendModal">
            <div className="attendModal-container">
                <div className="attendmodalcontent">
                    <div className="modifiedHeader">
                        <span>{empAttendInfo[0].empName} </span><span style={{fontSize:18,color:'#a3a1a1'}}> {empAttendInfo[0].empRank}</span>
                        <input value={month} className="attendcal" type="month" onChange={(e) => setMonth(e.target.value)}/>
                        <button className="modifibtn" onClick={() => {
                            setAttendModal(false)
                        }}>X
                        </button>
                    </div>
                    <div className="headattend">
                            <div style={{marginLeft:75}}>날짜</div>
                            <div style={{marginLeft:75}}>구분</div>
                            <div style={{marginLeft:110}}>출/퇴근시간</div>
                            <div style={{marginLeft:80}}>근무시간</div>
                            <div style={{marginLeft:75}}>비고</div>
                            <div style={{marginLeft:75}}>수정이력</div>
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




export default AttendModalTwo;
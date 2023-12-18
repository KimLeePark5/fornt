import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callModifyAttendAPI} from "../../../apis/AttendAPICalls";

function ModifyAttendModalTwo({attendNo, setModifyBtn, attendAdmin, empName, attendAdmin : {data:{responseAttendAdminTwos:{content}}}}) {
    console.log(attendAdmin);
    const modifyhistory = (content.filter(con => con.empName == empName))[0].attendList.filter(att => att.attendCode == attendNo)[0]

    console.log("modifyHistory",modifyhistory)
    const dispatch = useDispatch();
    const [form, setForm] = useState({})

    const formChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form)
    }

    const {attendModifySuccess} = useSelector(state=>state.attendReducer)

    if(attendModifySuccess){
        setModifyBtn(false)
    }
    const onClickHandler = () => {
        dispatch(callModifyAttendAPI(form, attendNo))
    }
    return (
        <>
            <div className="modifyModal">
                <div className="modifyModal-container">
                    <div className="modifyModalContent">
                        <div className="attmodifyHead">
                            <div className="attmodifyHead1">{empName}</div>
                            <div className='attmodifyHead2'>{modifyhistory.attendDate}</div>
                            <div className='attmodifyHead4'>수정하기</div>
                        </div>
                        <select name='type' onChange={formChangeHandler} value={form.type || modifyhistory.type}
                                className="attselectForm">
                            <option value="기본근무" className='atop'>기본근무</option>
                            <option value="연장근무" className='atop'>연장근무</option>
                        </select>
                        <select name='note' onChange={formChangeHandler} value={form.note || modifyhistory.note}
                                className="attselectForm" style={{marginLeft: '25px'}}>
                            <option value="" className='atop'>결근</option>
                            <option value="결근" className='atop'>결근</option>
                            <option value="지각" className='atop'>지각</option>
                            <option value="조퇴" className='atop'>조퇴</option>
                            <option value="휴가" className='atop'>휴가</option>
                            <option value="오후반차" className='atop'>오후반차</option>
                            <option value="오전반차" className='atop'>오전반차</option>
                        </select>
                        <div className='atttimecon'>
                            <div>
                                <p>출근시간</p>
                                <input className='inputtimeatt' type='time' name='enterTime' value={form.enterTime || modifyhistory.enterTime}
                                       onChange={formChangeHandler}/>
                            </div>
                            <div>
                                <p>퇴근시간</p>
                                <input  className='inputtimeatt' type='time' name='leaveTime' value={form.leaveTime || modifyhistory.leaveTime}
                                       onChange={formChangeHandler}/>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        setModifyBtn(false)
                    }} className='attmodifyBtn1'>취소</button>
                    <button onClick={onClickHandler} className='attmodifyBtn'>수정하기</button>
                </div>
            </div>
        </>
    )
}

export default ModifyAttendModalTwo;
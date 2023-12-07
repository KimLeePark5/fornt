import {useState} from "react";
import {useDispatch} from "react-redux";
import {callModifyAttendAPI} from "../../../apis/AttendAPICalls";

function ModifyAttendModal({setModifyBtn, attendNo, empName, attendAdmin: {data: {responseAttendAdmin: {content}}}}) {
    const history = content.map(a => a.attendList.filter(att => att.attendCode == attendNo))

    const modifyhistory = history[0][0];
    const dispatch = useDispatch();
    const [form, setForm] = useState({})

    const formChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form)
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
                            <option value="기본근무">기본근무</option>
                            <option value="연장근무">연장근무</option>
                        </select>
                        <select name='note' onChange={formChangeHandler} value={form.note || modifyhistory.note}
                                className="attselectForm" style={{marginLeft: '25px'}}>
                            <option value="결근">결근</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
                            <option value="휴가">휴가</option>
                            <option value="오후반차">오후반차</option>
                            <option value="오전반차">오전반차</option>
                        </select>
                        <div className='atttimecon'>
                            <div>
                                <p>출근시간</p>
                                <input className='inputtimeatt' type='time' name='enterTime' value={form.enterTime || modifyhistory.enterTime}
                                       onChange={formChangeHandler}/>
                            </div>
                            <div style={{marginLeft:'140px'}}>
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

export default ModifyAttendModal;
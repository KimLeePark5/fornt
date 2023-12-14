import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {callSearchNameAPICalls} from "../../../apis/AttendAPICalls";
import {useNavigate} from "react-router-dom";

function AdminAttendHeader({month, setMonth, name}) {
    const inputMonth = useRef('');
    const date = new Date();
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState();
    const [value,setValue]=useState('');
    const onChangeSearchNameHnadler = (e) => {
        setSearchName(e.target.value)
    }
    const onClickSearchHandler = () => {
        navigate(`/attend-management/search?name=${searchName}`)
    }
    const attendSearchCategory = (e)=>{
        console.log(e.target.value)
        setValue(e.target.value)
        navigate(`/attend-management/sort?sort=${e.target.value}`)
    }
    const month1 = useRef(Number(date.getMonth() + 1));
    const year1 = useRef(Number(date.getFullYear()));

    const onClickUpHandler = () => {
        if (month1.current == 1) {
            year1.current = year1.current - 1
            month1.current = 12;
        } else (month1.current = month1.current - 1)

        setMonth(year1.current + '-' + (String(month1.current).length == 1 ? '0' + month1.current : month1.current))
    }
    const onClickDownHandler = () => {

        if (month1.current == 12) {
            year1.current = year1.current + 1
            month1.current = 1
        } else (month1.current = month1.current + 1)
        setMonth(year1.current + '-' + (String(month1.current).length == 1 ? '0' + month1.current : month1.current))
    }

    const onChangeMonthHandler = (e) => {
        setMonth(e.target.value)
    }

    return (
        <>
                    <div className="admin-attend-head">
                        <input type="text" placeholder="이름으로 검색" value={ searchName != null ? searchName : name != null ? name : ''} onChange={onChangeSearchNameHnadler} className="attendNameBox"/>
                        <button type="button" onClick={onClickSearchHandler} className="attendNameBtn">검색</button>
                        <input type="month" value={month} onChange={onChangeMonthHandler} ref={inputMonth} style={{display:"none"}}/>

                        <div className="attendMonth">
                        <button onClick={onClickUpHandler} className="attendMonthbtn">&lt;</button>
                        <div style={{
                            paddingTop:3
                        }}>{inputMonth.current ? inputMonth.current.value : date.getFullYear()+'-'+(date.getMonth()+1)}</div>
                        <button onClick={onClickDownHandler} className="attendMonthbtn">&gt;</button>
                        </div>
                        <select onChange={attendSearchCategory} className='categoryInput' >
                            <option value='default'>기본</option>
                            <option value='team'>팀</option>
                            <option value='abs'>결근</option>
                            <option value='late'>지각</option>
                            <option value='vac'>휴가</option>
                            <option value='leaveE'>조퇴</option>
                            <option value='atTime'>근무시간</option>
                        </select>
                    </div>


        </>
    )
}

export default AdminAttendHeader;
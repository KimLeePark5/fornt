import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import employeeInfo from "../../items/AttendItems/EmployeeInfo";
import {callVacationRequireAPI} from "../../../apis/VacationAPICalls";
import {useDispatch, useSelector} from "react-redux";

function RequireForm({isOpen, closeModal}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        vacationType: "1",
    });

    const {requireSuccess} = useSelector(state => state.vacationReducer);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    DatePicker.propTypes = {
        onChange: PropTypes.func,
        selectsStart: PropTypes.bool,
        endDate: PropTypes.any,
        dateFormat: PropTypes.string,
        placeholderText: PropTypes.string,
        selected: PropTypes.any,
        startDate: PropTypes.any
    };


    // 날짜로 조회 하기
    // 시작 날짜와 종료 날짜의 상태
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // 날짜가 선택됐을 때 실행되는 콜백 함수
    const handleStartDateChange = (date) => {setStartDate(date);};
    const handleEndDateChange = (date) => {setEndDate(date);};
    // 연차 사용 일 수 조회하기
    // 날짜 차이를 계산
    const timeDiff = endDate - startDate;
    // 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onClickRequireHandler = () => {
        const updateForm = {
            ...form
        }
        dispatch(callVacationRequireAPI({requireForm: updateForm}))
    }

    useEffect(() => {
        if(requireSuccess) {
            alert("연차 신청이 완료 되었습니다.");
            window.location.href = "/vacation"
        }
    }, [requireSuccess])

    return (
        <div style={{display: isOpen ? "block" : "none"}}>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgb(0,0,0,0.3)"
                }}
            ></div>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 750,
                    height: 900,
                    overflowY: "auto",
                    backgroundColor: "white",
                    border: "#1A1A1C 1px solid",
                    borderRadius: "10px"
                }}
            >
                <>
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize:"30px",
                            fontWeight:"700",
                            margin:"25px 0 20px 0"}}>연차 신청</h1>
                    <div className="vacation-require-form">
                        <div className="vacation-require-form1">
                            <p  className="form1-1">성명</p>
                            <p name="name" className="form1-2">{employeeInfo.name}</p>
                            <p className="form1-1">직급</p>
                            <p name="rank">{employeeInfo.rankname}</p>
                        </div>
                        <div  className="vacation-require-form2">
                            <p className="form2-1">구분</p>
                            <select name="vacationType" className="form2-2" onChange={onChangeHandler}>
                                <option value="1">연차</option>
                                <option value="2">오전 반차</option>
                                <option value="3">오후 반차</option>
                                <option value="4">경조사</option>
                            </select>
                            <p name="srattAndEndDate" className="form2-1" >기간</p>
                            <p className="form2-2" onChange={onChangeHandler}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="시작 날짜"
                                    dateFormat="yyyy년 MM월 dd일"
                                />
                                <span>&nbsp; ~ &nbsp;</span>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="종료 날짜"
                                    dateFormat="yyyy년 MM월 dd일"
                                />
                                <span name="countDate">{daysDiff}일</span>
                            </p>

                            <p className="form2-3">내용</p>
                            <p>
                                <input name="content" onChange={onChangeHandler} type="text"/>
                            </p>
                        </div>
                        <div className="vacation-require-form3">
                            <p style={{fontSize: "14px", paddingLeft: "55px"}}>
                                <br/>
                                <br/>
                                1.연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여 연차에 한하여 사용함을 원칙으로 한다.<br/>
                                단, 최초 입사시에는 근로 기준법에 따라 발생 예정 된 연차를 차용하여 월 1회 사용할 수 있다.<br/>
                                2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본 ,청첩장 등 제출 한다.<br/>
                                3. 공가(예비군/민방위)는 사전에 통지서를, 사후에는 참석증을 반드시 제출 한다.
                                <br/>
                                <br/>
                            </p>
                            <p name="today" style={{fontSize: "15px", textAlign: "center", marginTop:"25px"}}>{formattedDate}</p>
                            <p name="RequirePerson" style={{fontSize: "15px", textAlign: "right", padding: "20px 50px 30px 0"}}>서명 : </p>
                        </div>
                        <div className="vacation-require-form4">
                            <p className="form4-1">조직도자리</p>
                            <p name="approver">선택한 사람 넘어오는 자리</p>
                        </div>
                    </div>
                </>
                <div className="require-form-btn">
                    <button
                        onClick={closeModal}
                        style={{marginRight:"30px"}}>취소</button>
                    <button onClick={onClickRequireHandler}>상신</button>
                </div>
            </div>
        </div>
    );
}

export default RequireForm;
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PagingBar from "../components/common/PagingBar";

function Vacation() {
    // 현재 날짜 가져오기
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    // 시작 날짜와 종료 날짜의 상태
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // 날짜가 선택됐을 때 실행되는 콜백 함수
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    //use-vacation-list 부분 페이징
    // const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacation-state">
                <div className="vacation-today">
                    <h3>{formattedDate}</h3>
                </div>
                <div className="vacation-state-content"></div>
            </div>
            <div className="require-state">
                <div className="require-content">
                    <h3>상신 현황</h3>
                    <button className="vacation-require-btn">연차 신청</button>
                </div>
                <div className="require-list"></div>
            </div>
            <div className="use-state">
                <div className="use-content">
                    <h3>사용 내역</h3>
                    <div className="select-days">
                        <span>기간 :&nbsp;&nbsp;</span>
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
                    </div>
                </div>
                <div className="use-vacation-list">
                    {/*<PagingBar pageInfo={vacation.pageInfo} setCurrentPage={setCurrentPage}/>*/}
                </div>
            </div>
        </>
    );
}

export default Vacation;
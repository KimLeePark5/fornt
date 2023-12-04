import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import {useNavigate} from "react-router-dom";
import RequireForm from "../../components/vacation/form/RequireForm";
import axios from "axios";
import VacationStateItem from "../../components/vacation/items/VacationStateItem";


function Vacation() {

    const navigate = useNavigate();

    // 현재 날짜 가져오기
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    // 연차현황 불러오기
    const [vacationData, setVacationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/vacation/{employeeCode}');
                setVacationData(response.data);
            } catch (error) {
                console.error('Error fetching vacation data:', error);
            }
        };
        fetchData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출



    // 연차 신청 모달 창
    const[isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 날짜로 조회 하기
    // 시작 날짜와 종료 날짜의 상태
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // 날짜가 선택됐을 때 실행되는 콜백 함수
    const handleStartDateChange = (date) => {
        setStartDate(date);};
    const handleEndDateChange = (date) => {
        setEndDate(date);};



    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacation-state">
                <div className="vacation-today">
                    <h3>{formattedDate}</h3>
                </div>
                <div className="vacation-state-content">
                    {/* vacationData가 있을 때 VacationStateItem 컴포넌트를 렌더링 */}
                    {vacationData && <VacationStateItem vacation={vacationData} />}
                </div>
            </div>
            <div className="require-state">
                <div className="require-content">
                    <h3>상신 현황</h3>
                    <button className="vacation-require-btn"
                            onClick={ openModal }>
                        연차 신청
                    </button>
                    <RequireForm isOpen={isModalOpen} closeModal={closeModal}/>
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
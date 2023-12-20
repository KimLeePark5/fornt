import { useDispatch, useSelector } from "react-redux";
import employeeInfo from "../../items/AttendItems/EmployeeInfo";
import { useState } from "react";
import SignForm from "../form/SignForm";

function ProceedRequireItem({ data }) {
    console.log("ProceedRequire 데이터가 있나요? :", data);

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // 날짜 차이를 계산
    const timeDiff = endDate - startDate;
    // 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const isHalfDay = data.vacationName === '오전반차' || data.vacationName === '오후반차';
    const adjustedDaysDiff = isHalfDay ? daysDiff - 0.5 : daysDiff;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReqNo, setCurrentReqNo] = useState(null);


    const openModal = (reqNo) => {
        console.log('openModal 호출됨');
        setCurrentReqNo(reqNo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentReqNo(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            {data && (
                <div className="require-proceed-body" onClick={() => openModal(data.reqNo)}>
                    <SignForm isOpen={isModalOpen} closeModal={closeModal} data={data} />
                    <div className="rpb1">{data.employeeName}</div>
                    <div className="rpb1">{data.vacationName}</div>
                    <div className="rpb2">
                        {data.startDate} ~ {data.endDate}
                    </div>
                    <div className="rpb3">{adjustedDaysDiff} 일</div>
                    <div className="rpb3">{data.reqStatus}</div>
                    <div className="rpb4">{data.reqDate}</div>
                </div>
            )}
        </div>
    );
}

export default ProceedRequireItem;

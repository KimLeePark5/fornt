
import React, {useEffect, useState} from "react";
import RequireForm from "../form/RequireForm";
import RequireStateItem from "../items/RequireStateItem";
import {callRequireFormOpen} from "../../../apis/VacationAPICalls";
import vacation from "../../../pages/vacation/Vacation";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

function RequireStateList({require}) {

    // 연차 신청 모달 창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);

    }

    const {employeeCode} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callRequireFormOpen(vacation));
    }, [employeeCode]);
    return (
        <>
            <div className="require-content">
                <h3>상신 현황</h3>
                <button className="vacation-require-btn"
                        onClick={openModal}
                >
                    연차 신청
                </button>
                <RequireForm isOpen={isModalOpen} closeModal={closeModal} require={require}/>
            </div>
            <div className="require-state">
                <div className="require-state-head">
                    <div>종류</div>
                    <div>사용 기간</div>
                    <div>사용 일자</div>
                    <div>내용</div>
                    <div>상태</div>
                    <div>시간</div>
                </div>
                {require?.map(data => <RequireStateItem key={data.employeeCode} data={data}/>)}
            </div>
        </>
    )
}

export default RequireStateList;
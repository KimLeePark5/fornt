import RequireForm from "../form/RequireForm";
import React, {useState} from "react";
import RequireStateItem from "../items/RequireStateItem";

function RequireStateList ({data}) {

    // 연차 신청 모달 창
    const[isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="require-state">
                <div className="require-content">
                    <h3>상신 현황</h3>
                    <button className="vacation-require-btn"
                            onClick={openModal}>
                        연차 신청
                    </button>
                    <RequireForm isOpen={isModalOpen} closeModal={closeModal}/>
                </div>
                <div className="require-state-head">
                    <div>종류</div>
                    <div>사용 기간</div>
                    <div>사용 일자</div>
                    <div>내용</div>
                    <div>상태</div>
                    <div>시간</div>
                </div>
                {data.map(require => <RequireStateItem key={require.employeeCode} require={require} />)}
            </div>
        </>
    )
}

export default RequireStateList;
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callRequireStateAPI} from "../../../apis/VacationAPICalls";
import RequireForm from "../form/RequireForm";
import RequireStateItem from "../items/RequireStateItem";

function RequireStateList() {

    // 연차 신청 모달 창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const dispatch = useDispatch();
    const employeeCode = useSelector(state => state.employeeCode);
    const {require} = useSelector(state => state.vacationReducer);

    useEffect(() => {
        dispatch(callRequireStateAPI());
    }, [employeeCode]);

    console.log("requireState 데이터 있나요? : ", require)


    return (
        <>
            <div className="require-content">
                <h3>상신 현황</h3>
                <button className="vacation-require-btn"
                        onClick={openModal}>
                    연차 신청
                </button>
                <RequireForm isOpen={isModalOpen} closeModal={closeModal}/>
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
                {require?.map(data => <RequireStateItem key={require.employeeCode} data={data}/>)}
            </div>
        </>
    )


}

export default RequireStateList;
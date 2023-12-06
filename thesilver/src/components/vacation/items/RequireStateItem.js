import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import {callRequireStateAPI} from "../../../apis/VacationAPICalls";
import RequireForm from "../form/RequireForm";


function RequireStateItem() {
    const { require } = useSelector((state) => state.vacationReducer);
    const dispatch = useDispatch();
    const employeeCode = useSelector(state => state.employeeCode);

    // 연차 신청 모달 창
    const[isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        console.log("employeeCode : ", employeeCode)
        dispatch(callRequireStateAPI());
    }, [employeeCode]);

    console.log("requireState 데이터 있나요? : ", require)

    return (

        <div className="require-state">
            <div className="require-content">
                <h3>상신 현황</h3>
                <button className="vacation-require-btn"
                        onClick={openModal}>
                    연차 신청
                </button>
                <RequireForm isOpen={isModalOpen} closeModal={closeModal}/>
            </div>
            {require && (
                <div className="require-state-content">
                    <div className="requireState-list">
                        <div>
                            <div>종류</div>
                            <div>{ require.vacationTypeCode }</div>
                        </div>
                        <div>
                            <div>사용 기간</div>
                            <div>{ require.startDate } + "~" + { require.endDate }</div>
                        </div>
                        <div>
                            <div>사용 일자</div>
                            <div>{ require.endDate - require.startDate }</div>
                        </div>
                        <div>
                            <div>내용</div>
                            <div>{ require.reqContent }</div>
                        </div>
                        <div>
                            <div>상태</div>
                            <div>{ require.reqStatus }</div>
                        </div>
                        <div>
                            <div>시간</div>
                            <div>{ require.reqDate }</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RequireStateItem;

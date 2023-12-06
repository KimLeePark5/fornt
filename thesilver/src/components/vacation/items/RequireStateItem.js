import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import { callVacationStateAPI } from "../../../apis/VacationAPICalls";
import RequireForm from "../form/RequireForm";


function VacationStateItem() {
    const { vacation } = useSelector((state) => state.vacationReducer);
    const dispatch = useDispatch();
    const employeeCode = useSelector(state => state.employeeCode);

    // 연차 신청 모달 창
    const[isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        console.log("employeeCode : ", employeeCode)
        dispatch(callVacationStateAPI());
    }, [employeeCode]);

    console.log("데이터 있나요? : ", vacation)

    return (

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
    );
}

export default VacationStateItem;

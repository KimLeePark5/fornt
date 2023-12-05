import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { callVacationStateAPI } from "../../../apis/VacationAPICalls";


function VacationStateItem() {
    const { vacation } = useSelector((state) => state.vacationReducer);
    const dispatch = useDispatch();
    const employeeCode = useSelector(state => state.employeeCode);

    // 현재 날짜 가져오기
    const currentDate = new Date();
    const vacationDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    useEffect(() => {
        dispatch(callVacationStateAPI(employeeCode));
    }, [employeeCode]);

    return (
        <div className="vacation-state">
            <div className="vacation-today">
                <h3>{vacationDate}</h3>
            </div>
            {vacation && (
                <div className="vacation-state-content">
                    <div className="state-detail">
                        <div>
                            <div className="state-name">직원명</div>
                            <div className="state-result">{vacation.employee.employeeName}</div>
                        </div>
                        <div>
                            <div className="state-name">발생 연차</div>
                            <div className="state-result">{vacation.occurVacation}</div>
                        </div>
                        <div>
                            <div className="state-name">총 연차</div>
                            <div className="state-result">{vacation.totalVacation}</div>
                        </div>
                        <div>
                            <div className="state-name">사용 연차</div>
                            <div className="state-result">{vacation.useVacation}</div>
                        </div>
                        <div>
                            <div className="state-name">잔여 연차</div>
                            <div className="state-result">{vacation.occurVacation - vacation.useVacation}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VacationStateItem;

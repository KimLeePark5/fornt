import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import usedVacationItem from "./UsedVacationItem";


function VacationStateItem() {

    const { vacation } = useSelector((state) => state.vacationReducer);

    console.log("vacationStateItem 테이터가 있나요? : ", vacation);

    // 현재 날짜 가져오기
    const currentDate = new Date();
    const vacationDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
    const occurYear = `${currentDate.getFullYear()}년 기준`;

    return (
        <div className="vacation-state-div">
            <div className="vacation-today">
                <h3>{vacationDate}</h3>
            </div>
            <div className="vacation-state-content">
                <div className="state-detail">
                    <div className="state-result-name" title="좋은 하루 되세요!">{ vacation.employeeName + " 님" }</div>
                    <div title={occurYear}>
                        <div className="state-name">발생 연차</div>
                        <div className="state-result">{ vacation.occurVacation }</div>
                    </div>
                    <div>
                        <div className="state-name">총 연차</div>
                        <div className="state-result">{ vacation.occurVacation }</div>
                    </div>
                    <div>
                        <div className="state-name">사용 연차</div>
                        <div className="state-result">{ vacation.useVacation }</div>
                    </div>
                    <div>
                        <div className="state-name">잔여 연차</div>
                        <div className="state-result">{ vacation.occurVacation - vacation.useVacation }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationStateItem;
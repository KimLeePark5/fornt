import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

import VacationStateList from "../../components/vacation/lists/VacationStateList";
import RequireStateList from "../../components/vacation/lists/RequireStateList";
import UsedVacationList from "../../components/vacation/lists/UsedVacationList";
import PagingBar from "../../components/common/PagingBar";
import {callRequireStateAPI, callUsedVacationAPI, callVacationStateAPI} from "../../apis/VacationAPICalls";



function VacationState() {

    const dispatch = useDispatch();
    const {employeeCode, require, usedVacation} = useSelector(state => state.vacationReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callVacationStateAPI({employeeCode}));
    }, [employeeCode]);


    useEffect(() => {
        dispatch(callRequireStateAPI({employeeCode}));
    }, [employeeCode]);

    useEffect(() => {
        dispatch(callUsedVacationAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacationStateContent">
                <VacationStateList/>
            </div>
            <div className="Reiuire-state-list">
                <RequireStateList/>
            </div>
            <div className="used-vacation-list">
                <UsedVacationList/>
                <PagingBar pageInfo={usedVacation.pageInfo} setCurrentPage={setCurrentPage}/>
            </div>

        </>
    );
}

export default VacationState;
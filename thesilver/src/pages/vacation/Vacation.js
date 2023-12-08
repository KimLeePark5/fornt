import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {callVacationStateAPI} from "../../apis/VacationAPICalls";
import VacationStateList from "../../components/vacation/lists/VacationStateList";
import RequireStateList from "../../components/vacation/lists/RequireStateList";
import UsedVacationList from "../../components/vacation/lists/UsedVacationList";
import PagingBar from "../../components/common/PagingBar";



function Vacation() {

    const dispatch = useDispatch();



    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacationStateContent">
                <VacationStateList/>
                <RequireStateList/>
                <UsedVacationList/>
            </div>
        </>
    );
}

export default Vacation;
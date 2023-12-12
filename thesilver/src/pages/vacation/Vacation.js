import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callRequireStateAPI, callUsedVacationAPI, callVacationStateAPI} from "../../apis/VacationAPICalls";
import {useParams} from "react-router-dom";
import VacationStateItem from "../../components/vacation/items/VacationStateItem";
import RequireStateList from "../../components/vacation/lists/RequireStateList";
import UsedVacationList from "../../components/vacation/lists/UsedVacationList";
import PagingBar from "../../components/common/PagingBar";


function Vacation() {

    const dispatch = useDispatch();
    const {employeeCode} = useParams();
    const {vacation, require, usedVacation} = useSelector(state => state.vacationReducer);
    const [currentPage, setCurrentPage] = useState(1);

    console.log("vacation", vacation)
    console.log("require", require)

    useEffect(() => {
        dispatch(callVacationStateAPI(vacation));
    }, [employeeCode]);

    useEffect(() => {
        dispatch(callRequireStateAPI());
    }, []);

    useEffect(() => {
        dispatch(callUsedVacationAPI({currentPage, usedVacation}));
    }, [currentPage]);


    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            {vacation &&
                <div>
                    <VacationStateItem/>
                </div>
            }
            {require &&
                <div>
                    <RequireStateList require={require}/>
                </div>
            }
            {usedVacation &&
                <div>
                    <UsedVacationList usedVacation={usedVacation}/>
                    <PagingBar pageInfo={usedVacation?.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    )


}

export default Vacation;
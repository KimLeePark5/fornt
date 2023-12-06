
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {callVacationStateAPI} from "../../apis/VacationAPICalls";
import UseVacationListItem from "../../components/vacation/items/UseVacationListItem";
import VacationStateItem from "../../components/vacation/items/VacationStateItem";
import RequireStateItem from "../../components/vacation/items/RequireStateItem";



function Vacation() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callVacationStateAPI)
    }, []);


    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacationStateContent">
                <VacationStateItem/>
                <RequireStateItem/>
                <UseVacationListItem/>
            </div>
        </>
    );
}

export default Vacation;
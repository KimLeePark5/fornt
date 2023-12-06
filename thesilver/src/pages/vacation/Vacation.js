
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {callVacationStateAPI} from "../../apis/VacationAPICalls";
import UseVacationListItem from "../../components/vacation/items/UseVacationListItem";
import VacationStateList from "../../components/vacation/lists/VacationStateList";
import RequireStateList from "../../components/vacation/lists/RequireStateList";



function Vacation() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callVacationStateAPI)
    }, []);


    return (
        <>
            <div className="pageTitle-div">연차 관리</div>
            <div className="vacationStateContent">
                <VacationStateList/>
                <RequireStateList/>
                <UseVacationListItem/>
            </div>
        </>
    );
}

export default Vacation;
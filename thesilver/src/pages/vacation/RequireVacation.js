import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useSelector} from "react-redux";
import RequireForm from "../../components/vacation/form/RequireForm";

function RequireVacation() {

    const navigate = useNavigate();

    const { requireSuccess } = useSelector(state => state.vacationReducer)

    useEffect(() => {
        if(requireSuccess === true) {
            navigate('/vacation');
        }
    })

    return (
        <>
            <div className="background-div">
                <div className="form-div">
                    <RequireForm/>
                </div>
            </div>
        </>
    )
}

export default RequireVacation;
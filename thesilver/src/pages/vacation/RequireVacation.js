import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import Require from "../../components/vacation/require/Require";
import RequireForm from "../../components/vacation/form/RequireForm";

function RequireVacation() {

    const navigate = useNavigate();

    const { requireSuccess } = useSelector(state => state.vacationReducer)

    useEffect(() => {
        if(requireSuccess === true) {
            navigate('/vacation/{employeeCode}');
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
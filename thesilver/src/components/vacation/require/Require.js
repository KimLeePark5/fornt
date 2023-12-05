import {ToastContainer} from "react-toastify";
import RequireForm from "../form/RequireForm";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Require () {

    const navigate = useNavigate();


    return (

        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="background-div">
                <div className="require-div">
                    <RequireForm/>
                </div>
            </div>
        </>
    )
}

export default Require;
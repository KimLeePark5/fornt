import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callResetPasswordAPI} from "../../../apis/LoginAPICalls";
import loginReducer, {resetReset} from "../../../modules/LoginModule";

function FindPwModal({setModal}) {

    const dispatch = useDispatch();
    const [successResult, setSuccessResult] = useState(false)
    const [failResult, setFailResult] = useState(false);
    const [form, setForm] = useState()
    const {resetSuccess} = useSelector(state => state.loginReducer);

    const onClickOutsideHandler = (e) => {
        if (e.target === e.currentTarget) {
            setModal(false)
            dispatch(resetReset())
        }
    }
    const onClickCloseHandler = () => {
        setModal(false)
        dispatch(resetReset())
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    useEffect(() => {
            setSuccessResult(resetSuccess === "on");
            setFailResult(resetSuccess === "off");

    }, [resetSuccess]);


    const onClickHandler = () => {
        dispatch(callResetPasswordAPI({resetPasswordForm : form}))
    }


    return (
        <div className="findModal-page" onMouseDown={onClickOutsideHandler}>
            <div className="findModal-box">
                <div className="findModal-header">비밀번호 찾기</div>
                <div className="findModal-content">
                    <div><input
                        name="employeeNumber"
                        type="text"
                        placeholder="사번을 입력하세요."
                        onChange={onChangeHandler}/></div>
                    <div><input
                        name="employeeEmail"
                        type="email"
                        placeholder="이메일을 입력하세요."
                        onChange={onChangeHandler}/></div>
                    <div className="findModal-button" onClick={onClickHandler}>임시 비밀번호 발송</div>
                </div>
                <div>
                    { successResult &&
                    <div className="findModal-result"> 해당 이메일로 <br/>임시 비밀번호가 발송되었습니다.</div>
                    }
                    { failResult &&
                    <div className="findModal-result-fail"> 등록하신 사번과 <br/>이메일이 일치하지 않습니다.</div>
                    }
                </div>

                <div className="findModal-footer"></div>

                <div className="findModal-close" onClick={onClickCloseHandler}><img
                    src="https://static.thenounproject.com/png/26894-200.png"/></div>
            </div>
        </div>
    )
}

export default FindPwModal;
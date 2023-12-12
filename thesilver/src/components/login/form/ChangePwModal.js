
import {callChangePasswordAPI, callResetPasswordAPI} from "../../../apis/LoginAPICalls";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function ChangePwModal({setModal}) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch();
    const {changePwSuccess} = useSelector(state => state.loginReducer)

    useEffect(() => {
        if(changePwSuccess){
            alert("비밀번호가 성공적으로 변경되었습니다.")
            setModal(false)
            window.location.replace("/");
        }
    }, [changePwSuccess]);

    const onClickOutsideHandler = (e) => {
        if (e.target === e.currentTarget) {
            // eslint-disable-next-line no-restricted-globals
            const confirmResult = confirm("비밀번호를 변경하지 않고 창을 닫으시겠습니까 ?");
            if (confirmResult) {
                setModal(false)
            }
        }
    }
    const onClickCloseHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmResult = confirm("비밀번호를 변경하지 않고 창을 닫으시겠습니까 ?");
        if (confirmResult) {
            setModal(false)
        }
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onClickHandler = () => {
        if (form.newPassword === form.newPasswordCheck) {
            if(form.currentPassword !== form.newPassword) {
                dispatch(callChangePasswordAPI({changePasswordForm: form}))
            } else {
                alert("현재 비밀번호와 변경 비밀번호는 같을 수 없습니다.")
            }
        } else {
            alert("변경 비밀번호가 일치하지 않습니다.")
        }
    }

    return (
        <div id="pwc-modal-page" className="findModal-page" onMouseDown={onClickOutsideHandler}>
            <div id="pwc-modal-box" className="findModal-box">
                <div className="findModal-header">비밀번호 변경</div>
                <div className="pwc-modal-text">임시 비밀번호를 사용 중입니다. <br/> 비밀번호를 변경해 주시기 바랍니다.</div>
                <div className="findModal-content">
                    <div>
                        <div className="pwc-modal-input-title">
                            현재 비밀번호
                        </div>
                        <input
                            name="currentPassword"
                            type="text"
                            placeholder="현재 비밀번호를 입력하세요."
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <div className="pwc-modal-input-title">
                            변경 비밀번호
                        </div>
                        <input
                            name="newPassword"
                            type="text"
                            placeholder="변경 비밀번호를 입력하세요."
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            name="newPasswordCheck"
                            type="email"
                            placeholder="변경 비밀번호 확인"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div id="pwc-modal-button" className="findModal-button" onClick={onClickHandler}>비밀번호 변경</div>
                </div>

                <div className="findModal-footer"></div>

                <div className="findModal-close" onClick={onClickCloseHandler}><img
                    src="https://static.thenounproject.com/png/26894-200.png"/></div>
            </div>
        </div>
    )
}

export default ChangePwModal;
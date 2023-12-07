import {useState} from "react";
import {useDispatch} from "react-redux";
import {callLoginAPI} from "../../../apis/LoginAPICalls";
import FindPwModal from "./FindPwModal";

function LoginForm() {

    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onKeyUpHandler = (e) => {
        if (e.key === 'Enter') {
            console.log(form)
            dispatch(callLoginAPI({"loginForm": form}))
        }
    }

    const onClickHandler = () => {
        console.log(form)
        dispatch(callLoginAPI({"loginForm": form}))
    }

    const onClickModalHandler = () => {
        setModal(true)
    }

    return (
        <>
            <div className="login-content">
                <div>
                    <h2 className="login-content-title">Login</h2>
                </div>

                <div>
                    <input
                        placeholder="직원코드"
                        className="login-input"
                        type="text"
                        name="employeeNumber"
                        onChange={onChangeHandler}
                        onKeyUp={onKeyUpHandler}
                    />
                </div>

                <div>
                    <input
                        placeholder="비밀번호"
                        className="login-input"
                        type="password"
                        name="employeePassword"
                        onChange={onChangeHandler}
                        onKeyUp={onKeyUpHandler}
                    />
                </div>



                <div>
                    <div
                        className="login-content-button"
                        onClick={onClickHandler}
                    >
                        로그인
                    </div>
                </div>

                <div
                    className="login-content-find"
                    onClick={onClickModalHandler}
                >
                    비밀번호 찾기
                </div>

                { modal && (
                    <FindPwModal setModal={setModal}/>
                )}


            </div>
        </>
    )
}

export default LoginForm;
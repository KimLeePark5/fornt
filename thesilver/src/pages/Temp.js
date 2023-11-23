import {useDispatch} from "react-redux";
import {callTestAPI} from "../apis/CustomerAPICalls";

function Temp() {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(callTestAPI())
    }

    return (
        <>
            <div>제목 : 파이팅</div>
            <div>내용 : 진짜 파이팅 ~!</div>
            <button onClick={ onClickHandler }>버튼</button>
        </>
    )
}

export default Temp;
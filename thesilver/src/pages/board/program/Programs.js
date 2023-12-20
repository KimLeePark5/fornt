import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetProgramListAPI, callProgramDeleteAPI} from "../../../apis/ProgramAPICalls";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import PagingBar from "../../../components/common/PagingBar";

import {isAdmin, isMaster} from "../../../utils/TokenUtils";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function Programs() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {programs} = useSelector(state => state.programReducer);
    const navigate = useNavigate();

    useEffect(() => {
        //모든 프로그램에 대한 정보 요청
        dispatch(callGetProgramListAPI({currentPage}));
    }, [currentPage, dispatch]);

    const onClickDeleteProgram = async (code) => {
        let userConfirmed = window.confirm("프로그램을 삭제하시겠습니까?");
        try {
            if (userConfirmed) {
                await dispatch(callProgramDeleteAPI({code}));
                navigate("/programs");
                alert('프로그램이 성공적으로 삭제되었습니다.');
                window.location.reload(); //자동 새로고침 하기
                navigate("/programs");
            }
        } catch (error) {
            toast.error("프로그램 삭제 중 오류가 발생했습니다.");
        }
    };

    const onclickProgramInsert = () => {
        navigate("/program-regist");
    };

    return (
        <>
            {programs && (
                <>
                    <div className="program-list">
                        <ProgramList data={programs.data} onClickDelete={onClickDeleteProgram}/><br/>
                        <div className="program-detail-div">
                            <div className="paging-program">
                                <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
                            </div>
                            <div className="management-div">
                                {isAdmin() && <button onClick={onclickProgramInsert}>등록</button>}
                                {isMaster() && <button onClick={onclickProgramInsert}>등록</button>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Programs;
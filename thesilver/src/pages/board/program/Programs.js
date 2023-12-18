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
                await dispatch(callProgramDeleteAPI({ code }));
                navigate("/programs");
                alert('성공적으로 삭제되었습니다.');
            } else {
                navigate("/programs");
            }
        } catch (error) {
            console.error("프로그램 삭제 실패:", error);
            toast.error("프로그램 삭제 중 오류가 발생했습니다.");
        }
    };

    const onclickProgramInsert = () => {
        navigate("/program-regist");
    };

    // 프로그램 수정 후 수정되었습니다 라는 알럿창 띄우기 (o)
    //프로그램 등록을 값이 없을떄 누르면 입력해주세요 알럿창 띄우기(o)
    // 삭제 후 프로그램 목록으로 가기전에 잠깐 상세 페이지 보이는 거 고치기(o)
    //삭제 취소하면 상세페이지로 넘어가지는거 고치기(o)

    // 프로그램 수정 전에 상세 정보 불러올 떄 주소만 안불러와지는거 고치기
    //일지 드롭바 하기 ********************
    //일지 등록 하기
    //일지 수정하기

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
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import {callProgramDeleteAPI, callProgramSearchListAPI} from "../../../apis/ProgramAPICalls";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";
import {toast} from "react-toastify";

function SearchProgram() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams(); //
    const categoryName = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const {programs} = useSelector(state => state.programReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const DeleteProgram = async (code) => {
        let userConfirmed = window.confirm("프로그램을 삭제하시겠습니까?");

        try {
            if (userConfirmed) {
                // 삭제 API 호출
                await dispatch(callProgramDeleteAPI({code}));
                alert("프로그램이 성공적으로 삭제되었습니다.");
                window.location.reload(); //새로고침 할 필요없이 바로 바뀜
                navigate("/programs");
            }
        } catch (error) {
            console.error("프로그램 삭제 실패:", error);
            toast.error("프로그램 삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        dispatch(callProgramSearchListAPI({categoryName, currentPage}));
    }, [categoryName, currentPage]);

    const onclickProgramInsert = () => {
        navigate("/program-regist");
    };

    return (
        <>
            {programs && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <div className="program-list">
                        <ProgramList data={programs.data} onClickDelete={DeleteProgram}/>
                        <br/>
                        <div className="program-detail-div">
                            <div className="paging-program2">
                                <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
                            </div>
                            <div className="management-div">
                                {isAdmin() && <button onClick={onclickProgramInsert}>등록</button>}
                                {isMaster() && <button onClick={onclickProgramInsert}>등록</button>}
                            </div>
                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default SearchProgram;
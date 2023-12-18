import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import {callProgramSearchListAPI} from "../../../apis/ProgramAPICalls";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";

function SearchProgram(){

    const dispatch = useDispatch();
    const [searchParams]= useSearchParams(); //
    const categoryName = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const {programs} = useSelector(state => state.programReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callProgramSearchListAPI({categoryName, currentPage}));
    }, [categoryName, currentPage]);

    const onclickProgramInsert = () => {
        navigate("/program-regist");
    };

    return(
        <>
            {programs && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <div className="program-list">
                    <ProgramList data={programs.data}/>
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
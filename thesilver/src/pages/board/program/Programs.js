import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetProgramListAPI} from "../../../apis/ProgramAPICalls";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import PagingBar from "../../../components/common/PagingBar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";


function Programs() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {programs} = useSelector(state => state.programReducer);
    const [searchParams] = useSearchParams(); //

    useEffect(() => {
        //모든 프로그램에 대한 정보 요청
        dispatch(callGetProgramListAPI({currentPage}));
    }, [currentPage]);

    // // 추가 내용 //
    // if(isLogin()) {
    //     console.log("-----token 확인 start -----");
    //     console.log(jwtDecode(window.localStorage.getItem('access-token')));
    //     console.log("-----token 확인 end -----");
    // }
    // // 추가 내용 //
    const navigate = useNavigate();
    const onclickProgramInsert = () => {
        navigate('/program-regist');
    }

    return (
        <>
            {programs && (
                <>
                    <div className="program-list">
                        <ProgramList data={programs.data}/><br/>

                        <div className="program-detail-div">
                        <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
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
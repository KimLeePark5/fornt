import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetProgramListAPI} from "../../apis/ProgramAPICalls";
import ProgramList from "../../components/board/program/lists/ProgramList";
import PagingBar from "../../components/common/PagingBar";
import {useSearchParams} from "react-router-dom";


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

    return (
        <>
            {programs && (
                <>
                    <div className="program-list">
                        <ProgramList data={programs.data}/>
                        <br/>
                        <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                </>
            )}
        </>
    )
}

export default Programs;
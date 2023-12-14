import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetProgramListAPI} from "../../apis/ProgramAPICalls";
import ProgramList from "../../components/Programs/lists/ProgramList";
import PagingBar from "../../components/common/PagingBar";


function Programs() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {programs} = useSelector(state => state.programReducer);

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
            <div className="Programs-contents">
                <div>
                    <h2 style={{fontSize: "30px"}}>
                        <b>❙ 프로그램</b>
                    </h2>
                    <br/>
                </div>
                <div className="programs-tab-pane">
                    <div>
                        <b>• 프로그램명</b>
                        <input
                            className="programs-searchName"
                            placeholder=" 검색"
                            style={{appearance: "none"}}
                        />

                        <button
                            className="programs-search-button"
                        >
                            검색
                        </button>
                    </div>
                </div>

                    {
                        programs
                        &&
                        <>
                            <ProgramList data={programs.data}/>
                            <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
                        </>
                    }
            </div>
        </>
    )
}

export default Programs;
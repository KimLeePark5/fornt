import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetJournalListAPI} from "../../../apis/JournalAPICalls";
import PagingBar from "../../../components/common/PagingBar";

import JournalList from "../../../components/board/journals/lists/JournalList";


function Journals() {  // 전체조회

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {journals} = useSelector(state => state.journalReducer);

    //const [searchParams] = useSearchParams(); //

    useEffect(() => {
        //모든 일지에 대한 정보 요청
        dispatch(callGetJournalListAPI({currentPage}));
    }, [currentPage]);


    // // 추가 내용 //
    // if(isLogin()) {
    //     console.log("-----token 확인 start -----");
    //     console.log(jwtDecode(window.localStorage.getItem('access-token')));
    //     console.log("-----token 확인 end -----");
    // }
    // // 추가 내용 //

console.log("journals js에 journals : ", journals);

    return (
        <>
            {journals && (
                <>
                    <div className="journal-list">
                        <JournalList data={journals.data}/>
                        <br/>
                        <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                </>
            )}
        </>
    )
}

export default Journals;
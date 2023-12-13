import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {
    callJournalManyListAPI, callJournalManySearchListAPI
} from "../../../apis/JournalAPICalls";
import JournalList from "../../../components/board/journals/lists/JournalList";

function SearchJournal(){  // 다중 검색 조회(전체 리스트)

    const dispatch = useDispatch();
    const [searchParams]= useSearchParams(); //
    const employeeCode = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const categoryCode = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const observation = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const {journals} = useSelector(state => state.journalReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callJournalManySearchListAPI({employeeCode, categoryCode, observation, currentPage}));
    }, [employeeCode, categoryCode, observation, currentPage]);

    return(
        <>
            {journals && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <JournalList data={journals.data}/>
                    <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    )
}

export default SearchJournal;
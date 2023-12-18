import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {
    callJournalManySearchListAPI
} from "../../../apis/JournalAPICalls";
import JournalList from "../../../components/board/journals/lists/JournalList";

function SearchJournal() {  // 다중 검색 조회(전체 리스트)

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams(); //
    const employeeName = searchParams.get('employeeName');
    const categoryName = searchParams.get('categoryName');
    const observation = searchParams.get('observation');
    const {journals} = useSelector(state => state.journalReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callJournalManySearchListAPI({employeeName, categoryName, observation, currentPage}));
    }, [employeeName, categoryName, observation, currentPage]);

    const onclickJournalInsert = () => {
        navigate("/journal-regist");
    };

    return (
        <>
            {journals && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <div className="journal-list">
                    <JournalList data={journals.data}/>
                    <br/>
                    <div className="program-detail-div">
                        <div className="paging-journal">
                            <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                        <div className="journal-div">
                            <div className="journal-div">
                                <button onClick={onclickJournalInsert}>등록</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </>
            }
        </>
    )
}

export default SearchJournal;
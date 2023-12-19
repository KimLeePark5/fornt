import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import {
    callGetJournalListAPI,
    callJournalDeleteAPI,
    callJournalManySearchListAPI
} from "../../../apis/JournalAPICalls";
import JournalList from "../../../components/board/journals/lists/JournalList";
import {toast} from "react-toastify";

function SearchJournal() {  // 다중 검색 조회(전체 리스트)

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams(); //
    const employeeName = searchParams.get('employeeName');
    const categoryName = searchParams.get('categoryName');
    const observation = searchParams.get('observation');
    const {journals} = useSelector(state => state.journalReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [selectedJournals, setSelectedJournals] = useState([]);

    const onSelectJournals = (selectedJournals) => {
        // 부모 컴포넌트에서 선택된 일지를 관리하는 로직을 추가할 수 있습니다.
        setSelectedJournals(selectedJournals);
    };

    useEffect(() => {
        dispatch(callJournalManySearchListAPI({employeeName, categoryName, observation, currentPage}));
    }, [employeeName, categoryName, observation, currentPage]);

    const onclickJournalInsert = () => {
        navigate("/journal-regist");
    };

    const onDeleteSelectedJournals = async () => {
        try {
            const userConfirmed = window.confirm("선택한 일지를 삭제하시겠습니까?");

            if (userConfirmed) {
                for (const journalCode of selectedJournals) {
                    await dispatch(callJournalDeleteAPI({ journalCode }));
                }
                // 삭제 후 페이지 갱신
                dispatch(callGetJournalListAPI({ currentPage }));
                alert("선택한 일지가 성공적으로 삭제되었습니다.");
                navigate("/journals");
            }
        } catch (error) {
            console.error("일지 삭제 실패:", error);
            toast.error("일지 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            {journals && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <div className="journal-list">
                    <JournalList data={journals.data} onDeleteJournals={onDeleteSelectedJournals} onSelectJournals={onSelectJournals} />
                    <br/>
                    <div className="program-detail-div">
                        <div className="paging-journal3">
                            <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                        <div className="journal-delete"
                             style={{paddingRight: "40px"}}>
                            <button onClick={onDeleteSelectedJournals}>
                                삭제
                            </button>
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
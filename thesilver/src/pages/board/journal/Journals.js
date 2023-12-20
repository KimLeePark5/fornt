import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    callGetJournalListAPI,
    callJournalDeleteAPI, callJournalManySearchListAPI
} from "../../../apis/JournalAPICalls";
import PagingBar from "../../../components/common/PagingBar";

import JournalList from "../../../components/board/journals/lists/JournalList";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";
import {useNavigate, useSearchParams} from "react-router-dom";
import JournalListItem from "../../../components/board/journals/items/JournalListItem";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import {callProgramDeleteAPI} from "../../../apis/ProgramAPICalls";
import {toast} from "react-toastify";
import {hover} from "@testing-library/user-event/dist/hover";


function Journals() {  // 전체조회

    const [selectedJournals, setSelectedJournals] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const {journals} = useSelector(state => state.journalReducer);

    const [searchParams] = useSearchParams(); //
    const employeeName = searchParams.get('employeeName');
    const categoryName = searchParams.get('categoryName');
    const observation = searchParams.get('observation');

    const onSelectJournals = (selectedJournals) => {
        // 부모 컴포넌트에서 선택된 일지를 관리하는 로직을 추가할 수 있습니다.
        setSelectedJournals(selectedJournals);
    };

    useEffect(() => {
        //모든 일지에 대한 정보 요청
        dispatch(callGetJournalListAPI({currentPage}));
    }, [currentPage, dispatch]);

    const onDeleteSelectedJournals = async () => {
        try {
            const userConfirmed = window.confirm("선택한 일지를 삭제하시겠습니까?");

            if (userConfirmed) {
                for (const journalCode of selectedJournals) {
                    await dispatch(callJournalDeleteAPI({ journalCode }));
                }
                // 삭제 후 페이지 갱신
                await dispatch(callJournalManySearchListAPI({ employeeName, categoryName, observation, currentPage }));
                setSelectedJournals([]); // 선택한 일지 목록 초기화
                alert("선택한 일지가 성공적으로 삭제되었습니다.");
                navigate("/journals");
            }
        } catch (error) {
            console.error("일지 삭제 실패:", error);
            toast.error("일지 삭제 중 오류가 발생했습니다.");
        }
    };

    const onclickJournalInsert = () => {
        navigate("/journal-regist");
    };

    console.log("journals js에 journals : ", journals);

    return (
        <>
            {journals && (
                <>
                    <div className="journal-list">
                        <JournalList data={journals.data} onDeleteJournals={onDeleteSelectedJournals} onSelectJournals={onSelectJournals} />
                        <br/>
                        <div className="program-detail-div">
                            <div className="paging-journal2">
                                <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                            </div>
                            <div className="journal-delete"
                                 style={{paddingRight: "40px"}}>
                            <button onClick={onDeleteSelectedJournals}>
                                삭제
                            </button>
                            </div>
                            <div className="journal-div">
                                <button onClick={onclickJournalInsert}>등록</button>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default Journals;
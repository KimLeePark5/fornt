import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callGetJournalListAPI} from "../../../apis/JournalAPICalls";
import PagingBar from "../../../components/common/PagingBar";

import JournalList from "../../../components/board/journals/lists/JournalList";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";
import {useNavigate} from "react-router-dom";


function Journals() {  // 전체조회

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const {journals} = useSelector(state => state.journalReducer);

    //const [searchParams] = useSearchParams(); //

    useEffect(() => {
        //모든 일지에 대한 정보 요청
        dispatch(callGetJournalListAPI({currentPage}));
    }, [currentPage]);


    const onclickJournalInsert = () => {
        navigate("/journal-regist");
    };

console.log("journals js에 journals : ", journals);

    return (
        <>
            {journals && (
                <>
                    <div className="journal-list">
                        <JournalList data={journals.data}/>
                        <br/>
                        <div className="program-detail-div">
                            <div className="paging-program">
                        <PagingBar pageInfo={journals.pageInfo} setCurrentPage={setCurrentPage}/>
                            </div>
                        <div className="management-div">
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
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callJournalDetailAPI} from "../../../apis/JournalAPICalls";
import JournalItem from "../../../components/board/journals/items/JournalItem";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";

function JournalDetail() { // 상세 조회

    const dispatch = useDispatch();
    const {journalCode} = useParams();
    const {journal} = useSelector(state => state.journalReducer);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callJournalDetailAPI({journalCode}));
    }, []);

    console.log("JournalDetail 저널 : ", journal);

    const onClickJournal = () => {
        navigate(`/journal-modify/${journalCode}`);
    }


    return (
        <>
            {
                journal &&
                <>
                    <div className="detail-div">
                        <JournalItem journal={journal}/>

                        <div className="management-detail-div">
                            <button onClick={onClickJournal}>수정</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default JournalDetail;
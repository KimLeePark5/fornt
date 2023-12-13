import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callJournalDetailAPI} from "../../../apis/JournalAPICalls";
import JournalItem from "../../../components/board/journals/items/JournalItem";

function JournalDetail() { // 상세 조회

    const dispatch = useDispatch();
    const {journalCode} = useParams();
    const {journal} = useSelector(state => state.journalReducer);

    useEffect(() => {
        dispatch(callJournalDetailAPI({journalCode}));
    }, []);

    console.log("JournalDetail 저널 : " , journal)

    return (
        <>
            {
                journal &&
                <>
                    <div className="detail-div">
                        <JournalItem journal={journal}/>
                    </div>
                </>
            }
        </>
    )
}

export default JournalDetail;
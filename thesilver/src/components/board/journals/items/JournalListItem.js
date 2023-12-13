import {useNavigate} from "react-router-dom";

function JournalListItem({journal}) { //상세조회

    console.log("::: JournalListItem js 파일 진입 :::");

    const navigate = useNavigate();

    const onClickJournalHandler = () => {
        navigate(`/journals/${journal.journalCode}`);
    }

    console.log("JournalListItem 저널" , journal)

    return (

        <div className="journal-list-div">
            <div className="journal-list-body">
                    <div className="journal-list-item" onClick={onClickJournalHandler}>
                        <div className="j-border1">{journal.journalCode}</div>
                        <div className="j-border3">{journal.employeeName}</div>
                        <div className="j-border3">{journal.categoryName}</div>
                        <div className="j-shortStory">{journal.programTopic}</div>

                        <div className="j-border3">{journal.numberOfParticipants}</div>

                        <div className="j-border3">{journal.observation}</div>
                        <div className="j-border3">{journal.teacherName}</div>
                    </div>
                </div>

         </div>

    );
}

export default JournalListItem;
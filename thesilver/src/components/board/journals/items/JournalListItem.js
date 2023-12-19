import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {callGetCategoryNamesAPI, callGetEmployeeNamesAPI} from "../../../../apis/JournalAPICalls";
import {useDispatch, useSelector} from "react-redux";

function JournalListItem({journal, isSelected, onCheckboxChange }) { //상세조회

    console.log("::: JournalListItem js 파일 진입 :::");

    const navigate = useNavigate();

    const onClickJournalHandler = () => {
        navigate(`/journals/${journal.journalCode}`);
    }

    console.log("JournalListItem 저널" , journal)

    return (

        <div className="journal-list-div" style={{ "backgroundColor": "#FFFFFF"}}>

            <div className="journal-list-body">
                <div className="journal-list-item">
                    <div className="journal-check">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onCheckboxChange(journal.journalCode)}
                        />
                    </div>
                    <div className="j-border1" onClick={onClickJournalHandler}>{journal.journalCode}</div>
                    <div className="j-border3" onClick={onClickJournalHandler}>{journal.employeeName}</div>
                    <div className="j-border3" onClick={onClickJournalHandler}>{journal.categoryName}</div>
                    <div className="j-shortStory" onClick={onClickJournalHandler}>{journal.programTopic}</div>

                    <div className="j-border3" onClick={onClickJournalHandler}>{journal.numberOfParticipants}</div>

                    <div className="j-border3" onClick={onClickJournalHandler}>{journal.observation}</div>
                    <div className="j-border3" onClick={onClickJournalHandler}>{journal.teacherName}</div>
                </div>
            </div>
        </div>

    );
}

export default JournalListItem;
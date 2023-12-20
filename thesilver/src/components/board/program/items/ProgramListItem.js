import {useNavigate} from "react-router-dom";
import {isAdmin, isMaster} from "../../../../utils/TokenUtils";

function ProgramListItem({program: {code, categoryName, shortStory, teacherName}, onDelete }) {

    console.log("::: ProgramListItem js 파일 진입 :::");
    const navigate = useNavigate();

    const onClickProgramHandler = () => {
        navigate(`/programs/${code}`);
    }

    return (

        <div className="program-list-div">
            <div className="program-list-body">
                <div className="program-list-content">
                    <div className="program-list-item">
                        <div className="p-border1" onClick={onClickProgramHandler}>{categoryName}</div>
                        <div className="p-shortStory" onClick={onClickProgramHandler}>{shortStory}</div>
                        <div className="p-border2" onClick={onClickProgramHandler}>{teacherName}</div>
                        <div className="p-border3">
                            {isAdmin() && (
                                <button className="program-delete-button" onClick={() => onDelete && onDelete(code)}>
                                    삭제
                                </button>
                            )}
                            {isMaster() && (
                                <button className="program-delete-button" onClick={() => onDelete && onDelete(code)}>
                                    삭제
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProgramListItem;
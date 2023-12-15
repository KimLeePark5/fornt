import {useNavigate} from "react-router-dom";
import {isAdmin, isMaster} from "../../../../utils/TokenUtils";

function ProgramListItem({program: {code, categoryName, shortStory, teacherName},  onClickDelete}) {

    console.log("::: ProgramListItem js 파일 진입 :::");
    const navigate = useNavigate();

    const onClickProgramHandler = () => {
        navigate(`/programs/${code}`);
    }


/* 삭제는 되는데 하고나서 상세페이지로 넘어감 고치기*/
    return (

        <div className="program-list-div">
            <div className="program-list-body">
                <div className="program-list-content">
                    <div className="program-list-item" onClick={onClickProgramHandler}>
                        <div className="p-border1">{categoryName}</div>
                        <div className="p-shortStory">{shortStory}</div>
                        <div className="p-border2">{teacherName}</div>

                        <div className="p-border3">
                            {isAdmin() && <button className="program-delete-button" onClick={() => onClickDelete(code)} >
                                삭제
                            </button>}
                            {isMaster() && <button className="program-delete-button" onClick={() => onClickDelete(code)}>
                                삭제
                            </button>}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProgramListItem;
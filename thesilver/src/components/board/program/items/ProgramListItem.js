import {useNavigate} from "react-router-dom";
import {isAdmin, isMaster} from "../../../../utils/TokenUtils";

function ProgramListItem({program: {code, categoryName, shortStory, teacherName}}) {

    console.log("::: ProgramListItem js 파일 진입 :::");
    const navigate = useNavigate();

    const onClickProgramHandler = () => {
        navigate(`/programs/${code}`);
    }



    return (

        <div className="program-list-div">
            <div className="program-list-body">
                <div className="program-list-content">
                    <div className="program-list-item" onClick={onClickProgramHandler}>
                        <div className="p-border1">{categoryName}</div>
                        <div className="p-shortStory">{shortStory}</div>
                        <div className="p-border2">{teacherName}</div>
                        <div className="p-border3">
                            <button className="program-delete-button">삭제</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProgramListItem;
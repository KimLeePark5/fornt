import {useNavigate} from "react-router-dom";

function ProgramListItem({program : {code, categoryName, shortStory, teacherName}}){

    console.log("::: ProgramListItem js 파일 진입 :::");
    const navigate = useNavigate();

    const onClickProgramHandler = () => {
         navigate(`/program/${code}`);
    }

    return(
        <div className="programs-div"
        onClick={onClickProgramHandler}>
            <h4>{categoryName}</h4>
            <h4>{shortStory}</h4>
            <h4>{teacherName}</h4>
        </div>
    );
}

export default ProgramListItem;
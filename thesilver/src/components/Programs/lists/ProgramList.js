
import ProgramListItem from "../items/ProgramListItem";


function ProgramList({data}) {

    console.log("::: ProgramList js 파일 진입 :::");
    return(
        <div className="programs-div"
        >
            {
                data &&
                data.map(program => <ProgramListItem key={program.code} program={program}/>)
            }
        </div>
    );
}

export default ProgramList;
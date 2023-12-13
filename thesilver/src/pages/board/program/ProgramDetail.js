import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProgramDetailAPI} from "../../../apis/ProgramAPICalls";
import ProgramItem from "../../../components/board/program/items/ProgramItem";

function ProgramDetail() {

    const dispatch = useDispatch();
    const {code} = useParams();
    const {program} = useSelector(state => state.programReducer);

    useEffect(() => {
        dispatch(callProgramDetailAPI({code}));
    }, []);

    return (
        <>
            {
                program &&
                <>
                    <div className="detail-div">
                        <ProgramItem program={program}/>
                    </div>
                </>
            }
        </>
    )
}

export default ProgramDetail;
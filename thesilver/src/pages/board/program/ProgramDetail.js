import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProgramDetailAPI} from "../../../apis/ProgramAPICalls";
import ProgramItem from "../../../components/board/program/items/ProgramItem";
import {isAdmin, isMaster} from "../../../utils/TokenUtils";

function ProgramDetail() {

    const dispatch = useDispatch();
    const {code} = useParams();
    const {program} = useSelector(state => state.programReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callProgramDetailAPI({code}));
    }, []);

    const onClickTableTr = () => {
        navigate(`/program-modify/${code}`);
    }

    return (
        <>
            {
                program &&
                <>
                    <div className="detail-div">
                        <ProgramItem program={program}/>

                        <div className="management-detail-div">
                        {isAdmin() && <button onClick={onClickTableTr}>수정</button>}
                        {isMaster() && <button onClick={onClickTableTr}>수정</button>}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ProgramDetail;
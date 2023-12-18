import ProgramListItem from "../items/ProgramListItem";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {callProgramSearchListAPI} from "../../../../apis/ProgramAPICalls";
import {isAdmin, isMaster} from "../../../../utils/TokenUtils";

function ProgramList({data, onClickDelete }) {

    console.log("::: ProgramList js 파일 진입 :::");

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    //검색어 입력 값 상태 저장
    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

// 검색 로직을 호출하는 함수
    const searchPrograms = async () => {
        try {
            // 검색 API 호출
            const response = await callProgramSearchListAPI({ categoryName: search });

            // 검색 결과 처리 로직을 여기에 추가
            console.log('검색 결과:', response);

            // 검색어를 URL에 추가하여 이동
            navigate(`/programs/search?value=${search}`);

            // 검색 완료 후 입력 필드 비우기
            setSearch('');
        } catch (error) {
            console.error('검색 에러:', error);
        }
    }

// Enter 입력 시 검색 결과 화면으로 이동
    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {
            searchPrograms();
        }
    }

// 검색 버튼 클릭 시 검색 결과 화면으로 이동
    const onClickKeyHandler = () => {
        searchPrograms();
    }


    return (

        <div className="Programs-contents">
            <div>
                <h2 style={{fontSize: "30px"}}>
                    <b>❙ 프로그램</b>
                </h2>
                <br/>
            </div>

            <div className="programs-tab-pane">
                <div className="programs-list-search">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 프로그램 명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        placeholder=" 검색"
                        type="text"
                        value={search}
                        onChange={onSearchChangeHandler}
                        onKeyUp={onEnterKeyHandler}
                    />

                    <button
                        className="programs-search-button"
                        onClick={onClickKeyHandler}
                    >
                        검색
                    </button>
                </div>

            </div>


            <div className="program-list-div">
                <div className="program-list-head">
                    <div>프로그램 명</div>
                    <div>프로그램 내용</div>
                    <div>담당 강사</div>
                    {/*<div></div>*/}
                </div>
            </div>
            {data && data.map(program => <ProgramListItem key={program.code} program={program} onClickDelete={onClickDelete}/>)}
        </div>

    )
}

export default ProgramList;
import ProgramListItem from "../items/ProgramListItem";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


function ProgramList({data}) {

    console.log("::: ProgramList js 파일 진입 :::");
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    //검색어 입력 값 상태 저장
    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

    //Enter 입력 시 검색 결과 화면으로 이동
    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {
            navigate(`/product/search?value=${search}`);
        }
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
                        onChange={onSearchChangeHandler}
                        onKeyUp={onEnterKeyHandler}
                    />

                    <button
                        className="programs-search-button"
                        /* onClick={onClickProgramsHandler} */
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
                    <div></div>
                </div>
                {data && data.map(program => <ProgramListItem key={program.code} program={program}/>)}
            </div>
        </div>

    )
}

export default ProgramList;
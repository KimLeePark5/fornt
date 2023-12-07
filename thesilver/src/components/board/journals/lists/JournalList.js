import JournalListItem from "../items/JournalListItem"

function JournalList({data}) {

    console.log("::: JournalList js 파일 진입 :::");


    return (

        <div className="journals-contents">
            <div>
                <h2 style={{fontSize: "30px"}}>
                    <b>❙ 프로그램 일지</b>
                </h2>
                <br/>
            </div>

            <div className="journals-tab-pane">
                <div className="journals-list-search">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 작성자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input placeholder=" 검색"/>

                    <button
                        className="journals-search-button"
                        /* onClick={onClickProgramsHandler} */
                    >
                        검색
                    </button>
                </div>

            </div>

            <div className="journal-list-div">
                <div className="journal-list-head">
                    <div>번호</div>
                    <div>작성자</div>
                    <div>프로그램 명</div>
                    <div>프로그램 주제</div>
                    <div>이용자 수</div>
                    <div>참관 일자</div>
                    <div>담당 강사</div>
                    <div></div>
                </div>
                {data && data.map(journal => <JournalListItem key={journal.journalCode} journal={journal}/>)}
            </div>
        </div>

    )
}

export default JournalList;
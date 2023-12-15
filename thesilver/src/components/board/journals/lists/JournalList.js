import JournalListItem from "../items/JournalListItem"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callJournalManySearchListAPI,} from "../../../../apis/JournalAPICalls";



function JournalList({data}) {      //전체조회

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

     //const employeeName = useSelector(state => state.journal.employeeName);
     //const categoryName = useSelector(state => state.journal.categoryName);
    const [employeeCode, setEmployeeCode] = useState('');
    const [categoryCode, setCategoryCode] = useState('');
    const [observation, setObservation] = useState('');

    console.log("::: JournalList js 파일 진입 :::");

    // useEffect(() => {
    //     // 페이지가 로드될 때 카테고리와 직원 이름 목록을 불러옴
    //     dispatch(getSelectOptionsAPI());

            //검색 api
    //     dispatch(callJournalManyListAPI({ currentPage: 1 }));
    // }, [dispatch]);

    // 검색어 입력 값 상태 저장
    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

    // 검색 로직을 호출하는 함수
    const searchJournals = async () => {
        try {
            // 검색 API 호출
            const response = await callJournalManySearchListAPI({
                employeeCode: employeeCode,
                categoryCode: categoryCode,
                observation: observation,
                currentPage: 1
            });


            // 검색 결과 처리 로직을 여기에 추가
            console.log('검색 결과:', response);

            // 검색어를 URL에 추가하여 이동
            navigate(`/journals/search?value=${search}`);

            // 검색 완료 후 입력 필드 비우기
            setSearch('');
        } catch (error) {
            console.error('검색 에러:', error);
        }
    }

    // Enter 입력 시 검색 결과 화면으로 이동
    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {
            searchJournals();
        }
    }

    // 검색 버튼 클릭 시 검색 결과 화면으로 이동
    const onClickKeyHandler = () => {
        searchJournals();
    }


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
                    <select>
                        <option>-- 선택하세요 --</option>
                    </select>
                    {/*<select onChange={(e) => setEmployeeCode(e.target.value)}>*/}
                    {/*    <option value="">-- 선택하세요 --</option>*/}
                    {/*    {employeeName.map(journal => (*/}
                    {/*        <option key={journal.employeeCode} value={journal.employeeCode}>*/}
                    {/*            {journal.employeeName}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 프로그램 명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select>
                        <option>-- 선택하세요 --</option>
                    </select>
                    {/*<select onChange={(e) => setCategoryCode(e.target.value)}>*/}
                    {/*    <option value="">-- 선택하세요 --</option>*/}
                    {/*    {categoryName.map(journal => (*/}
                    {/*        <option key={journal.categoryCode} value={journal.categoryCode}>*/}
                    {/*            {journal.categoryName}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 참관일자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        type="date"
                        onChange={(e) => setObservation(e.target.value)}
                        value={search}
                        onChange={onSearchChangeHandler}
                        onKeyUp={onEnterKeyHandler}
                    />


                    <button className="journals-search-button"
                            onClick={searchJournals}>검색
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
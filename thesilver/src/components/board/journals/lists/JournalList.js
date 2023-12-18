import JournalListItem from "../items/JournalListItem"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {

    callJournalManySearchListAPI,
} from "../../../../apis/JournalAPICalls";



function JournalList({data}) {      //전체조회

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    //const [currentPage, setCurrentPage] = useState(1);

    // const employeeNames = useSelector((state) => state.employeeNames);
    // const categoryNames = useSelector((state) => state.categoryNames);


    const [employeeSearch, setEmployeeSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [observationSearch, setObservationSearch] = useState('');

    console.log("::: JournalList js 파일 진입 :::");

    // useEffect(() => {
    //     dispatch(callGetEmployeeNamesAPI()); //직원이름
    // }, [dispatch]);
    //
    // useEffect(() => {
    //     dispatch(callGetCategoryNamesAPI());//프로그램 이름
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(callJournalManySearchListAPI({ /*employeeCode, categoryCode,*/ observation, currentPage }));
    // }, [dispatch, /*employeeCode, categoryCode,*/ observation, currentPage, search]);


    // 검색어 입력 값 상태 저장
    const onSearchChangeHandler = (e, field) => {
        switch (field) {
            case 'employeeName':
                setEmployeeSearch(e.target.value);
                break;
            case 'categoryName':
                setCategorySearch(e.target.value);
                break;
            case 'observation':
                setObservationSearch(e.target.value);
                break;
            default:
                break;
        }
    }

    // 검색 로직을 호출하는 함수
    const searchJournals = async () => {
        try {
            // 검색어가 비어 있는지 확인
            if (!employeeSearch.trim() && !categorySearch.trim() && !observationSearch.trim()) {
                // 검색어가 하나도 입력되지 않았을 때 알림창 표시
                alert("적어도 하나 이상의 검색 값을 입력해 주세요");
                return;
            }

            const response = await callJournalManySearchListAPI({
                employeeName: employeeSearch,
                categoryName: categorySearch,
                observation: observationSearch,
            });

            console.log('검색 결과:', response);

            // 검색어를 URL에 추가하여 이동
            navigate(`/journals/search?employeeName=${employeeSearch}&categoryName=${categorySearch}&observation=${observationSearch}`);

            // 검색 완료 후 입력 필드 비우기
            setEmployeeSearch('');
            setCategorySearch('');
            setObservationSearch('');
        } catch (error) {
            console.error('검색 에러:', error);
        }
    }

    // Enter 입력 시 검색 결과 화면으로 이동
    const onEnterKeyHandler2 = e => {
        if (e.key === 'Enter') {
            searchJournals();
        }
    }

    // 검색 버튼 클릭 시 검색 결과 화면으로 이동
    const onClickKeyHandler2 = () => {
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
                    {/*<select*/}
                    {/*    onChange={(e) => setEmployeeCode(e.target.value)}*/}
                    {/*    value={employeeCode}*/}
                    {/*>*/}
                    {/*    <option value="">-- 선택하세요 --</option>*/}
                    {/*    {employeeNames && employeeNames.map((name) => (*/}
                    {/*        <option key={name} value={name}>*/}
                    {/*            {name}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <input
                        placeholder=" 검색"
                        type="text"
                        value={employeeSearch}
                        onChange={(e) => onSearchChangeHandler(e, 'employeeName')}
                        onKeyUp={onEnterKeyHandler2}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 프로그램 명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/*<select*/}
                    {/*    onChange={(e) => setCategoryCode(e.target.value)}*/}
                    {/*    value={categoryCode}*/}
                    {/*>*/}
                    {/*    <option value="">-- 선택하세요 --</option>*/}
                    {/*    {categoryNames && categoryNames.map((name) => (*/}
                    {/*        <option key={name} value={name}>*/}
                    {/*            {name}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <input
                        placeholder=" 검색"
                        type="text"
                        value={categorySearch}
                        onChange={(e) => onSearchChangeHandler(e, 'categoryName')}
                        onKeyUp={onEnterKeyHandler2}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 참관일자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        type="date"
                        //onChange={(e) => setObservation(e.target.value)}
                        value={observationSearch}
                        onChange={(e) => onSearchChangeHandler(e, 'observation')}
                        onKeyUp={onEnterKeyHandler2}
                    />
                    <button className="journals-search-button"
                            onClick={onClickKeyHandler2}>검색
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
                </div>
                {data && data.map(journal => <JournalListItem key={journal.journalCode} journal={journal}/>)}
            </div>
        </div>

    )
}

export default JournalList;
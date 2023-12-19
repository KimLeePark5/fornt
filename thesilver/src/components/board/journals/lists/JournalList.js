import JournalListItem from "../items/JournalListItem"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {

    callJournalManySearchListAPI,
} from "../../../../apis/JournalAPICalls";


function JournalList({data, onDeleteJournals, onSelectJournals }) {      //전체조회

    const [selectedJournals, setSelectedJournals] = useState([]);
    const handleCheckboxChange = (journalCode) => {
        setSelectedJournals((prevSelected) => {
            const isSelected = prevSelected.includes(journalCode);

            let updatedSelectedJournals;

            if (isSelected) {
                updatedSelectedJournals = prevSelected.filter((code) => code !== journalCode);
            } else {
                updatedSelectedJournals = [...prevSelected, journalCode];
            }

            // 수정: 새로 계산된 선택 목록을 사용하여 onSelectJournals 호출
            // 부모 컴포넌트에 선택된 일지 알리기
            onSelectJournals(updatedSelectedJournals);

            return updatedSelectedJournals;
        });
    };

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const [employeeSearch, setEmployeeSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [observationSearch, setObservationSearch] = useState('');

    console.log("::: JournalList js 파일 진입 :::");

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

            // 검색 필드에 값이 있는 경우에만 쿼리 매개변수를 조건부로 구성
            const queryParams = {};
            if (employeeSearch.trim()) {
                queryParams.employeeName = employeeSearch;
            }
            if (categorySearch.trim()) {
                queryParams.categoryName = categorySearch;
            }
            if (observationSearch.trim()) {
                queryParams.observation = observationSearch;
            }

            // 페이지 번호도 추가
            queryParams.page = 1;

            // 구성된 쿼리 매개변수를 사용하여 API 호출
            const response = await callJournalManySearchListAPI(queryParams);
            console.log('검색 결과:', response);

            const searchQuery = Object.keys(queryParams)
                .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
                .join('&');

            // 검색 결과 페이지로 이동하면서 구성된 검색 쿼리를 사용
            navigate(`/journals/search?${searchQuery}`);

            console.log('검색 결과:', response);

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
                    <input
                        placeholder=" 검색"
                        value={employeeSearch}
                        onChange={(e) => onSearchChangeHandler(e, 'employeeName')}
                        onKeyUp={onEnterKeyHandler2}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• 프로그램 명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        placeholder=" 검색"
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
                    <div></div>
                    <div>번호</div>
                    <div>작성자</div>
                    <div>프로그램 명</div>
                    <div>프로그램 주제</div>
                    <div>이용자 수</div>
                    <div>참관 일자</div>
                    <div>담당 강사</div>
                </div>
                {data && data.map(journal => <JournalListItem key={journal.journalCode}
                                                              journal={journal}
                                                              isSelected={selectedJournals.includes(journal.journalCode)}
                                                              onCheckboxChange={handleCheckboxChange}
                />)}
            </div>
        </div>

    )
}

export default JournalList;
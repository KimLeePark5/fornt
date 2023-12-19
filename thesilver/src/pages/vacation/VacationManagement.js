import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callProceedRequireAPI} from "../../apis/VacationAPICalls";
import ProceedRequireList from "../../components/vacation/lists/ProceedRequireList";
import PagingBar from "../../components/common/PagingBar";
import SignForm from "../../components/vacation/form/SignForm";
import {getLicenseReset} from "../../modules/CustomerModule";

function VacationManagement() {

    const dispatch = useDispatch();
    const {proceedRequire, require} = useSelector((state) => state.vacationReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNav, setSelectedNav] = useState('상신');
    const [modal, setModal] = useState(false);
    const [reqNo, setReqNo] = useState({});
    // 네비게이션 항목 클릭 시 호출되는 함수
    const handleNavClick = (navType) => {
        setSelectedNav(navType);
        // 네비게이션에 따라 API 호출 등 필요한 로직 수행
        // dispatch를 사용하여 액션을 디스패치하고 API 호출
        console.log("확인2", navType)
        dispatch(callProceedRequireAPI({currentPage, proceedRequire, navType}));

    };

    useEffect(() => {
        dispatch(callProceedRequireAPI({currentPage, proceedRequire}));
    }, [currentPage]);


    const onClickExitHandler = (e) => {
        if (e.target === e.currentTarget) {
            // eslint-disable-next-line no-restricted-globals
            const confirmResult = confirm("결재를 중단 하시겠습니까?");
            if (confirmResult) {
                setModal(false)
                setReqNo();
            }
        }
    }

    return (
        <>

                <>
                    <div className="pageTitle-div">직원 연차 관리</div>
                    <div className="require-management-content">
                        <div className="require-nav">
                            <div className={`require-nav-nav ${selectedNav === '상신' ? 'selected' : ''}`}
                                 onClick={() => handleNavClick("상신")}>상신
                            </div>
                            <div className={`require-nav-nav ${selectedNav === '결재완료' ? 'selected' : ''}`}
                                 onClick={() => handleNavClick("결재완료")}>결재완료
                            </div>
                            <div className={`require-nav-nav ${selectedNav === '반려' ? 'selected' : ''}`}
                                 onClick={() => handleNavClick("반려")}>반려
                            </div>
                        </div>
                    </div>
                    {proceedRequire &&
                        <div onMouseDown={onClickExitHandler}>
                            <ProceedRequireList proceedRequire={proceedRequire}/>
                            <PagingBar pageInfo={proceedRequire?.pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                    }

                </>

        </>
    )
}

export default VacationManagement;
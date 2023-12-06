import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callEmployeesListAPI, callEmployeesListRemoveAPI} from "../apis/EmployeesAPICalls";
import EmployeesList from "../components/employee/lists/EmployeesList";
import EmployeesPagingBar from "../components/common/EmployeesPagingBar";
import EmployeesModal from "../components/employee/modal/EmployeesModal";
import EmployeesRegistModal from "../components/employee/modal/EmployeesRegistModal";

function Employees() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {employees} = useSelector(state => state.employeesReducer);
    useEffect(() => {
        /* 모든 상품에 대한 정보 요청 */
        dispatch(callEmployeesListAPI({currentPage}));
    }, [currentPage]);
    const [toggleEmployee, setToggleEmployee] = useState();

    const employeeCode = toggleEmployee

    const onClickEmployeeDeleteHandler = () => {
        dispatch(callEmployeesListRemoveAPI({employeeCode}));
    }
    const [registModalOpen, setRegistModalOpen] = useState(false);
    const showRegistModal = () => {
        setRegistModalOpen(true)
    }

    return(
        <div>
        <h1 className="employees-title">직원 정보 조회</h1>
        <div className="employees-div">
            {employees && (
                <>
                    <div className="employees-list-btn">
                        <select className="employees-list-select">
                            <option>분류</option>
                            <option>사번</option>
                            <option>직급</option>
                            <option>성별</option>
                            <option>입사일</option>
                            <option>퇴직자</option>
                        </select>
                    <input type="text" className="employees-list-search" placeholder="검색어를 입력하세요."></input>
                    <button type="submit" className="employees-list-search-btn">검색</button>
                    <button onClick={showRegistModal} className="employees-list-regist-btn">추가</button>
                    <button className="employees-list-update-btn">수정</button>
                    <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn">삭제</button>
                    </div>
                    <EmployeesList setToggleEmployee={setToggleEmployee} data={employees.data}/>
                    <EmployeesPagingBar pageInfo={employees.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            )}
            {registModalOpen &&
                <EmployeesRegistModal employees={employees} key={employees.employeeCode} setRegistModalOpen={setRegistModalOpen}/>
            }
        </div>
    </div>
    )
}
export default Employees;
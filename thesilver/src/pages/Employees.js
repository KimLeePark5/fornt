import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callEmployeesListAPI, callEmployeesListRemoveAPI} from "../apis/EmployeesAPICalls";
import EmployeesList from "../components/employee/lists/EmployeesList";
import EmployeesPagingBar from "../components/common/EmployeesPagingBar";
import EmployeesRegistModal from "../components/employee/modal/EmployeesRegistModal";

function Employees() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {employees, putSuccess, postSuccess, putRemoveSuccess} = useSelector(state => state.employeesReducer);
    const [registModalOpen, setRegistModalOpen] = useState(false);
    const [toggleEmployee, setToggleEmployee] = useState(null);
    console.log("togge", toggleEmployee)
    useEffect(() => {
        dispatch(callEmployeesListAPI({currentPage}));
    }, [currentPage, putSuccess, postSuccess, putRemoveSuccess]);

    const onClickEmployeeDeleteHandler = () => {
        if(toggleEmployee!=null) {
            dispatch(callEmployeesListRemoveAPI({employeeCode : toggleEmployee}));
        } else {
            alert("선택해주세요.")
            return
        }
    }
    const showRegistModal = () => {
        setRegistModalOpen(true)
    }
    return(
        <div style={{zoom:0.85}}>
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
                        <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn" style={{float:"right", marginLeft:745}}>삭제</button>
                    <button onClick={showRegistModal} className="employees-list-regist-btn" style={{float:"right"}}>추가</button>
                    </div>
                    <EmployeesList setToggleEmployee={setToggleEmployee} data={employees.data} setCurrentPage={setCurrentPage}/>
                    <EmployeesPagingBar pageInfo={employees.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            )}
            {registModalOpen &&
                <EmployeesRegistModal employees={employees} key={employees?.employeeCode} setRegistModalOpen={setRegistModalOpen}/>
            }
        </div>
    </div>
    )
}
export default Employees;
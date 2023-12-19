import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callEmployeesListAPI, callEmployeesListRemoveAPI, EmpSearchAPI} from "../apis/EmployeesAPICalls";
import EmployeesList from "../components/employee/lists/EmployeesList";
import EmployeesPagingBar from "../components/common/EmployeesPagingBar";
import EmployeesRegistModal from "../components/employee/modal/EmployeesRegistModal";
import {getEmployees, putPwdReset} from "../modules/EmployeesModule";

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
            setToggleEmployee(null)
        } else {
            alert("선택해주세요.")
            return
        }
    }
    const showRegistModal = () => {
        setRegistModalOpen(true)
    }
    const [form, setForm] = useState({
    })
    const formChangeHandler = (e)=>{
        setForm({
            ...form,
            [e.target.name] :e.target.value
        })
    }
    const searchEvent = ()=>{
        if(!form?.searchCategory && !form?.searchValue){
            alert("분류를 선택해 주세요!")
        }else if(form?.searchCategory && !form?.searchValue){
            dispatch(callEmployeesListAPI(1))
        }else if(form?.searchValue==="null"){
            dispatch(callEmployeesListAPI(1))
        }else if(form?.searchCategory==='rankCode'&&!form?.searchValue) {
            dispatch(callEmployeesListAPI(1))
        }else {
            dispatch(EmpSearchAPI(form))
        }
    }
    console.log(form)

    return(
        <div style={{zoom:0.9}}>
        <h1 className="employees-title">직원 정보 조회</h1>
        <div className="employees-div">
            {employees && (
                <>
                    <div className="employees-list-btn">
                        <select className="employees-list-select" name='searchCategory' onChange={formChangeHandler}>
                            <option value='null'>분류</option>
                            <option value='employeeCode'>사번</option>
                            <option value='employeeName'>이름</option>
                            <option value='rankCode'>직급</option>
                            <option value='gender'>성별</option>
                            <option value='joinDate'>입사일</option>
                        </select>
                        {form?.searchCategory!=='rankCode' && form?.searchCategory!=='gender' && form?.searchCategory!=='joinDate' &&
                            <input type="text" className="employees-list-search" placeholder="검색어를 입력하세요." onChange={formChangeHandler} id='searchValue' name='searchValue'></input>
                        }

                        {form?.searchCategory==='rankCode' &&
                            <select className="employees-list-select" name='searchValue' style={{marginLeft:5}} onChange={formChangeHandler}>
                                <option value='null'>전체</option>
                                <option value='센터장'>센터장</option>
                                <option value='팀장'>팀장</option>
                                <option value='직원'>직원</option>
                            </select>
                        }
                        {form?.searchCategory==='gender' &&
                            <select className="employees-list-select" name='searchValue' style={{marginLeft:5}} onChange={formChangeHandler} >
                                <option value='null'>전체</option>
                                <option value='남자' >남자</option>
                                <option value='여자'>여자</option>
                            </select>
                        }
                        {form?.searchCategory==='joinDate' &&
                            <input type="date" className="employees-list-select" name='searchValue' style={{marginLeft:5, width:150, height:44.2, background:"none"}} onChange={formChangeHandler}>
                            </input>
                        }
                    <button type="submit" className="employees-list-search-btn" onClick={searchEvent}>검색</button>
                        {form?.searchCategory!=='rankCode' && form?.searchCategory!=='gender' && form?.searchCategory!=='joinDate' &&
                            <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn" style={{float:"right", marginLeft:745}}>삭제</button>
                        }
                        {form?.searchCategory==='rankCode' &&
                            <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn" style={{float:"right", marginLeft:891.5}}>삭제</button>
                        }
                        {form?.searchCategory==='gender' &&
                            <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn" style={{float:"right", marginLeft:891.5}}>삭제</button>
                        }
                        {form?.searchCategory==='joinDate' &&
                            <button onClick={onClickEmployeeDeleteHandler} className="employees-list-delete-btn" style={{float:"right", marginLeft:836}}>삭제</button>
                        }

                    <button onClick={showRegistModal} className="employees-list-regist-btn" style={{float:"right", marginRight:0}}>추가</button>
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
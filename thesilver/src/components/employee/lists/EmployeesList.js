import EmployeesListItem from "../items/EmployeesListItem";
import EmployeesModal from "../modal/EmployeesModal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeesListAPI} from "../../../apis/EmployeesAPICalls";
import EmployeesModifyModalItem from "../items/EmployeesModifyModalItem";
import employees from "../../../pages/Employees";


function EmployeesList({data, setToggleEmployee}) {
    const [btnActive, setBtnActive] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [employee, setEmployee] = useState({})
    const [employeeCode, setEmployeeCode] = useState(null)

    const showModal = () => {
        setModalOpen(true);
        setBtnActive(false);
    }

    // useEffect(()=>{
    //     setToggleEmployee(employeeCode)
    // },[setEmployeeCode])
    return(

        <>
        <table className="employees-list-table">
                <thead className="employees-list-header">
                <tr>
                    <th className="employees-list-body-code">사번</th>
                    <th className="employees-list-body-rank">직급</th>
                    <th className="employees-list-body-team">팀</th>
                    <th className="employees-list-body-name">이름</th>
                    <th className="employees-list-body-gender">성별</th>
                    <th className="employees-list-body-rN">생년월일</th>
                    <th className="employees-list-body-phone">전화번호</th>
                    <th className="employees-list-body-joinDate">입사일</th>
                </tr>
                </thead>
                <tbody onDoubleClick={showModal}>
                {/*onClick={(event)=>setXY({ x: event.clientX, y: event.clientY })}*/}
                {data.map(employees =>
                    <EmployeesListItem setToggleEmployee={setToggleEmployee} key={employees.employeeCode} employees={employees} btnActive={btnActive} setBtnActive={setBtnActive} setModalOpen={setModalOpen} setEmployee={setEmployee}
                                       setEmployeeCode={setEmployeeCode}></EmployeesListItem>)}
                </tbody>
        </table>
            {modalOpen &&
                <EmployeesModal employeeCode={employeeCode} data={data} key={employee.employeeCode} setModalOpen={setModalOpen}/>
            }
        </>
    )

}export default EmployeesList;
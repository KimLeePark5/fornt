import EmployeesListItem from "../items/EmployeesListItem";
import EmployeesModal from "../modal/EmployeesModal";
import {useState} from "react";


function EmployeesList({data, setToggleEmployee}) {
    const [btnActive, setBtnActive] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [employee, setEmployee] = useState({})
    const [employeeCode, setEmployeeCode] = useState(null)

    const showModal = () => {
        setModalOpen(true);
        setBtnActive(false);
    }
    console.log(data.length)
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
                {data.map(employees =>
                    <EmployeesListItem setToggleEmployee={setToggleEmployee} key={employees.employeeCode} employees={employees} btnActive={btnActive} setBtnActive={setBtnActive} setModalOpen={setModalOpen} setEmployee={setEmployee}
                                       data={data} setEmployeeCode={setEmployeeCode}></EmployeesListItem>)}
                {data.length===0 &&
                    <tr className="employees-list-items">
                        <td colSpan="10"> 존재 하지 않습니다.</td>
                    </tr>
                }
                </tbody>
        </table>
            {modalOpen &&
                <EmployeesModal employeeCode={employeeCode} data={data} key={employee.employeeCode} setModalOpen={setModalOpen}/>
            }
        </>
    )

}export default EmployeesList;
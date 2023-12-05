import EmployeesListItem from "../items/EmployeesListItem";
import {useRef, useState} from "react";
import EmployeesModal from "../modal/EmployeesModal";


function EmployeesList({data, setToggleEmployee}) {

    const [btnActive, setBtnActive] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [employees, setEmployees] = useState({});

    return(
        <>
        <table className="employees-list-table">
                <thead>
                <tr className="employees-list-header">
                    <th className="employees-list-body-code">사번</th>
                    <th className="employees-list-body-rank">직급</th>
                    <th className="employees-list-body-team">팀</th>
                    <th className="employees-list-body-name">이름</th>
                    <th className="employees-list-body-gender">성별</th>
                    <th className="employees-list-body-rN">생년월일</th>
                    <th className="employees-list-body-phone">전화번호</th>
                    <th className="employees-list-body-joinDate">입사일</th>
                    <th className="employees-list-body-detail">상세보기</th>
                </tr>
                </thead>
                <tbody>

                    {data.map(employees => <EmployeesListItem setToggleEmployee={setToggleEmployee} setEmployees={setEmployees} key={employees.employeeCode} employees={employees} btnActive={btnActive} setBtnActive={setBtnActive} setModalOpen={setModalOpen}/>)}

                </tbody>
        </table>
            {modalOpen &&
                    <EmployeesModal employees={employees} key={employees.employeeCode} setModalOpen={setModalOpen} data={data}/>
            }
        </>
    )

}export default EmployeesList;
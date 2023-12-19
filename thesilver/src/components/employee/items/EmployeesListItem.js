import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

function EmployeesListItem({setToggleEmployee, employees, btnActive, setBtnActive, setEmployee, setEmployeeCode, data}) {
    const toggleActive = () => {
        setBtnActive(() => {
            if (btnActive === employees.employeeCode) {
                setToggleEmployee(null)
                return null;
            } else {
                setToggleEmployee(employees.employeeCode)
                setEmployee(employees)
                setEmployeeCode(employees.employeeCode)
                return employees.employeeCode
            }
        })
    };
    return (

        <tr align={"center"} onClick={toggleActive}
            className={(employees.account && employees.account.attemptCount==5 ? "employees-list-items-lock" : "employees-list-items") + (employees.employeeCode == btnActive ? " active" : "")}>
            {employees.account && employees.account.attemptCount==5 ?
                <td><div className="employees-list-items-lock-div">잠금상태</div>{employees.account?.employeeNumber}</td>
                :
                <td>{employees.account?.employeeNumber}</td>
            }
            <td>{employees.rank.rankName}</td>
            <td>{employees.team.teamName}</td>
            <td>{employees.employeeName}</td>
            <td>{employees.gender}</td>
            <td>{employees.registrationNumber}</td>
            <td>{employees.employeePhone}</td>
            <td>{employees.joinDate}</td>
        </tr>
    )
}


export default EmployeesListItem;
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

function EmployeesListItem({setToggleEmployee, employees, btnActive, setBtnActive, setEmployee, setEmployeeCode}) {
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
            className={"employees-list-items" + (employees.employeeCode == btnActive ? " active" : "")}>
            <td>{employees.employeeCode}</td>
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
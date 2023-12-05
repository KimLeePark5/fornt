function EmployeesListItem({setToggleEmployee, employees, btnActive, setBtnActive, setModalOpen, setEmployees}) {

    const showModal = () => {
            setModalOpen(true);
            setEmployees(employees)

    };
    const toggleActive = () => {
        setBtnActive(() => {
            if (btnActive === employees.employeeCode) {
                setToggleEmployee(null)
                return false;
            } else {
                setToggleEmployee(employees.employeeCode)
                return employees.employeeCode
            }

        });
    };

    return (
        <tr align={"center"} onClick={toggleActive}
            className={"employees-list-items" + (employees.employeeCode == btnActive ? " active" : "")}>
            <td>{employees.employeeCode}</td>
            <td>{employees.rank}</td>
            <td>{employees.team}</td>
            <td>{employees.employeeName}</td>
            <td>{employees.gender}</td>
            <td>{employees.registrationNumber}</td>
            <td>{employees.employeePhone}</td>
            <td>{employees.joinDate}</td>
            <td>
                <button
                    className="employees-list-button"
                    onClick={() => showModal(true)}>보기
                </button>
            </td>
        </tr>
    )

}


export default EmployeesListItem;
import {getEmployees} from "../modules/EmployeesModule";
import {request} from "./Api";

export const callEmployeesListAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
        const result = await request("GET", `/api/v1/employees?page=${currentPage}`)

        if (result?.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}

export const callEmployeesListRemoveAPI = ({ employeeCode }) => {
    return async (dispatch, getState) => {
        const result = await request("DELETE", `/api/v1/employees/${employeeCode}`)

        if (result?.status === 204) {
            window.location.replace("/employees");
            alert("삭제 완료")
        } else {
            alert("선택을 해야 삭제 할 수 있습니다.")
        }
    }
}
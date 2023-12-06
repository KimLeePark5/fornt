import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_EMPLOYEES = 'employees/GET_EMPLOYEES';

export const {employees: {getEmployees}} = createActions({
    [GET_EMPLOYEES]: result => ({employees: result.data})
});

/* 리듀서 함수 */
const employeesReducer = handleActions({
    [GET_EMPLOYEES]: (state, {payload}) => payload,
}, initialState);

export default employeesReducer;
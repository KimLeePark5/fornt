import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_EMPLOYEES = 'employees/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employees/GET_EMPLOYEE';
const POST_SUCCESS = 'employees/POST_SUCCESS';
const PUT_SUCCESS = 'employees/PUT_SUCCESS';
const PUT_SUCCESS_FALSE = 'employees/PUT_SUCCESS_FALSE'
const PUT_REMOVE_SUCCESS = 'employees/PUT_REMOVE_SUCCESS'
const PUT_PWD_RESET = 'employees/PUT_PWD_RESET'
const GET_EMPLOYEE_INFO = 'employees/GET_EMPLOYEE_INFO'

export const {employees: {getEmployees, getEmployee, postSuccess, putSuccess, putRemoveSuccess, putPwdReset,getEmployeeInfo}} = createActions({
    [GET_EMPLOYEES]: result => ({employees: result.data}),
    [GET_EMPLOYEE]: result => ({employee: result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : false }),
    [PUT_SUCCESS_FALSE] : () => ({ putSuccess : null }),
    [PUT_REMOVE_SUCCESS] : () => ({ putRemoveSuccess : true }),
    [PUT_PWD_RESET] : () => ({PUT_PWD_RESET : true}),
    [GET_EMPLOYEE_INFO] : result => ({MainEmployee : result.data})
});

/* 리듀서 함수 */
const employeesReducer = handleActions({
    [GET_EMPLOYEES]: (state, {payload}) => payload,
    [GET_EMPLOYEE]: (state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => ({...state, ...payload}),
    [PUT_SUCCESS_FALSE] : (state, { payload }) => ({...state, ...payload}),
    [PUT_REMOVE_SUCCESS] : (state, { payload }) => ({...state, ...payload}),
    [PUT_PWD_RESET] : (state, { payload }) => ({...state, ...payload}),
    [GET_EMPLOYEE_INFO] : (state, {payload}) => payload
}, initialState);

export default employeesReducer;
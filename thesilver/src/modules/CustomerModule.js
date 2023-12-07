import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
const POST_SUCCESS = 'customers/POST_SUCCESS';
const GET_CUSTOMER = 'customers/GET_CUSTOMER';
const PUT_SUCCESS = 'customers/PUT_SUCCESS';
const PUT_SUCCESS_RESET = 'customers/PUT_SUCCESS_RESET';

export const {customers: {getCustomers, postSuccess, getCustomer, putSuccess, putSuccessReset}} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data}),
    [POST_SUCCESS]: result => ({postSuccess: true}),
    [GET_CUSTOMER]: result => ({customer: result.data}),
    [PUT_SUCCESS]: () => ({putSuccess: true}),
    [PUT_SUCCESS_RESET]: () => ({putSuccess: false})
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => payload,
    [POST_SUCCESS]: (state, {payload}) => payload,
    [GET_CUSTOMER]: (state, {payload}) => ({...state, ...payload}),
    [PUT_SUCCESS]: (state, {payload}) => payload,
    [PUT_SUCCESS_RESET]: (state, {payload}) => payload
}, initialState);

export default customerReducer;
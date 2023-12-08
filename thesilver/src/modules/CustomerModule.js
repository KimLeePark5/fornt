import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
const POST_SUCCESS = 'customers/POST_SUCCESS';
const GET_CUSTOMER = 'customers/GET_CUSTOMER';
const PUT_SUCCESS = 'customers/PUT_SUCCESS';
const GET_LICENSE = 'customers/GET_LICENSE';

export const {customers: {getCustomers, postSuccess, getCustomer, putSuccess, getLicense }} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data}),
    [POST_SUCCESS]: () => ({postSuccess: true}),
    [GET_CUSTOMER]: result => ({customer: result.data}),
    [PUT_SUCCESS]: () => ({putSuccess: true}),
    [GET_LICENSE]: (result) => ({license: result.data})
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => payload,
    [POST_SUCCESS]: (state, {payload}) => payload,
    [GET_CUSTOMER]: (state, {payload}) => ({...state, ...payload}),
    [PUT_SUCCESS]: (state, {payload}) => payload,
    [GET_LICENSE]: (state, {payload}) => ({...state, ...payload})
}, initialState);

export default customerReducer;
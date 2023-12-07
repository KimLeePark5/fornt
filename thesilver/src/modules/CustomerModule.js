import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
const POST_SUCCESS = 'customers/POST_SUCCESS';
const GET_CUSTOMER = 'customers/GET_CUSTOMER';

export const {customers: {getCustomers, postSuccess, getCustomer}} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data}),
    [POST_SUCCESS]: result => ({postSuccess: true}),
    [GET_CUSTOMER]: result => ({customer: result.data})
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => payload,
    [POST_SUCCESS]: (state, {payload}) => payload,
    [GET_CUSTOMER]: (state, {payload}) => ({...state, ...payload})
}, initialState);

export default customerReducer;
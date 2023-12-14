import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
const POST_SUCCESS = 'customers/POST_SUCCESS';
const GET_CUSTOMER = 'customers/GET_CUSTOMER';
const PUT_SUCCESS = 'customers/PUT_SUCCESS';
const GET_LICENSE = 'customers/GET_LICENSE';
const GET_LICENSE_RESET = 'customers/GET_LICENSE_RESET';
const POST_LICENSE = 'customers/POST_LICENSE';
const POST_LICENSE_RESET = 'customers/POST_LICENSE_RESET';
const DELETE_LICENSE = 'customers/DELETE_LICENSE';
const DELETE_LICENSE_RESET = 'customers/DELETE_LICENSE_RESET';
const GET_GRAPH_DATA = 'customers/GET_GRAPH_DATA';

export const {
    customers: {
        getCustomers,
        postSuccess,
        getCustomer,
        putSuccess,
        getLicense,
        getLicenseReset,
        postLicense,
        postLicenseReset,
        deleteLicense,
        deleteLicenseReset,
        getGraphData
    }
} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data}),
    [POST_SUCCESS]: () => ({postSuccess: true}),
    [GET_CUSTOMER]: result => ({customer: result.data}),
    [PUT_SUCCESS]: () => ({putSuccess: true}),
    [GET_LICENSE]: (result) => ({license: result.data}),
    [GET_LICENSE_RESET]: () => ({license: null}),
    [POST_LICENSE]: () => ({postLicenseSuccess: true}),
    [POST_LICENSE_RESET]: () => ({postLicenseSuccess: false}),
    [DELETE_LICENSE]: () => ({deleteLicenseSuccess: true}),
    [DELETE_LICENSE_RESET]: () => ({deleteLicenseSuccess: false}),
    [GET_GRAPH_DATA]: (result) => ({graphData: result.data})
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => ({...state, ...payload}),
    [POST_SUCCESS]: (state, {payload}) => payload,
    [GET_CUSTOMER]: (state, {payload}) => ({...state, ...payload}),
    [PUT_SUCCESS]: (state, {payload}) => payload,
    [GET_LICENSE]: (state, {payload}) => ({...state, ...payload}),
    [GET_LICENSE_RESET]: (state, {payload}) => ({...state, ...payload}),
    [POST_LICENSE]: (state, {payload}) => ({...state, ...payload}),
    [POST_LICENSE_RESET]: (state, {payload}) => ({...state, ...payload}),
    [DELETE_LICENSE]: (state, {payload}) => ({...state, ...payload}),
    [DELETE_LICENSE_RESET]: (state, {payload}) => ({...state, ...payload}),
    [GET_GRAPH_DATA]: (state, {payload}) => ({...state, ...payload})
}, initialState);

export default customerReducer;
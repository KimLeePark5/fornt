import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
const POST_SUCCESS = 'customers/POST_SUCCESS';

export const {customers: {getCustomers, postSuccess}} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data}),
    [POST_SUCCESS]: result => ({ postSuccess : true })
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => payload,
    [POST_SUCCESS]: (state, {payload}) => payload,
}, initialState);

export default customerReducer;
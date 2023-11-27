import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';

export const {customers: {getCustomers}} = createActions({
    [GET_CUSTOMERS]: result => ({customers: result.data})
});

/* 리듀서 함수 */
const customerReducer = handleActions({
    [GET_CUSTOMERS]: (state, {payload}) => payload,
}, initialState);

export default customerReducer;
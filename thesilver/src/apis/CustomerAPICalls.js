import {authRequest, request} from "./Api";
import {getCustomers} from "../modules/CustomerModule";

export const callTestAPI = () => {
    return async (dispatch, getState) => {
        const result = await request("GET","/test")

        console.log("callTestAPI결과 : " , result)
    }
}

export const callCustomerListAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
        const result = await request("GET", `/api/v1/customers?page=${currentPage}`)
        console.log("callCustomerListAPI결과 : ", result)

        if (result.status === 200) {
            dispatch(getCustomers(result));
        }
    }
}

export const callCustomersAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/customers?page=${currentPage}`)
        console.log('callCustomersAPI : ', result);

        if (result.status === 200) {
            dispatch(getCustomers(result));
        }
    }
}
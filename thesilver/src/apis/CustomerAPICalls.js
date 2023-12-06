import {authRequest, request} from "./Api";
import {getCustomers, postSuccess} from "../modules/CustomerModule";

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

export const callCustomerRegistAPI = ({ registForm }) => {
    return async (dispatch, getState) => {
        console.log('레지스트폼 : ', registForm);

        const result = await authRequest.post("/api/v1/customers", registForm)
        console.log('callCustomersAPI : ', result);

        if (result.status === 201) {
            dispatch(postSuccess());
        }
    }
}
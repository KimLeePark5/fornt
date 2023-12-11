import {authRequest, request} from "./Api";
import {getCustomer, getCustomers, postSuccess} from "../modules/CustomerModule";

// 고객 리스트 조회
export const callCustomersAPI = ({ condition, currentPage = 1 }) => {
    return async (dispatch, getState) => {

        console.log("액티브체크", condition)

        const result = await authRequest.get(`/api/v1/customers/condition?page=${currentPage}&searchType=${condition.searchType}&searchContent=${condition.searchContent}&searchActiveCheck=${condition.searchActiveCheck}`)

        if (result.status === 200) {
            dispatch(getCustomers(result));
        }

    }
}

// // 고객 리스트 조회 (쿼리dsl)
// export const callCustomersDslAPI = () => {
//     return async (dispatch, getState) => {
//         const result = await authRequest.get(`/api/v1/customers?page=${currentPage}`)
//
//         if (result.status === 200) {
//             dispatch(getCustomers(result));
//         }
//     }
// }

// 고객 등록
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

// 고객 상세 조회
export const callCustomerAPI = ({customerCode}) => {
    return async (dispatch, getState) => {
        console.log("커스토머코드 : " + customerCode)
        const result = await authRequest.get(`/api/v1/customers/${customerCode}`)

        if (result.status === 200) {
            dispatch(getCustomer(result));
        }
    }
}
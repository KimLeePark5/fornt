import {authRequest, request} from "./Api";
import {
    deleteLicense, deleteLicenseReset,
    getCustomer,
    getCustomers, getGraphData,
    getLicense,
    postLicense,
    postSuccess,
    putSuccess
} from "../modules/CustomerModule";
import {LicenseRegistError} from "../components/customer/form/LicenseModifyForm";

// 고객 리스트 조회
export const callCustomersAPI = ({condition, currentPage = 1}) => {
    return async (dispatch, getState) => {

        console.log("액티브체크", condition)

        const result = await authRequest.get(`/api/v1/customers/condition?page=${currentPage}&searchType=${condition.searchType}&searchContent=${condition.searchContent}&searchActiveCheck=${condition.searchActiveCheck}`)

        if (result.status === 200) {
            dispatch(getCustomers(result));
        }

    }
}

// 고객 등록
export const callCustomerRegistAPI = ({registForm}) => {
    return async (dispatch, getState) => {
        console.log('레지스트폼 : ', registForm);

        const result = await authRequest.post(`/api/v1/customers`, registForm)
        console.log('callCustomersAPI : ', result);

        if (result.status === 201) {
            dispatch(postSuccess());
        }
    }
}

// 고객 정보 수정
export const callCustomerModifyAPI = ({modifyForm, customerCode}) => {
    return async (dispatch, getState) => {
        console.log('모디파이폼 : ', modifyForm)
        console.log('코드 : ', customerCode);

        const result = await authRequest.put(`/api/v1/customers/${customerCode}`, modifyForm)
        console.log('callCustomerModifyAPI : ', result);

        if (result.status === 201) {
            dispatch(putSuccess());
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

// 고객 회원권 조회
export const callLicenseAPI = ({customerCode, currentPage = 1}) => {
    return async (dispatch, getState) => {
        console.log("첫번째 커스토머코드 : " + customerCode)
        const result = await authRequest.get(`/api/v1/customers/licenses/${customerCode}?page=${currentPage}`)

        console.log("api라이센스결과 : ", result)

        if (result.status === 200) {
            dispatch(getLicense(result));
        }
    }
}

export const callLicenseRegistAPI = ({customerCode, licenseDate}) => {
    return async (dispatch, getState) => {
        console.log("customerCode : " + customerCode)
        console.log("licenseDate : ", licenseDate)
        const result = await authRequest.post(`/api/v1/customers/licenses/${customerCode}`, licenseDate)
            .catch(e => {
                    if (e.response.status === 409)
                        alert(e.response.data.message);
                }
            )
        console.log("api라이센스결과 : ", result)

        if (result?.status === 201) {
            dispatch(postLicense());
        }
    }
}

export const callLicenseDeleteAPI = ({licenseCode}) => {
    return async (dispatch, getState) => {
        console.log("licenseCode : " + licenseCode)
        const result = await authRequest.delete(`/api/v1/customers/licenses/${licenseCode}`)
            .catch(e => {
                    if (e.response.status === 409)
                        alert(e.response.data.message);
                }
            )
        console.log("api라이센스결과 : ", result)

        if (result?.status === 204) {
            dispatch(deleteLicense())
        }
    }
}

export const callGraphDataAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/customers/graph`)
            .catch(e => {
                    if (e.response.status === 409)
                        alert(e.response.data.message);
                }
            )
        console.log("api라이센스결과 : ", result)

        if (result?.status === 200) {
            dispatch(getGraphData(result))
        }
    }
}




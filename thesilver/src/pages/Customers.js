import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import CustomerList from "../components/customer/lists/CustomerList";
import PagingBar from "../components/common/PagingBar";
import CustomerModifyForm from "../components/customer/form/CustomerModifyForm";
import {callCustomerAPI, callCustomersAPI, callGraphDataAPI, callLicenseAPI} from "../apis/CustomerAPICalls";
import LicenseModifyForm from "../components/customer/form/LicenseModifyForm";
import FirstGraph from "../components/customer/graph/FirstGraph";
import {firstGraphData, secondGraphData, thirdGraphData} from "../components/customer/data/graphData";
import secondGraph from "../components/customer/graph/SecondGraph";
import SecondGraph from "../components/customer/graph/SecondGraph";
import thirdGraph from "../components/customer/graph/ThirdGraph";
import ThirdGraph from "../components/customer/graph/ThirdGraph";
import {getLicenseReset} from "../modules/CustomerModule";
import {useSearchParams} from "react-router-dom";

function Customers() {


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {customers, customer, putSuccess, license, graphData} = useSelector(state => state.customerReducer);
    const [customerCode, setCustomerCode] = useState();
    const [modal, setModal] = useState(false);
    const [licenseModal, setLicenseModal] = useState(false);
    const [condition, setCondition] = useState({});
    const [searchParams] = useSearchParams();
    const accountStatus = searchParams.get('accountStatus')

    // 그래프 데이터
    useEffect(() => {
        dispatch(callGraphDataAPI())
    }, []);

    console.log("데이터확인 : ", graphData)

    const firstData = firstGraphData
    const secondData = secondGraphData
    const thirdData = thirdGraphData

    useEffect(() => {
        dispatch(callCustomersAPI({condition, currentPage}));

        if (putSuccess) {
            alert("고객 정보 수정이 완료되었습니다.")
            onSuccessCloseHandler("customer")
        }
    }, [currentPage, condition, putSuccess]);

    useEffect(() => {
        if (customerCode) {
            dispatch(callCustomerAPI({customerCode}))
                .then(setModal(true))
        }
    }, [customerCode]);

    const openLicenseModal = (customerCode) => {
        console.log("첫번째 코스토머스 로그")
        dispatch(callLicenseAPI({customerCode}))
    }

    useEffect(() => {
        if (license) {
            console.log("라이센스! : ", license);
            setLicenseModal(true);
        }
    }, [license]);

    const onClickOutsideHandler = (e) => {
        if (e.target === e.currentTarget) {
            // eslint-disable-next-line no-restricted-globals
            const confirmResult = confirm("작성을 중단하고 창을 닫으시겠습니까 ?");
            if (confirmResult) {
                setModal(false)
                setLicenseModal(false)
                console.log("타겟클릭")
                setCustomerCode();
                dispatch(getLicenseReset())
            }
        }
    }

    const onClickCloseHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmResult = confirm("작성을 중단하고 창을 닫으시겠습니까 ?");
        if (confirmResult) {
            setModal(false)
            setLicenseModal(false)
            setCustomerCode();
            dispatch(getLicenseReset());
        }
    }

    const onSuccessCloseHandler = (type) => {
        if (type === "customer") {
            setModal(false)
            setCustomerCode();
        }

        if (type === "license") {

        }
    }


    return (
        <>
            {customers && (
                <>
                    <div>
                        <div className="pageTitle-div">고객 관리</div>
                        <div className="customers-subtitle">고객 관리 현황</div>

                        <div className="customers-type">

                            <div className="customers-type-first">
                                <FirstGraph data={firstData}/>
                            </div>
                            <div className="customers-type-second">
                                <SecondGraph data={secondData}/>
                            </div>
                            <div className="customers-type-third">
                                <ThirdGraph data={thirdData}/>
                            </div>
                        </div>

                        <div className="customers-list">
                            <CustomerList openLicenseModal={openLicenseModal} setCurrentPage={setCurrentPage}
                                          setCondition={setCondition} data={customers.data}
                                          setCustomerCode={setCustomerCode}/>
                            <PagingBar pageInfo={customers.pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>

                    {modal && (
                        <div className="customers-modify-page" onMouseDown={onClickOutsideHandler}>
                            <CustomerModifyForm onSuccessCloseHandler={onSuccessCloseHandler} customer={customer}
                                                onClickCloseHandler={onClickCloseHandler}/>
                        </div>
                    )}
                    {licenseModal && (
                        <div className="customers-modify-page" onMouseDown={onClickOutsideHandler}>
                            <LicenseModifyForm openLicenseModal={openLicenseModal}
                                               onSuccessCloseHandler={onSuccessCloseHandler}
                                               licenses={license?.data.licenses} customer={license?.data.customer}
                                               pageInfo={license?.pageInfo}
                                               onClickCloseHandler={onClickCloseHandler}/>
                        </div>
                    )}
                </>
            )}
        </>
    )

}

export default Customers;
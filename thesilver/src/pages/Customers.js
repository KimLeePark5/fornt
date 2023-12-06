import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {callCustomersAPI} from "../apis/CustomerAPICalls";
import {callCustomerAPI, callCustomerListAPI, callCustomersAPI} from "../apis/CustomerAPICalls";
import CustomerList from "../components/customer/lists/CustomerList";
import PagingBar from "../components/common/PagingBar";
import {jwtDecode} from "jwt-decode";
import {isLogin} from "../utils/TokenUtils";
import CustomerRegistForm from "../components/customer/form/CustomerRegistForm";
import CustomerModifyForm from "../components/customer/form/CustomerModifyForm";

function Customers() {


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {customers, customer} = useSelector(state => state.customerReducer);
    const [customerCode, setCustomerCode] = useState();
    const [modal, setModal] = useState(false);
    const [condition, setCondition] = useState({
        searchType : "이름",
        searchContent : " "
    })

    const onChangeConditionHandler = (e) => {
        setCondition({
            ...condition,
            [e.target.name] : e.value
        })
    }

    useEffect(() => {
        dispatch(callCustomersAPI({condition, currentPage}));
        console.log("@@@@@@@@@@@@ 첫번째이펙트 @@@@@@@@@@@@@@@@")
    }, [currentPage, condition]);

    useEffect(() => {
        if (customerCode) {
            dispatch(callCustomerAPI({customerCode}))
                .then(setModal(true))
        }
        console.log("@@@@@@@@@@@@ 두번째이펙트 @@@@@@@@@@@@@@@@")
    }, [customerCode]);

    const onClickOutsideHandler = (e) => {
        if (e.target === e.currentTarget) {
            // eslint-disable-next-line no-restricted-globals
            const confirmResult = confirm("작성을 중단하고 창을 닫으시겠습니까 ?");
            if (confirmResult) {
                setModal(false)
                console.log("타겟클릭")
                setCustomerCode();
            }
        }
    }

    const onClickCloseHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmResult = confirm("작성을 중단하고 창을 닫으시겠습니까 ?");
        if (confirmResult) {
            setModal(false)
            console.log("타겟클릭")
            setCustomerCode();
        }
    }

    console.log("최종 커스토머 : ", customer)
    console.log("최종 customers : ", customers)

    return (
        <>
            {customers && (
                <>
                    <div>
                        <div className="pageTitle-div">고객 관리</div>
                        <div className="customers-subtitle">고객 관리 현황</div>

                        <div className="customers-type">
                            <div className="customers-type-first"></div>
                            <div className="customers-type-second"></div>
                            <div className="customers-type-third"></div>
                        </div>

                        <div className="customers-list">
                            <CustomerList onChangeConditionHandler={onChangeConditionHandler} data={customers.data} setCustomerCode={setCustomerCode}/>
                            <PagingBar pageInfo={customers.pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>
                    {modal && (
                        <div className="customers-modify-page" onClick={onClickOutsideHandler}>
                            <CustomerModifyForm customer={customer} onClickCloseHandler={onClickCloseHandler}/>
                        </div>
                    )}
                </>
            )}
        </>
    )

}

export default Customers;
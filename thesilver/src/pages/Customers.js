import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {callCustomerListAPI, callCustomersAPI} from "../apis/CustomerAPICalls";
import CustomerList from "../components/customer/lists/CustomerList";
import PagingBar from "../components/common/PagingBar";
import {jwtDecode} from "jwt-decode";
import {isLogin} from "../utils/TokenUtils";

function Customers() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {customers} = useSelector(state => state.customerReducer);
    const imageInput = useRef();

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    useEffect(() => {
        /* 모든 상품에 대한 정보 요청 */
        // dispatch(callCustomerListAPI({currentPage}));
        dispatch(callCustomersAPI({currentPage}));
    }, [currentPage]);



    console.log("customers : ", customers)
    if(isLogin()) {
        console.log(jwtDecode(window.localStorage.getItem('access-token')))
    }
    return (
        <>
            {customers && (
                <>
                    <input
                        style={ { display: 'none' }}
                        type="file"
                        name='productImage'
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={ imageInput }
                        // onChange={ onChangeImageUpload }
                    />
                    <button
                        className="product-image-button"
                        onClick={ onClickImageUpload }
                    >
                        이미지 업로드
                    </button>


                    <div className="customers-type">
                        <div className="customers-type-first"></div>
                        <div className="customers-type-second"></div>
                        <div className="customers-type-third"></div>
                    </div>
                    <div className="customers-list">
                        <CustomerList data={customers.data}/>
                        <PagingBar pageInfo={customers.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                </>
            )}
        </>
    )

}

export default Customers;
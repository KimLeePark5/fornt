import CustomerListItem from "../items/CustomerListItem";
import {useState} from "react";

function CustomerList({setCurrentPage, setCondition, data, setCustomerCode, openLicenseModal}) {
    const [form, setForm] = useState({
        searchType: "이름",
        searchContent: "",
        searchActiveCheck: false
    })

    const onChangeConditionHandler = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setForm({
            ...form,
            [e.target.name]: value
        });
        console.log(form)
    };

    const onClickHandler = () => {
        setCurrentPage(1)
        setCondition(form)
    }
    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1)
            setCondition(form)
        }
    }

    return (
        <>
            <div></div>
            <div className="customers-list-search">
                <select name="searchType" onChange={onChangeConditionHandler}>
                    <option>이름</option>
                    <option>고객코드</option>
                    <option>전화번호</option>
                    <option>주소</option>
                </select>
                <input onKeyDown={onKeyDownHandler} name="searchContent" onChange={onChangeConditionHandler}/>
                <div onClick={onClickHandler} className="customers-search-button">검색</div>
                <input checked={form.searchActiveCheck} name="searchActiveCheck" style={{zoom: 1.5, margin: 0}}
                       type="checkbox" onChange={onChangeConditionHandler}/>
                <div>해지된 고객 포함</div>
            </div>


            <div className="customers-list-head">
                <div>고객코드</div>
                <div>등록상태</div>
                <div>이름</div>
                <div>성별</div>
                <div>생년월일</div>
                <div>전화번호</div>
                <div>주소</div>
                <div>상세조회</div>
            </div>
            {data.map(customer => <CustomerListItem openLicenseModal={openLicenseModal} setCustomerCode={setCustomerCode} key={customer.customerCode}
                                                    customer={customer}/>)}
        </>
    )

}

export default CustomerList;
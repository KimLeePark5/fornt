import CustomerListItem from "../items/CustomerListItem";

function CustomerList({ onChangeConditionHandler, data, setCustomerCode }) {




    return (
        <>
            <div></div>
            <div className="customers-list-search">
                <select name="searchType" onChange={onChangeConditionHandler}>
                    <option>검색분류</option>
                    <option>고객코드</option>
                    <option>이름</option>
                    <option>전화번호</option>
                    <option>주소</option>
                </select>
                <input name="searchContent" onChange={onChangeConditionHandler}/>
                <div className="customers-search-button">검색</div>
                <input style={{zoom: 1.5, margin: 0}} type="checkbox"/>
                <div>비활성 고객 포함</div>
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
            {data.map(customer => <CustomerListItem setCustomerCode={setCustomerCode} key={customer.customerCode} customer={customer} /> )}
        </>
    )

}

export default CustomerList;
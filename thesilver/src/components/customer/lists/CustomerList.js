import CustomerListItem from "../items/CustomerListItem";

function CustomerList({ data }) {

    return (
        <>
            <div className="customerList-head">
                <div>고객코드</div>
                <div>등록상태</div>
                <div>이름</div>
                <div>성별</div>
                <div>생년월일</div>
                <div>전화번호</div>
                <div>주소</div>
            </div>
            {data.map(customer => <CustomerListItem key={customer.customerCode} customer={customer} /> )}
        </>
    )

}

export default CustomerList;
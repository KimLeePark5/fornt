import CustomerRegistForm from "../components/customer/form/CustomerRegistForm";

function CustomerRegist() {

    return (
        <>
            <div className="pageTitle-div">고객 관리</div>
            <div className="customers-subtitle">고객 신규 등록</div>
            <CustomerRegistForm/>
        </>

    )
}

export default CustomerRegist;
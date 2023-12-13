
function CustomerListItem({customer, setCustomerCode, openLicenseModal}) {

    return (
        <>
            <div className="customers-list-body">
                <div className="customers-list-item">{customer.customerCode}</div>
                <div style={{ fontWeight:"bold", color: customer.status === '등록' ? 'blue' : 'red' }}>{customer.status}</div>
                <div>{customer.name}</div>
                <div>{customer.gender}</div>
                <div>{customer.birthDate}</div>
                <div>{customer.phone}</div>
                <div>{customer.primaryAddress}</div>
                <div>
                    <span className="customers-customer-button" onClick={() => {setCustomerCode(customer.customerCode)} }>정보조회</span>
                    &nbsp;
                    <span className="customers-license-button" onClick={() => openLicenseModal(customer.customerCode)}>회원권조회</span>
                </div>
            </div>
            <hr/>
        </>

    )

}

export default CustomerListItem;
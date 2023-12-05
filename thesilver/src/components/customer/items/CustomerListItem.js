function CustomerListItem({customer}) {
    return (
        <>
            <div className="customers-list-body">
                <div className="customers-list-item">{customer.customerCode}</div>
                <div>{customer.status}</div>
                <div>{customer.name}</div>
                <div>{customer.gender}</div>
                <div>{customer.birthDate}</div>
                <div>{customer.phone}</div>
                <div>{customer.primaryAddress}</div>
                <div>
                    <span className="customers-customer-button">정보조회</span>
                    &nbsp;
                    <span className="customers-license-button">회원권조회</span>
                </div>
            </div>
            <hr/>
        </>

    )

}

export default CustomerListItem;
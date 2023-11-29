function CustomerListItem({customer}) {
    return (
        <>
            <div className="customers-list-body">
                <div>{customer.customerCode}</div>
                <div>{customer.status}</div>
                <div>{customer.name}</div>
                <div>{customer.gender}</div>
                <div>{customer.birthDate}</div>
                <div>{customer.phone}</div>
                <div>{customer.primaryAddress}</div>
            </div>
            <hr/>
        </>

    )

}

export default CustomerListItem;
function VacationStateItem () {

    return (
        <>
            <div className="pageTitle-div"></div>
            <div className="today-div"></div>
            <div className="vacationState-div">
                <table className="vacationState-table">
                    <tbody>
                    <tr>
                        <th></th>
                        <th>발생 연차</th>
                        <th>발생 월차</th>
                        <th>총 연차</th>
                        <th>사용 연차</th>
                        <th>잔여 연차</th>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>홍길동</td>
                        <td>15</td>
                        <td>0</td>
                        <td>15</td>
                        <td>6</td>
                        <td>9</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VacationStateItem;
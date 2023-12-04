function VacationStateItem ({vacation}) {


    return (
        <>
            <div className="vacation-state-body">
                <div>{vacation.employee.employeename}</div>
                <div>{vacation.occurVacation}</div>
                <div>{vacation.occurVacation}</div>
                <div>{vacation.useVacation}</div>
                <div>{}</div>
            </div>
   </>
    )
}

export default VacationStateItem;
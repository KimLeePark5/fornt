import VacationStateItem from "../items/VacationStateItem";

function VacationList({data}) {

    return (
        <>
            <div className="today-div">(오늘 날짜)</div>
            <div  className="vacation-state-head">
                <div>사원명</div>
                <div>발생 연차</div>
                <div>발생 월차</div>
                <div>총 연차</div>
                <div>사용 연차</div>
                <div>잔여 연차</div>
            </div>
            {data.map(vacation => <VacationStateItem key={vacation.employeeCode} vacation={vacation} /> )}
        </>
    )
}

export default VacationList;
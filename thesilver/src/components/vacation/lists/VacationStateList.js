import VacationStateItem from "../items/VacationStateItem";

function VacationStateList({ data }) {

    return (
        <>
            <div  className="vacation-state-head">
                <div>이름</div>
                <div>발생 연차</div>
                <div>총 연차</div>
                <div>사용 연차</div>
                <div>잔여 연차</div>
            </div>
            {data.map(vacation => <VacationStateItem key={vacation.employeeCode} vacation={vacation} /> )}
        </>
    )
}

export default VacationStateList;
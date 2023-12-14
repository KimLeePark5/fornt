import {useSelector} from "react-redux";
import employeeInfo from "../../items/AttendItems/EmployeeInfo";

function ProceedRequireItem ({data}) {

    console.log("ProceedRequire 데이터가 있나요? : " , data);

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

// 날짜 차이를 계산
    const timeDiff = endDate - startDate;
// 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;


    return (
        <div>
            {data && (
                <div className="require-proceed-body">
                    <div>{data.employeeName}</div>
                    <div>{data.vacationName}</div>
                    <div>{data.startDate} ~ {data.endDate}</div>
                    <div>{daysDiff} 일</div>
                    <div>{data.reqStatus}</div>
                    <div>{data.reqDate}</div>
                </div>
            )}
        </div>
    );
}

export default ProceedRequireItem;
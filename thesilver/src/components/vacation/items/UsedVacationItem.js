import React from "react";


function UsedVacationItem ({data}) {

    console.log("UsedVacationItem 데이터가 있나요? : ", data)

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    // 날짜 차이를 계산
    const timeDiff = endDate - startDate;
    // 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const isHalfDay = data.vacationName === '오전반차' || data.vacationName === '오후반차';
    const adjustedDaysDiff = isHalfDay ? daysDiff - 0.5 : daysDiff;


    return (
        <div>
            {data && (
                <div className="used-vacation-body">
                    <div>{data.vacationName}</div>
                    <div>{data.startDate} ~ {data.endDate}</div>
                    <div>{adjustedDaysDiff}일</div>
                    <div>{data.reqContent}</div>
                    <div>{data.reqStatus}</div>
                </div>
            )}
        </div>
    );
}

export default UsedVacationItem;
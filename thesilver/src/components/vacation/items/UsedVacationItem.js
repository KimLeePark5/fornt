import React from "react";


function UsedVacationItem ({data}) {

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const today = new Date();


// 날짜 차이를 계산
    const timeDiff = endDate - startDate;
// 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    if (endDate < today) {
    return (

        <div>
            {require && (
                <div className="used-vacation-body">
                    <div>{data.vacationName}</div>
                    <div>{data.startDate} ~ {data.endDate}</div>
                    <div>{daysDiff}일</div>
                    <div>{data.reqContent}</div>
                </div>
            )}
        </div>
    );
    } else {
        // 조건에 맞지 않으면 null을 반환하여 렌더링하지 않음
        return null;
    }
}

export default UsedVacationItem;
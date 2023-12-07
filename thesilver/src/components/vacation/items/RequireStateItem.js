import React, {useEffect, useState} from "react";


function RequireStateItem({data}) {

    console.log("requireState : ", data)

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

// 날짜 차이를 계산
    const timeDiff = endDate - startDate;
// 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    console.log(`날짜 차이: ${daysDiff}일`);

    return (

        <div>
            {require && (
                <div className="require-state-body">
                    <div>{data.vacationName}</div>
                    <div>{data.startDate} ~ {data.endDate}</div>
                    <div>{daysDiff}일</div>
                    <div>{data.reqContent}</div>
                    <div>{data.reqStatus}</div>
                    <div>{data.reqDate}</div>
                </div>
            )}
        </div>
    );
}

export default RequireStateItem;

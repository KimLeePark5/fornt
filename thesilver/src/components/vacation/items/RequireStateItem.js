
function RequireStateItem({data}) {

    console.log("requireStateItem 데이터가 있나요? : ", data)

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const today = new Date();

// 날짜 차이를 계산
    const timeDiff = endDate - startDate;
// 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const isHalfDay = data.vacationName === '오전반차' || data.vacationName === '오후반차';
    const adjustedDaysDiff = isHalfDay ? daysDiff - 0.5 : daysDiff;

    if (data.reqStatus !== "PASS" && endDate >= today) {

    return (
        <div>

            {data && (
                <div className="require-state-body">
                    <div>{data.vacationName}</div>
                    <div>{data.startDate} ~ {data.endDate}</div>
                    <div>{adjustedDaysDiff}일</div>
                    <div>{data.reqContent}</div>
                    <div>{data.reqStatus}</div>
                    <div>{data.reqDate}</div>
                </div>
            )}

        </div>
    );
    } else {
        // 조건에 맞지 않으면 null을 반환하여 렌더링하지 않음
        return null;
    }
}

export default RequireStateItem;

function AttendHistoryModal({month, attendNo, setattendHistoryBtn, attendAdmin: {data: {responseModifiedAttend}}}) {
    console.log("bcde : ", attendNo)

    const attend = responseModifiedAttend.filter(attend => attend.attendNo == attendNo);
    return (
        <>
            <div className="historyModal">
                <div className="historyModal-container">
                    <div className="historyModalContent" style={{marginBottom : "30px"}}>
                        <div className="historyattend">
                            <div>{month}월 수정기록</div>
                            <button onClick={() => {
                                setattendHistoryBtn(false)
                            }}>x
                            </button>
                        </div>
                        <div className="attendhistoryHead">
                            <p>수정자</p>
                            <p>내용</p>
                            <p>수정일</p>
                        </div>
                        {attend.map((history, index) =>
                            <div className='attendHistoryContainer'>
                                <div className='AttendhistoryContent' key={index}>
                                    <div className='Attendhistorybox'
                                         style={{paddingTop: history.afterEntertime && history.afterLeavetime ? '10px' : ''}}>{history.employeeName}</div>
                                    <div>
                                        <div
                                            className='historyTime'>{history.afterEntertime ? '출근시간 : ' + history.beforeEntertime + ' > ' + history.afterEntertime : ''}</div>
                                        <div
                                            className='historyTime'>{history.afterLeavetime ? '퇴근시간 : ' + history.beforeLeavetime + ' > ' + history.afterLeavetime : ''}</div>
                                    </div>
                                    <div className='Attendhistorybox historymodifiedAt'
                                         style={{paddingTop: history.afterEntertime && history.afterLeavetime ? '10px' : ''}}>{history.modifiedAt}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendHistoryModal;
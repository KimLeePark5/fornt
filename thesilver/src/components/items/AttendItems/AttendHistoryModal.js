function AttendHistoryModal({today, month, attendNo, setattendHistoryBtn, attendAdmin: {data: {responseModifiedAttend}}}) {
    console.log("bcde : ", attendNo)

    const attend = responseModifiedAttend.filter(attend => attend.attendNo == attendNo);
    return (
        <>
            <div className="historyModal">
                <div className="historyModal-container">
                    <div className="historyModalContent" style={{marginBottom : "30px"}}>
                        <div className="historyattend">
                            <div>{today}</div>
                            <div className="att-text">수정기록</div>
                            <button className="atttbtn" onClick={() => {
                                setattendHistoryBtn(false)
                            }}>x
                            </button>
                        </div>
                        <div className="attendhistoryHead">
                            <p className="attmodifier">수정자</p>
                            <p className="attContent">내용</p>
                            <p className="attdate">수정일</p>
                        </div>
                        {attend.map((history, index) =>
                            <div className='attendHistoryContainer'>
                                <div className='AttendhistoryContent' key={index}>
                                    <div className='Attendhistorybox'
                                         style={{paddingTop: history.afterEntertime && history.afterLeavetime ? '13px' : ''}}>{history.employeeName}</div>
                                    <div className='attime'>
                                        <div
                                            className='historyTime'>{history.afterEntertime ? '출근시간 : ' + history.beforeEntertime + ' > ' + history.afterEntertime : ''}</div>
                                        <div
                                            className='historyTime'>{history.afterLeavetime ? '퇴근시간 : ' + history.beforeLeavetime + ' > ' + history.afterLeavetime : ''}</div>
                                    </div>
                                    <div className='Attendhistorybox historymodifiedAt'
                                         style={{paddingTop: history.afterEntertime && history.afterLeavetime ? '13px' : ''}}>{history.modifiedAt.replace("T"," ")}</div>
                                </div>
                            </div>
                        )
                        }
                        {attend.length == 0 && <h1 style={{
                            marginTop:'30px'
                        }}>수정 기록이 없습니다</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendHistoryModal;
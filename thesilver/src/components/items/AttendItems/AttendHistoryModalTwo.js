

function AttendHistoryModalTwo({attendNo, month, today, attendAdmin, setattendHistoryBtn, attendAdmin:{data:{responseModifiedAttends}}}) {
    console.log("bcde : ", attendNo)
    console.log(attendAdmin);


    const attend = responseModifiedAttends.filter(attend => attend.attendNo == attendNo);
    return (
        <>
            <div className="historyModal">
                <div className="historyModal-container">
                    <div className="historyModalContent">
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
                                         >{history.employeeName}</div>
                                    <div className='attime'>
                                        <div
                                            className='historyTime'>{history.afterEntertime ? '출근시간 : ' + history.beforeEntertime + ' > ' + history.afterEntertime : ''}</div>
                                        <div
                                            className='historyTime'>{history.afterLeavetime ? '퇴근시간 : ' + history.beforeLeavetime + ' > ' + history.afterLeavetime : ''}</div>
                                        <div
                                            className='historyTime'>{history.afterNote ? '비고 : '+  (history.beforeNote || '기본')  + ' > ' + history.afterNote : ''}
                                        </div>
                                        <div
                                            className='historyTime'>{history.afterType ? '근무유형 : '+  (history.beforeType || '기본')  + ' > ' + history.afterType : ''}
                                        </div>
                                    </div>
                                    <div className='Attendhistorybox historymodifiedAt'
                                        >{history.modifiedAt.replace("T"," ")}</div>
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


export default AttendHistoryModalTwo;
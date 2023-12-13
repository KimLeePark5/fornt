import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


function JournalItem({journal}) { // 상세 조회

    const navigate = useNavigate();
    const [rounds, setRounds] = useState([]);
    const [selectedRound, setSelectedRound] = useState('');

    const dispatch = useDispatch();

    const handleRoundChange = (e) => {
        setSelectedRound(e.target.value);
    };

    const onclickProgramInsert = () => {
        navigate('/journal-regist');
    }

    console.log("JournalItem 저널 : ", journal)

    return (

        <div>

            <div className="journal-head1">❮ 프로그램 운영 일지 ❯</div>


            <table className="description-table" style={{border: "2px solid #000000"}}>
                <tbody>
                <div className="detail-div1">

                    <tr>
                        <th className="journal-table1">프로그램 명</th>
                        <td style={{"padding-left": "40px", "padding-right": "150px"}}>{journal.categoryName} </td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>회 차</th>
                        <td style={{"padding-left": "40px", "padding-right": "150px"}}>{journal.round} 회 차</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>참관 일자</th>
                        <td style={{"padding-left": "40px"}}>{journal.observation}</td>
                    </tr>
                </div>


                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">프로그램 주제</th>
                        <td className="journal-table3-body1" style={{"width": "1000px"}}>{journal.programTopic}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">시작 시간</th>
                        <td className="journal-table3-body1">{journal.startTime}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">종료 시간</th>
                        <td className="journal-table3-body1" style={{"padding-right": "635px"}}>{journal.endTime}</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>담당자</th>
                        <td className="journal-table3-body1"  style={{"width": "300px"}}>{journal.employeeName}</td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">요일</th>
                        <td className="journal-table3-body1" style={{"padding-right": "635px"}}>{journal.day} 요일</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>강사</th>
                        <td className="journal-table3-body1">{journal.teacherName}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-subProgress">
                            프로그램<br/>
                            진행 사항
                        </th>
                        <td className="journal-body-subProgress" style={{"text-align" : "left"}}>{journal.subProgress}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-observe">
                            반응 및<br/>
                            관찰 결과
                        </th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>{journal.observe}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">참가 인원</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>{journal.participantNames}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1" >평가 및 관리</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>{journal.rating}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">비고</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>{journal.note}</td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <div className="journal-imgs" style={{"border-right": "1px solid #000000"}}>첨부 파일</div>

                    <div className="attachmentUrl-div">
                    <div className="attachmentUrls" style={{"width": "1250px", "border-left": "1px solid #000000"}}>
                        <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                        <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                        <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                    </div>
                    </div>
                </div>
                </tbody>
            </table>

            {/*<div className="management-div">*/}
            {/*    <button onClick={onclickProgramInsert}>수정</button>}*/}
            {/*     프로그램 스케줄에 들어가있는 직원이고 프로그램의 수업종료시간이 지나면 일지 작성이 가능하게. */}
            {/*     등록버튼은 항상 보임 */}
            {/*</div>*/}

        </div>

    );
}

export default JournalItem;
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


function JournalItem({journal}) { // 상세 조회

    console.log("JournalItem 저널 : ", journal)

    return (

        <div>

            <div className="journal-head1">❮ 프로그램 운영 일지 ❯</div>


            <table className="description-table" style={{border: "2px solid #000000"}}>
                <tbody>
                <div className="detail-div1">

                    <tr>
                        <th className="journal-table1">프로그램 명</th>
                        <td style={{paddingLeft: "40px", paddingRight: "150px", textAlign : "left"}}>{journal.categoryName} </td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>회 차</th>
                        <td style={{paddingLeft: "40px", paddingRight: "175px"}}>{journal.round} 회 차</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>참관 일자</th>
                        <td style={{paddingLeft: "40px"}}>{journal.observation}</td>
                    </tr>
                </div>


                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">프로그램 주제</th>
                        <td className="journal-table3-body1" style={{width: "1000px"}}>{journal.programTopic}</td>
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
                        <td className="journal-table3-body1" style={{paddingRight: "635px"}}>{journal.endTime}</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>담당자</th>
                        <td className="journal-table3-body1"  style={{width: "300px"}}>{journal.employeeName}</td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">요일</th>
                        <td className="journal-table3-body1" style={{paddingRight: "635px"}}>{journal.day} 요일</td>
                    </tr>
                    <tr>
                        <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>강사</th>
                        <td className="journal-table3-body1">{journal.teacherName}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", alignItems: "center"}}>
                        <th className="journal-subProgress">
                            프로그램<br/>
                            진행 사항
                        </th>
                        <td className="journal-body-subProgress" style={{textAlign : "left"}}>{journal.subProgress}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", alignItems: "center"}}>
                        <th className="journal-observe">
                            반응 및<br/>
                            관찰 결과
                        </th>
                        <td className="journal-table3-body1" style={{width: "1250px"}}>{journal.observe}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr>
                        <th className="journal-table1">참가 인원</th>
                        <td className="journal-table3-body1" style={{width: "1250px"}}>{journal.participantNames}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", alignItems: "center"}}>
                        <th className="journal-table1" >평가 및 관리</th>
                        <td className="journal-table3-body1" style={{width: "1250px"}}>{journal.rating}</td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", alignItems: "center"}}>
                        <th className="journal-table1">비고</th>
                        <td className="journal-table3-body1" style={{width: "1250px"}}>{journal.note}</td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <div className="journal-imgs">첨부 파일</div>

                    <div className="attachmentUrl-div">
                        <div className="attachmentUrls" style={{width: "1250px"}}>
                            <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                            <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                            <img src={journal.attachmentUrls} alt={journal.programTopic}/>
                        </div>
                    </div>
                </div>
                </tbody>
            </table>


        </div>

    );
}

export default JournalItem;
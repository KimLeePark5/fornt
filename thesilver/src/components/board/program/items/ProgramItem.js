function ProgramItem({program}) {


    return (
        <div style={{border: "2px solid #000000", "backgroundColor": "#FFFFFF"}}>

            <div className="program-head1">❮ 프로그램 상세 내용 조회 ❯</div>
            <table className="description-table">
                <tbody>
                <tr>
                    <th className="program-table1" style={{"borderTop": "1px solid #000000"}}>프로그램 명</th>
                    <td className="program-table1-body1">{program.categoryName}</td>
                </tr>
                <tr>
                    <th className="program-table1">시행 시기</th>
                    <td className="program-table1-body1">{program.startDate} ~ {program.endDate} 매주 {program.day}요일</td>
                </tr>
                <tr>
                    <th className="program-table1">회 차</th>
                    <td className="program-table1-body1">{program.round}회 차</td>
                </tr>
                <tr>
                    <th className="program-table1">수업 시간</th>
                    <td className="program-table1-body1">{program.startTime} ~ {program.endTime}</td>
                </tr>
                </tbody>
            </table>

            {/*----------------------------------------*/}

            <div className="program-head2">프로그램 내용</div>
            <div className="program-table2-body2">{program.shortStory}</div>

            <div className="program-head3">담당 강사 프로필</div>

            <main className="detail-main">
                <div className="detail-div0">

                    <div className=" img-div0">

                        <img style={{border: "1px solid #000000"}}
                             //src= '/img/2341199f94884fed9b5fae15959f7034.jpg' /*이미지 걍 박아서 눈가리고 아웅함 ㅋㅋ*/
                             //src= '/img/img.png'
                             src={program.profilePicture} alt={program.teacherName} //원래 이거임..
                        />
                    </div>

                    <div className="description-div0">

                        <table className="description-table0">
                            <tbody>

                            <tr>
                                <th className="program-table3-body3">이름 :</th>
                                <td className="program-table3-body4">{program.teacherName}</td>
                            </tr>
                            <tr>
                                <th className="program-table3-body3">성별 :</th>
                                <td className="program-table3-body4">{program.gender}</td>
                            </tr>
                            <tr>
                                <th className="program-table3-body3">생년월일 :</th>
                                <td className="program-table3-body4">{program.birthDate}</td>
                            </tr>
                            <tr>
                                <th className="program-table3-body3">연락처 :</th>
                                <td className="program-table3-body4">{program.phone}</td>
                            </tr>
                            <tr>
                                <th className="program-table3-body3">주소 :</th>
                                <td className="program-table3-body4">
                                    {program.postNo}<br/><br/>
                                    {program.address}<br/><br/>
                                    {program.detailAddress}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

        </div>
    )
        ;
}

export default ProgramItem;
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callEmployeeAPI} from "../apis/EmployeesAPICalls";

function Employee() {
    const dispatch = useDispatch();
    const {employees} = useSelector(state => state.employeesReducer);

    useEffect(() => {
        dispatch(callEmployeeAPI());
    }, []);

    const employee = employees

    return(
        <>
            <h1>내 정보</h1>
            {employee&&(
                <>
                    <div className="employeesModalGrid">
                        <div className="employeesModalGrid-item">
                            {employee?.employeePicture ? <img style={{backgroundSize:"cover",height:213,width:185}} src={employee?.employeePicture} alt={employee.employeeName}/>
                                : <span> 등록된 사진이 없습니다.</span>}
                        </div>
                        <div className="employeesModalGrid-item">이름</div>
                        <div className="employeesModalGrid-item">{employee.employeeName}</div>
                        <div className="employeesModalGrid-item">이메일</div>
                        <div className="employeesModalGrid-item">{employee.employeeEmail}</div>
                        <div className="employeesModalGrid-item">사번</div>
                        <div className="employeesModalGrid-item">{employee.employeeCode}</div>
                        <div className="employeesModalGrid-item">전화번호</div>
                        <div className="employeesModalGrid-item">{employee.employeePhone}</div>
                        <div className="employeesModalGrid-item">직급</div>
                        <div className="employeesModalGrid-item">{employee.rank.rankName}</div>
                        <div className="employeesModalGrid-item">팀</div>
                        <div className="employeesModalGrid-item">{employee.team.teamName}</div>
                        <div className="employeesModalGrid-item">주소</div>
                        <div className="employeesModalGrid-item">{employee.employeeAddress}</div>
                    </div>

                    <div className="employeesModalGrid-2">
                        <div className="employeesModalGrid-2-item">입사일</div>
                        <div className="employeesModalGrid-2-item">{employee.joinDate}</div>
                        <div className="employeesModalGrid-2-item">성별</div>
                        <div className="employeesModalGrid-2-item">{employee.gender}</div>
                        <div className="employeesModalGrid-2-item">퇴사일</div>
                        <div className="employeesModalGrid-2-item">{employee.leaveDate}</div>
                        <div className="employeesModalGrid-2-item">채용 구분</div>
                        <div className="employeesModalGrid-2-item">{employee.employmentType}</div>
                        <div className="employeesModalGrid-2-item">주민등록 번호</div>
                        <div className="employeesModalGrid-2-item">{employee.registrationNumberFull}</div>
                        <div className="employeesModalGrid-2-item">퇴사 사유</div>
                        <div className="employeesModalGrid-2-item">{employee.leaveReason}</div>
                        <div className="employeesModalGrid-2-item">상태</div>
                        <div className="employeesModalGrid-2-item">{employee.leaveType}</div>
                        <div className="employeesModalGrid-2-item">결혼 여부</div>
                        <div className="employeesModalGrid-2-item">{employee.marriage}</div>
                        <div className="employeesModalGrid-2-item"></div>
                        <div className="employeesModalGrid-2-item"></div>
                        <div className="employeesModalGrid-2-item">장애 여부</div>
                        <div className="employeesModalGrid-2-item">{employee.disability}</div>
                        <div className="employeesModalGrid-2-item">보훈 여부</div>
                        <div className="employeesModalGrid-2-item">{employee.patriots}</div>
                        <div className="employeesModalGrid-2-item"></div>
                        <div className="employeesModalGrid-2-item"></div>
                    </div>

                    <h1 className="employeesModalGrid-3-title" align="left">직급 변경 이력</h1>

                    <div className="employee-history-div">
                        <div className="employee-history-fix-row">
                            <div className="employee-history-fix-row-item">번호</div>
                            <div className="employee-history-fix-row-item">변경 사항</div>
                            <div className="employee-history-fix-row-item">변경 전</div>
                            <div className="employee-history-fix-row-item">변경 후</div>
                            <div className="employee-history-fix-row-item">변경 일자</div>
                            <div className="employee-history-fix-row-item2">비고</div>
                        </div>
                        {(employee.rankHistory).length > 0 ? employee.rankHistory.map( rankHistory =>
                                <div className="employee-history-fix-row2" key={rankHistory.rankNum}>
                                    <div className="employee-history-fix-row2-item">{rankHistory.rankNum}</div>
                                    <div className="employee-history-fix-row2-item">{rankHistory.upDown == 'UP' ? '진급' : '강등'}</div>
                                    <div className="employee-history-fix-row2-item">{rankHistory.afterRank}</div>
                                    <div className="employee-history-fix-row2-item">{rankHistory.beforeRank}</div>
                                    <div className="employee-history-fix-row2-item">{rankHistory.updateDate}</div>
                                    <div className="employee-history-fix-row2-item2">{rankHistory.updateNote}</div>
                                </div>
                            ) :
                            <div className="employee-history-fix-row2">
                                <div className="employee-history-fix-row3">직급 변경 이력이 없습니다.</div>
                            </div>
                        }
                    </div>
                </>
            )}
        </>
    )
}
export default Employee
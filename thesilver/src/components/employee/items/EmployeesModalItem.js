import {useEffect, useRef, useState} from "react";

function EmployeesModalItem({employee}) {

    useEffect(() => {
        return
    }, [employee]);


    return(
        <>
            {employee&&(
                    <>

                        <div className="employeesModalGrid">
                            {employee?.employeePicture ?
                                <div className="employeesModalGrid-item" style={{backgroundImage:`url(${employee?.employeePicture})`,backgroundSize:"cover"}}/>
                                :
                                <div className="employeesModalGrid-item"><span> 등록된 사진이 없습니다.</span></div>
                            }
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
                    </>
            )}
        </>
    )
}
export default EmployeesModalItem;
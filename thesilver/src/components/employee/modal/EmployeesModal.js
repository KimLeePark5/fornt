import {useRef} from "react";
import employees from "../../../pages/Employees";


function EmployeesModal({ employees, setModalOpen }) {
    const modalBackground = useRef();
    // const image = employees.employeePicture
    return(
        <>
        {employees&&(
        <div className="modal" ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                setModalOpen(false);
            }
        }}>
            <div className="modal-content">
                <h1 className="modal-title" align="left">직원정보</h1>
                    <div className="EmployeesModalDiv">
                    <div className="EmployeesModalDivImage">
                        {employees.employeePicture ? <img src={employees.employeePicture} alt={employees.employeeName}/>
                            : <span> 등록된 사진이 없습니다.</span>}
                    </div>
                    <div className="EmployeesModalDivUp-1">
                        <div className="EmployeesModalDivUp-1-DivBox-1"><span>이름</span></div>
                        <div className="EmployeesModalDivUp-1-DivBox-1"><span>사번</span></div>
                        <div className="EmployeesModalDivUp-1-DivBox-1"><span>직급</span></div>
                        <div className="EmployeesModalDivUp-1-DivBox-2"><span>주소</span></div>
                    </div>
                    <div className="EmployeesModalDivUp-2">
                        <div className="EmployeesModalDivUp-2-DivBox-1"><span>{employees.employeeName}</span></div>
                        <div className="EmployeesModalDivUp-2-DivBox-1"><span>{employees.employeeCode}</span></div>
                        <div className="EmployeesModalDivUp-2-DivBox-1"><span>{employees.rank}</span></div>
                        <div className="EmployeesModalDivUp-2-DivBox-2"><span>{employees.employeeAddress}</span></div>
                    </div>
                    <div className="EmployeesModalDivUp-3">
                        <div className="EmployeesModalDivUp-3-DivBox-1"><span>이메일</span></div>
                        <div className="EmployeesModalDivUp-3-DivBox-1"><span>전화번호</span></div>
                        <div className="EmployeesModalDivUp-3-DivBox-1"><span>팀</span></div>
                    </div>
                    <div className="EmployeesModalDivUp-4">
                        <div className="EmployeesModalDivUp-4-DivBox-1"><span>{employees.employeeEmail}</span></div>
                        <div className="EmployeesModalDivUp-4-DivBox-1"><span>{employees.employeePhone}</span></div>
                        <div className="EmployeesModalDivUp-4-DivBox-1"><span>{employees.team}</span></div>
                    </div>
                </div>
                <div className="EmployeesModalDiv-2">
                    <div className="EmployeesModalDiv-2-2">
                        <div className="EmployeesModalDivUp-5">
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>입사일</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>채용구분</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>상태</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-2"><span>장애여부</span></div>
                        </div>
                        <div className="EmployeesModalDivUp-6">
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.joinDate}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.employmentType}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.leaveType}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-3"><span>{employees.disability}</span></div>
                        </div>
                        <div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>성별</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>주민등록번호</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>결혼여부</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-2"><span>보훈여부</span></div>
                        </div>
                        <div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.gender}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.registrationNumberFull}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.marriage}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-3"><span>{employees.patriots}</span></div>
                        </div>
                        <div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>퇴사일</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span>퇴사 사유</span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-1"><span></span></div>
                            <div className="EmployeesModalDivUp-5-DivBox-2"><span></span></div>
                        </div>
                        <div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.leaveDate}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span>{employees.leaveReason}</span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                            <div className="EmployeesModalDivUp-6-DivBox-3"><span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}
export default EmployeesModal;
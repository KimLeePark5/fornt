import {useRef} from "react";

function EmployeesRegistModal({setRegistModalOpen, data}) {
    const modalBackground = useRef();
    // const image = employees.employeePicture
    return(
        <>
                <div className="modal" ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setRegistModalOpen(false);
                    }
                }}>
                    <div className="modal-content">
                        <h1 className="modal-title" align="left">직원정보</h1>
                        <div className="EmployeesModalDiv">
                            <div className="EmployeesModalDivImage">
                                <input type="file" accept=".png, .jpeg"/>
                            </div>
                            <div className="EmployeesModalDivUp-1">
                                <div className="EmployeesModalDivUp-1-DivBox-1"><span>이름</span></div>
                                <div className="EmployeesModalDivUp-1-DivBox-1"><span>사번</span></div>
                                <div className="EmployeesModalDivUp-1-DivBox-1"><span>직급</span></div>
                                <div className="EmployeesModalDivUp-1-DivBox-2"><span>주소</span></div>
                            </div>
                            <div className="EmployeesModalDivUp-2">
                                <div className="EmployeesModalDivUp-2-DivBox-1"><input type="text" placeholder="이름을 입력하세요."/></div>
                                <div className="EmployeesModalDivUp-2-DivBox-1"><span>사번은 자동 생성 됩니다.</span></div>
                                <div className="EmployeesModalDivUp-2-DivBox-1">
                                    <select className="employees-list-select">
                                    <option>사원</option>
                                    <option>팀장</option></select>
                                </div>
                                <div className="EmployeesModalDivUp-2-DivBox-2"><input type="text" placeholder="주소를 입력하세요."/></div>
                            </div>
                            <div className="EmployeesModalDivUp-3">
                                <div className="EmployeesModalDivUp-3-DivBox-1"><span>이메일</span></div>
                                <div className="EmployeesModalDivUp-3-DivBox-1"><span>전화번호</span></div>
                                <div className="EmployeesModalDivUp-3-DivBox-1"><span>팀</span></div>
                            </div>
                            <div className="EmployeesModalDivUp-4">
                                <div className="EmployeesModalDivUp-4-DivBox-1"><input type="text" placeholder="이메일을 입력하세요."/></div>
                                <div className="EmployeesModalDivUp-4-DivBox-1"><input type="text" placeholder="전화번호를 입력하세요."/></div>
                                <div className="EmployeesModalDivUp-4-DivBox-1">
                                    <select className="employees-list-select">
                                        <option>미지정</option>
                                        <option>1팀</option>
                                        <option>2팀</option>
                                        <option>3팀</option></select>
                                </div>
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
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><input type="date"/></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-3"><span></span></div>
                                </div>
                                <div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span>성별</span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span>주민등록번호</span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span>결혼여부</span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-2"><span>보훈여부</span></div>
                                </div>
                                <div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-3"><span></span></div>
                                </div>
                                <div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span>퇴사일</span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span>퇴사 사유</span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-5-DivBox-2"><span></span></div>
                                </div>
                                <div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-1"><span></span></div>
                                    <div className="EmployeesModalDivUp-6-DivBox-3"><span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default EmployeesRegistModal
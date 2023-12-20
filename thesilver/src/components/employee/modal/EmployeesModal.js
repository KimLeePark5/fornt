import {Fragment, useRef, useState} from "react";
import EmployeesModalItem from "../items/EmployeesModalItem";
import EmployeesModifyModalItem from "../items/EmployeesModifyModalItem";
import {callEmployeePwdReset, callEmployeesListRemoveAPI} from "../../../apis/EmployeesAPICalls";
import {useDispatch} from "react-redux";

function employeesModal({setModalOpen, employeeCode, data}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const modalBackground = useRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modify, setModify] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    const modifyMode = () => {
        setModify(true)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form, setForm]=useState(null)

    const employee = data.filter(employees=>employees.employeeCode==employeeCode)[0]


    const onClickModalEmployeeDeleteHandler = () => {
        if(employeeCode) {
            setModalOpen(false)
            dispatch(callEmployeesListRemoveAPI({employeeCode}));
            // alert("삭제 완료!")
        } else {
            alert("선택해주세요.")
        }
    }
    const resetPwd = () => {
        const formData = new FormData();
        setForm(employee.account.attemptCount=0)
        formData.append("employeesAccountUpdateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        dispatch(callEmployeePwdReset({employeeCode: employeeCode}))
        alert("로그인 잠금 해제 완료")
    }

    return(
        <div className="modal" ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current&&modify===false) {
                setModalOpen(false);
            } else if (e.target === modalBackground.current&&modify===true){
                // eslint-disable-next-line no-restricted-globals
                const modifyModalConfirm = confirm("정말 나가시겠습니까?")
                if(modifyModalConfirm){
                    setModify(false);
                } else {
                    return;
                }
            }
        }}>
            <div className="modal-content2">
                {!modify ?
                    <h1 className="modal-title" align="left" style={{fontSize:32, display:"inline"}}>직원정보</h1>
                    :
                    <h1 className="modal-title" align="left" style={{fontSize:32, display:"inline"}}>직원정보 수정</h1>
                }

                <button className="employees-list-delete-btn" onClick={onClickModalEmployeeDeleteHandler} style={{display:"inline", float:"right"}}>삭제</button>
                {!modify &&
                <button onClick={modifyMode} className="employees-list-update-btn" style={{display:"inline", float:"right"}}>수정</button>
                }
                {employee.account&&employee.account.attemptCount===5&&
                    <button className="employees-list-delete-btn" onClick={resetPwd} style={{display:"inline", float:"right", width:170}}>비밀번호 초기화</button>
                }
                {!modify ?
                    <EmployeesModalItem employee={employee}/>
                    :
                    <EmployeesModifyModalItem employees={employee} setModify={setModify}/>
                }

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

            </div>
        </div>
    )
}
export default employeesModal;
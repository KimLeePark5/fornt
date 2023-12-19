import {useDispatch} from "react-redux";
import React, {useRef, useState} from "react";
import {callModifyEmployeesAPI} from "../../../apis/EmployeesAPICalls";

function EmployeeModifyItem({employees, setEmployeeModify}) {

    const dispatch = useDispatch();
    const empFile = useRef();
    const [img, setImg] = useState(employees.employeePicture)
    const [form, setForm]=useState({
        employeeName : employees.employeeName,
        employeeEmail : employees.employeeEmail,
        employeePhone : employees.employeePhone,
        rankCode : employees.rank.rankCode,
        teamCode : employees.team.teamCode,
        employeeAddress : employees.employeeAddress,
        joinDate : employees.joinDate.replaceAll(".","-"),
        gender : employees.gender,
        employmentType : employees.employmentType,
        registrationNumber : employees.registrationNumber,
        workingStatus : employees.workingStatus,
        marriage : employees.marriage,
        disability : employees.disability,
        patriots : employees.patriots,
        leaveType : employees.leaveType,
        employeePicture : employees.employeePicture
    });


    const formchangeHandler = (e)=>{
        setForm(
            {...form,
                [e.target.name]:e.target.value
            })
    }
    // function imageChange(e){
    //     const fileReader = new FileReader();
    //     fileReader.onload = e => {
    //         const { result } = e.target;
    //         if(result) setImg(result)
    //     }
    //     if(empFile.current.files[0])
    //         fileReader.readAsDataURL(empFile.current.files[0]);
    // }
    // const empFileupload = ()=>{
    //     empFile.current.click()
    // }
    const onClickEmployeeModify = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();

        // if(img===''){
            formData.append("employeesUpdateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        // } else {
        //     formData.append("employeePicture", empFile.current.files[0]);
        //     formData.append("employeesUpdateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        // }
        dispatch(callModifyEmployeesAPI({employeesUpdateRequest : formData, employeeCode : employees.employeeCode }));
        setEmployeeModify(false)

    }



    const deleteImge = () => {
        empFile.current.value=''
        setImg('')
        setForm({...form,
            employeePicture:null})
    }


    const modifyOff =() => {
        // eslint-disable-next-line no-restricted-globals
        const modifyOffConfirm = confirm("정말 나가시겠습니까?")
        if(modifyOffConfirm){
            setEmployeeModify(false)
        }
        else { return }

    }

    return(
        <>
            <button className="employees-list-update-btn" onClick={modifyOff} style={{display:"inline", float:"right", marginRight:70, marginTop:-15}}>수정 취소</button>
            <button className="employees-list-update-btn" onClick={ onClickEmployeeModify } style={{display:"inline", float:"right", marginTop:-15}}>수정 완료</button>
            <div className="employeesModalGrid">
                {employees?.employeePicture ?
                    <div className="employeesModalGrid-item" style={{backgroundImage:`url(${employees?.employeePicture})`,backgroundSize:"cover"}}/>
                    :
                    <div className="employeesModalGrid-item" style={{backgroundColor:"#E5E5E5"}}><span> 등록된 사진이 없습니다.</span></div>
                }
                <div className="employeesModalGrid-item">이름</div>
                <div className="employeesModalGrid-item"><input name='employeeName' onChange={formchangeHandler} type="text" defaultValue={employees.employeeName}/></div>
                <div className="employeesModalGrid-item">이메일</div>
                <div className="employeesModalGrid-item"><input name='employeeEmail' onChange={formchangeHandler} type="text" defaultValue={employees.employeeEmail}/></div>
                <div className="employeesModalGrid-item">사번</div>
                <div className="employeesModalGrid-item" style={{backgroundColor:"#E5E5E5"}}>{employees.account?.employeeNumber}</div>
                <div className="employeesModalGrid-item">전화번호</div>
                <div className="employeesModalGrid-item"><input type="text" name='employeePhone' onChange={formchangeHandler} defaultValue={employees.employeePhone}/></div>
                <div className="employeesModalGrid-item">직급</div>
                <div className="employeesModalGrid-item" style={{backgroundColor:"#E5E5E5"}}>{employees.rank.rankName}</div>
                <div className="employeesModalGrid-item">팀</div>
                <div className="employeesModalGrid-item" style={{backgroundColor:"#E5E5E5"}}>{employees.team.teamName}</div>
                <div className="employeesModalGrid-item">주소</div>
                <div className="employeesModalGrid-item"><input name='employeeAddress' onChange={formchangeHandler} type="text" defaultValue={employees.employeeAddress}/></div>
            </div>

            <div className="employeesModalGrid-2">
                <div className="employeesModalGrid-2-item">입사일</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.joinDate}</div>
                <div className="employeesModalGrid-2-item">성별</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.gender}</div>
                <div className="employeesModalGrid-2-item">퇴사일</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.leaveDate}</div>
                <div className="employeesModalGrid-2-item">채용 구분</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.employmentType}</div>
                <div className="employeesModalGrid-2-item">주민등록 번호</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.registrationNumber}</div>
                <div className="employeesModalGrid-2-item">퇴사 사유</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.leaveReason}</div>
                <div className="employeesModalGrid-2-item">상태</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.workingStatus}</div>
                <div className="employeesModalGrid-2-item">결혼 여부</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.marriage}</div>
                <div className="employeesModalGrid-2-item"></div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}></div>
                <div className="employeesModalGrid-2-item">장애 여부</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.disability}</div>
                <div className="employeesModalGrid-2-item">보훈 여부</div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}>{employees.patriots}</div>
                <div className="employeesModalGrid-2-item" ></div>
                <div className="employeesModalGrid-2-item" style={{backgroundColor:"#E5E5E5"}}></div>
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
                {(employees.rankHistory).length > 0 ? employees.rankHistory.map( rankHistory =>
                        <div className="employee-history-fix-row2" key={rankHistory.rankNum} style={{backgroundColor:"#FFFFFF"}}>
                            <div className="employee-history-fix-row2-item" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.rankNum}</div>
                            <div className="employee-history-fix-row2-item" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.upDown == 'UP' ? '진급' : '강등'}</div>
                            <div className="employee-history-fix-row2-item" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.afterRank}</div>
                            <div className="employee-history-fix-row2-item" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.beforeRank}</div>
                            <div className="employee-history-fix-row2-item" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.updateDate}</div>
                            <div className="employee-history-fix-row2-item2" style={{backgroundColor:"#E5E5E5"}}>{rankHistory.updateNote}</div>
                        </div>
                    ) :
                    <div className="employee-history-fix-row2">
                        <div className="employee-history-fix-row3" style={{backgroundColor:"#E5E5E5"}}>직급 변경 이력이 없습니다.</div>
                    </div>
                }
            </div>
        </>
    )
}
export default EmployeeModifyItem;
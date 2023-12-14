import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeesListAPI, callModifyEmployeesAPI} from "../../../apis/EmployeesAPICalls";

function EmployeesModifyModalItem({employees, setModify}) {
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
    function imageChange(e){
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const { result } = e.target;
            if(result) setImg(result)
        }
        if(empFile.current.files[0])
            fileReader.readAsDataURL(empFile.current.files[0]);
    }
    const empFileupload = ()=>{
        empFile.current.click()
    }
    const onClickEmployeeModify = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();

        if(img===''){
            formData.append("employeesUpdateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        } else {
            formData.append("employeePicture", empFile.current.files[0]);
            formData.append("employeesUpdateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        }
        dispatch(callModifyEmployeesAPI({employeesUpdateRequest : formData, employeeCode : employees.employeeCode }));
        setModify(false)

    }



    const deleteImge = () => {
        empFile.current.value=""
        setImg("")
    }


    const modifyOff =() => {
        // eslint-disable-next-line no-restricted-globals
        const modifyOffConfirm = confirm("정말 나가시겠습니까?")
               if(modifyOffConfirm){
                   setModify(false)
               }
               else { return }

    }

    return(
        <>
            {employees&&
                <>
                    <button className="employees-list-update-btn" onClick={modifyOff} style={{display:"inline", float:"right"}}>수정 취소</button>
                    <button className="employees-list-update-btn" onClick={ onClickEmployeeModify } style={{display:"inline", float:"right"}}>수정 완료</button>
                        <div className="employeesModalGrid">
                            <div className="employeesModalGrid-item" style={{position:'relative'}}>
                                {img &&
                                    <>
                                        <img src={img} alt={employees?.employeeName} style={{overflow:'hidden',height:213,width:185}}/>
                                        <button className="employeesImgDelete-btn" onClick={deleteImge}> × </button>
                                    </>
                                }
                                <div className="employeesModalGrid-item-div">
                                    {!img && <div style={{backgroundImage: img }} className="employeesModalGrid-item-fileForm" onClick={empFileupload}>
                                        +
                                    </div>
                                    }
                                    {!img &&
                                        <label htmlFor="file" style={{margin:10}}>사진첨부</label>
                                    }
                                    <input name="employeePicture" ref={empFile} type="file" accept='image/jpg,image/png,image/jpeg' className="employeesModalGrid-item-hidden" onChange={imageChange}/>
                                </div>
                            </div>
                            <div className="employeesModalGrid-item">이름</div>
                            <div className="employeesModalGrid-item"><input name='employeeName' onChange={formchangeHandler} type="text" defaultValue={employees.employeeName}/></div>
                            <div className="employeesModalGrid-item">이메일</div>
                            <div className="employeesModalGrid-item"><input name='employeeEmail' onChange={formchangeHandler} type="text" defaultValue={employees.employeeEmail}/></div>
                            <div className="employeesModalGrid-item">사번</div>
                            <div className="employeesModalGrid-item"><span>사번은 자동 생성 됩니다.</span></div>
                            <div className="employeesModalGrid-item">전화번호</div>
                            <div className="employeesModalGrid-item"><input type="text" name='employeePhone' onChange={formchangeHandler} defaultValue={employees.employeePhone}/></div>
                            <div className="employeesModalGrid-item">직급</div>
                            <div className="employeesModalGrid-item">
                                <select className="employeesModal-list-select-2" name='rankCode' onChange={formchangeHandler} defaultValue={employees.rank.rankCode}>
                                    <option value='3'>직원</option>
                                    <option value='2'>팀장</option></select>
                            </div>
                            <div className="employeesModalGrid-item">팀</div>
                            <div className="employeesModalGrid-item">
                                <select className="employeesModal-list-select-2" name='teamCode' onChange={formchangeHandler}>
                                    <option value='99'>미지정</option>
                                    <option value='1'>1팀</option>
                                    <option value='2'>2팀</option>
                                    <option value='3'>3팀</option></select>
                            </div>
                            <div className="employeesModalGrid-item">주소</div>
                            <div className="employeesModalGrid-item"><input name='employeeAddress' onChange={formchangeHandler} type="text" defaultValue={employees.employeeAddress}/></div>
                        </div>

                        <div className="employeesModalGrid-2">
                            <div className="employeesModalGrid-2-item">입사일</div>
                            <div className="employeesModalGrid-2-item"><input name='joinDate' onChange={formchangeHandler} type="date" defaultValue={employees.joinDate.replaceAll(".","-")}/></div>
                            <div className="employeesModalGrid-2-item">성별</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='gender' onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.gender}>
                                    <option value='남'>남성</option>
                                    <option value='여'>여성</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">퇴사일</div>
                            <div className="employeesModalGrid-2-item"><input name='leaveDate' type="date" onChange={formchangeHandler}/></div>
                            <div className="employeesModalGrid-2-item">채용 구분</div>
                            <div className="employeesModalGrid-2-item">
                                <select name="employmentType" onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.employmentType}>
                                    <option value='신입'>신입</option>
                                    <option value='경력'>경력</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">주민등록 번호</div>
                            <div className="employeesModalGrid-2-item"><input name='registrationNumber' onChange={formchangeHandler} type="text" defaultValue={employees.registrationNumber}/></div>
                            <div className="employeesModalGrid-2-item">퇴사 사유</div>
                            <div className="employeesModalGrid-2-item"><input name='leaveReason;' type="text" placeholder="퇴사 사유를 입력하세요." onChange={formchangeHandler}/></div>
                            <div className="employeesModalGrid-2-item">상태</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='workingStatus' onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.workingStatus}>
                                    <option value='근무'>근무</option>
                                    <option value='휴직'>휴직</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">결혼 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='marriage' onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.marriage}>
                                    <option value='비혼'>비혼</option>
                                    <option value='결혼'>결혼</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item">장애 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='disability' onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.disability}>
                                    <option value='비장애'>비장애</option>
                                    <option value='장애'>장애</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">보훈 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='patriots' onChange={formchangeHandler} className="employeesModal-list-select-2" defaultValue={employees.patriots}>
                                    <option  value='비보훈'>비보훈</option>
                                    <option  value='보훈'>보훈</option></select></div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item"></div>
                        </div>
                        {/*<div className="employeesModal-btn">*/}
                        {/*    <button className="employees-list-update-btn" onClick={ onClickEmployeeModify }>수정하기</button>*/}
                        {/*    <button className="employees-list-update-btn" onClick={e => {*/}
                        {/*        // eslint-disable-next-line no-restricted-globals*/}
                        {/*        const employeesRegistModalConfirm = confirm("정말 나가시겠습니까?")*/}
                        {/*        if(employeesRegistModalConfirm){setModify(false)}*/}
                        {/*        else { return }*/}
                        {/*    }*/}
                        {/*    }>취소</button>*/}
                        {/*</div>*/}
                </>
            }
        </>
    )
}
export default EmployeesModifyModalItem;
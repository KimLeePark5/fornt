import React, {useEffect, useRef, useState} from "react";
import {callRegistEmployeesAPI} from "../../../apis/EmployeesAPICalls";
import {useDispatch} from "react-redux";
import {postSuccess} from "../../../modules/EmployeesModule";
import employees from "../../../pages/Employees";




function EmployeesRegistModal({setRegistModalOpen}) {
    const dispatch = useDispatch();
    const modalBackground = useRef();
    // const image = employees.employeePicture
    const empFile = useRef();
    const [img, setImg] = useState('')
    const [form, setForm]=useState({
            "rankCode":"3", "teamCode":"99", "gender":"남", "employmentType":"신입", "workingStatus":"근무",
            "marriage":"미혼", "disability":"비장애", "patriots":"비보훈" , "leaveType":"근무"
    });

    useEffect(() => {
    }, [postSuccess]);

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
            if(result) { setImg(result) }

        }
        if(empFile.current.files[0])
            fileReader.readAsDataURL(empFile.current.files[0]);
    }

    const deleteImge = () => {
        empFile.current.value=""
        setImg("")
    }

    const empFileupload = ()=>{
        empFile.current.click()
    }
    const onClickEmployeeInsert = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();

        if(img===''){
            formData.append("employeesCreateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        } else {
            formData.append("employeePicture", empFile.current.files[0]);
            formData.append("employeesCreateRequest", new Blob([JSON.stringify(form)], { type : 'application/json' }));
        }
        dispatch(callRegistEmployeesAPI({employeesCreateRequest : formData }));
        setRegistModalOpen(false)
    }


    return (
        <>
                <div className="modal" ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        // eslint-disable-next-line no-restricted-globals
                        const employeesRegistModalConfirm = confirm("정말 나가시겠습니까?")
                        if(employeesRegistModalConfirm){
                            setRegistModalOpen(false);
                        }
                        else { return }
                    }
                }}>
                    <div className="modal-content">
                        <h1 className="modal-title" align="left">직원정보</h1>
                        <div className="employeesModalGrid">
                            <div className="employeesModalGrid-item" style={{position:'relative'}}>
                                        {img &&
                                        <>
                                            <img src={img} alt={employees.employeeName} style={{overflow:'hidden',height:213,width:185}}/>
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
                            <div className="employeesModalGrid-item"><input name='employeeName' onChange={formchangeHandler} type="text" placeholder="이름을 입력하세요."/></div>
                            <div className="employeesModalGrid-item">이메일</div>
                            <div className="employeesModalGrid-item"><input name='employeeEmail' onChange={formchangeHandler} type="text" placeholder="이메일을 입력하세요."/></div>
                            <div className="employeesModalGrid-item">사번</div>
                            <div className="employeesModalGrid-item"><span>사번은 자동 생성 됩니다.</span></div>
                            <div className="employeesModalGrid-item">전화번호</div>
                            <div className="employeesModalGrid-item"><input type="text" name='employeePhone' onChange={formchangeHandler} placeholder="전화번호를 입력하세요."/></div>
                            <div className="employeesModalGrid-item">직급</div>
                            <div className="employeesModalGrid-item">
                                <select className="employeesModal-list-select-2" name='rankCode' onChange={formchangeHandler}>
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
                            <div className="employeesModalGrid-item"><input name='employeeAddress' onChange={formchangeHandler} type="text" placeholder="주소를 입력하세요."/></div>
                        </div>

                        <div className="employeesModalGrid-2">
                            <div className="employeesModalGrid-2-item">입사일</div>
                            <div className="employeesModalGrid-2-item"><input name='joinDate' onChange={formchangeHandler} type="date"/></div>
                            <div className="employeesModalGrid-2-item">성별</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='gender' onChange={formchangeHandler} className="employeesModal-list-select-2">
                                    <option value='남'>남성</option>
                                    <option value='여'>여성</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">퇴사일</div>
                            <div className="employeesModalGrid-2-item">{/*<input name='' type="date"/>*/}</div>
                            <div className="employeesModalGrid-2-item">채용 구분</div>
                            <div className="employeesModalGrid-2-item">
                                <select name="employmentType" onChange={formchangeHandler} className="employeesModal-list-select-2">
                                    <option value='신입'>신입</option>
                                    <option value='경력'>경력</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">주민등록 번호</div>
                            <div className="employeesModalGrid-2-item"><input name='registrationNumber' onChange={formchangeHandler} type="text" placeholder="주민등록번호를 입력하세요."/></div>
                            <div className="employeesModalGrid-2-item">퇴사 사유</div>
                            <div className="employeesModalGrid-2-item">{/*<input name='' type="text" placeholder="퇴사 사유를 입력하세요."/>*/}</div>
                            <div className="employeesModalGrid-2-item">상태</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='workingStatus' onChange={formchangeHandler} className="employeesModal-list-select-2">
                                    <option value='근무'>근무</option>
                                    <option value='휴직'>휴직</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">결혼 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='marriage' onChange={formchangeHandler} className="employeesModal-list-select-2">
                                    <option value='비혼'>비혼</option>
                                    <option value='결혼'>결혼</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item">장애 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='disability' onChange={formchangeHandler} className="employeesModal-list-select-2">
                                    <option value='비장애'>비장애</option>
                                    <option value='장애'>장애</option></select>
                            </div>
                            <div className="employeesModalGrid-2-item">보훈 여부</div>
                            <div className="employeesModalGrid-2-item">
                                <select name='patriots' onChange={formchangeHandler} className="employeesModal-list-select-2">
                                <option  value='비보훈'>비보훈</option>
                                <option  value='보훈'>보훈</option></select></div>
                            <div className="employeesModalGrid-2-item"></div>
                            <div className="employeesModalGrid-2-item"></div>
                        </div>
                        <div className="employeesModal-btn">
                        <button className="employees-list-update-btn" onClick={ onClickEmployeeInsert }>등록하기</button>
                        <button className="employees-list-update-btn" onClick={e => {

                            // eslint-disable-next-line no-restricted-globals
                            const employeesRegistModalConfirm = confirm("정말 나가시겠습니까?")
                            if(employeesRegistModalConfirm){setRegistModalOpen(false)}
                            else { return }
                        }
                        }>취소</button>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default EmployeesRegistModal
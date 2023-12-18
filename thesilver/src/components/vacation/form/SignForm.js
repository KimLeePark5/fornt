import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import {
    callCancelRequireAPI, callReturnRequireAPI,
    callSignRequireAPI,

} from "../../../apis/VacationAPICalls";
import {useDispatch} from "react-redux";
import async from "async";

function SignForm({isOpen, closeModal, data}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});


    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    // 결재 핸들러
    const onClickSignHandler = async () => {
        const reqNo = data.reqNo

        if (data?.reqStatus === '상신중') {
            // 결재 버튼을 누른 경우
            await dispatch(callSignRequireAPI({reqNo}));
        }
        closeModal(); // 모달 닫기
        window.location.reload();
    };

    // 반려 핸들러
    const onclickReturnOrExitHandler = async () => {
        const reqNo = data.reqNo

        if (data?.reqStatus === '상신중') {
            await dispatch(callReturnRequireAPI({reqNo,form}))
        } else if (data?.reqStatus !== '상신중') {

        }
        closeModal(); // 모달 닫기
        window.location.reload();
    }

    // 결재 취소 핸들러
    const onClickCancelHandler = async () => {
        const reqNo = data.reqNo

        if (data?.reqStatus === '결재완료') {
            await dispatch(callCancelRequireAPI({reqNo}))
        }
        closeModal(); // 모달 닫기
        window.location.reload();
    }

    // 닫기 핸들러
    const onClickExitHandler = async () => {
        closeModal();
        window.location.reload();
    }


    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // 날짜 차이를 계산
    const timeDiff = endDate - startDate;
    // 일(day)로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;


    if (!isOpen || !data) {
        return null;
    }
    return (
        <div style={{display: isOpen ? "block" : "none"}}>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgb(0,0,0,0.3)"
                }}
            ></div>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 750,
                    height: 850,
                    overflowY: "auto",
                    backgroundColor: "white",
                    border: "#1A1A1C 1px solid",
                    borderRadius: "10px"
                }}
            >
                <>
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "30px",
                            fontWeight: "700",
                            margin: "25px 0 20px 0"
                        }}
                    >
                        {data.reqStatus === "상신중"
                            ? "연차 결재"
                            : data.reqStatus === "결재완료"
                                ? "결재 연차"
                                : data.reqStatus === "반려"
                                    ? "반려 연차"
                                    : ""}
                    </h1>
                    <div className="vacation-require-form">
                        <div className="vacation-require-form1">
                            <div className="form1-1">성명</div>
                            <div name="name" className="form1-2">{data?.employeeName}</div>
                            <div className="form1-1">직급</div>
                            <div name="rank" className="form1-3">{data?.rank}</div>
                        </div>
                        <div className="vacation-require-form2">
                            <div className="form2-1">구분</div>
                            <div className="form2-2" name="vacationTypeCode">{data?.vacationName}</div>
                        </div>
                        <div className="vacation-sign-form3">
                            <div name="srattAndEndDate" className="form3-1">기간</div>
                            <div className="signForm3-1">
                                <div name="startDate">{data.startDate}</div>
                                <span>&nbsp; ~ &nbsp;</span>
                                <div name="endDate">{data.endDate}</div>
                                <span name="countDate" style={{paddingLeft: "50px"}}>{daysDiff} 일</span>
                            </div>
                        </div>
                        <div className="vacation-require-form4">
                            <div className="form4-1">내용</div>
                            <div style={{margin: "0", textAlign: "left"}}
                                 name="reqContent"
                                 className="form4-2"
                            >{data?.reqContent}
                            </div>
                        </div>
                        <div className="vacation-require-form5">
                            <div style={{fontSize: "15px", paddingLeft: "30px", paddingTop: "20px", height: "150px"}}>
                                <br/>
                                <br/>
                                1.연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여 연차에 한하여 사용함을 원칙으로 한다.<br/>
                                단, 최초 입사시에는 근로 기준법에 따라 발생 예정 된 연차를 차용하여 월 1회 사용할 수 있다.<br/><br/>
                                2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본 ,청첩장 등 제출 한다.<br/><br/>
                                3. 공가(예비군/민방위)는 사전에 통지서를, 사후에는 참석증을 반드시 제출 한다.
                                <br/>
                                <br/>
                            </div>
                            <div name="today" style={{
                                fontSize: "15px",
                                textAlign: "center",
                                marginTop: "25px"
                            }}>{new Date(data.reqDate).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</div>
                            <div name="RequirePerson" style={{
                                fontSize: "15px",
                                textAlign: "right",
                                padding: "40px 60px 30px 0",
                                fontWeight: "500"
                            }}>서명 : {data.employeeName}</div>
                        </div>
                        <div className="vacation-require-form6">
                            <div className="form6-1">
                                {data.reqStatus === '상신중' || data.reqStatus === '반려' ? '반려 사유' : data.reqStatus === '결재완료' ? '취소 사유' : '사유'}</div>
                            <div className="form6-2">
                                {data.reqStatus === '반려' && <div>{data.returnCause}</div>}
                                {data.reqStatus !== '반려' &&
                                    <textarea
                                        name="cause"
                                        className="form6-3"
                                        onChange={onChangeHandler}
                                    ></textarea>
                                }
                            </div>
                        </div>

                    </div>
                </>
                <div className="require-form-btn">

                    {data.reqStatus === "상신중" && (
                        <button onClick={onClickExitHandler}
                                style={{marginRight: "30px"}}>닫기</button>
                    )}
                    <button
                        onClick={onclickReturnOrExitHandler}
                        style={{marginRight: "30px"}}
                    >
                        {data.reqStatus === '상신중' ? '반려' : '닫기'}
                    </button>
                    {data.reqStatus === "상신중" && (
                        <button onClick={onClickSignHandler}>결재</button>
                    )}

                    {data.reqStatus === "결재완료" && (
                        <button onClick={onClickCancelHandler}>결재 취소</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignForm;
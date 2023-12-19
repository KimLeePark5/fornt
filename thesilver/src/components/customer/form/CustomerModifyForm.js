import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callCustomerModifyAPI, callCustomerRegistAPI} from "../../../apis/CustomerAPICalls";
import customers from "../../../pages/Customers";

function CustomerModifyForm({customer, onClickCloseHandler, onSuccessCloseHandler}) {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState('');
    const [form, setForm] = useState({});

    // modify 모드
    const [modifyMode, setModifyMode] = useState(false);

    const phone = customer?.phone.split('-');
    const guardianPhone = customer?.guardianPhone.split('-');

    const inputStyle = !modifyMode ? {
        outline: 'none',
        cursor: 'auto',
        paddingLeft: '5px',
        borderRadius: '2px',
        border: 'none',
        backgroundColor: '#f8f8f8',
        color: 'black'
    } : null;

    const onClickModifyModeHandler = () => {
        setModifyMode(true)
    }

    const setFormValues = () => {
        const formattedDate = customer.birthDate.replace(/-/g, '').substring(2, 8);

        setForm({
            birthDate: formattedDate,
            detailAddress: customer.detailAddress,
            gender: customer.gender,
            guardianName: customer.guardianName,
            guardianPhone1: guardianPhone[0],
            guardianPhone2: guardianPhone[1],
            guardianPhone3: guardianPhone[2],
            guardianRelationship: customer.guardianRelationship,
            memo: customer.memo,
            name: customer.name,
            phone1: phone[0],
            phone2: phone[1],
            phone3: phone[2],
            postalCode: customer.postalCode,
            primaryAddress: customer.primaryAddress,
            customerStatus: customer.status
        });
    };

    const [validForm, setValidForm] = useState({
        name: "",
        birthDate: "",
        phone3: "",
        primaryAddress: ""
    });

    useEffect(() => {
        customer && (setFormValues());
        console.log("셋폼", form)
    }, [customer]);


    const onClickModifyCancle = () => {
        setFormValues();
        setModifyMode(false)
    }


    // modify 모드

    useEffect(() => {
        // 페이지가 로드될 때 한 번 실행되는 부분
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setCurrentDate(formattedDate);
    }, []); // 빈 배열을 전달하여 처음 한 번만 실행


    ///////////////////// 카카오 지도 api ////////////////////
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [extraAddress, setExtraAddress] = useState("");


    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Daum 우편번호 서비스 스크립트 로드 후 실행되는 로직
            // 여기에서 sample6_execDaumPostcode 함수 등을 호출할 수 있음
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

    const handleExecDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                // 우편번호 서비스 결과 처리 로직
                console.log(data);

                // 각 주소의 노출 규칙에 따라 주소를 조합
                // (상태 업데이트로 뷰를 다시 렌더링하는 방식으로 변경)
                const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                const extraAddr =
                    data.userSelectedType === 'R'
                        ? data.bname !== '' && /[동|로|가]$/g.test(data.bname)
                            ? `(${data.bname})`
                            : ''
                        : '';

                // 상태 업데이트
                setPostcode(data.zonecode);
                setAddress(addr);
                setExtraAddress(extraAddr);
            },
        }).open();
    };
    ///////////////////// 카카오 지도 api ////////////////////

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log("현재 폼", form)
    }

    const onClickModifyHandler = () => {

        if (validation(form)) {
            dispatch(callCustomerModifyAPI({modifyForm: form, customerCode: customer.customerCode}))
        } else {
            alert("수정 정보를 다시 확인해주세요.")
        }


    }

    useEffect(() => {
        form && setForm(
            {
                ...form,
                postalCode: postcode,
                primaryAddress: address
            }
        )
    }, [postcode, address]);

    // 고객 등록 유효성 검사
    const validation = (form) => {
        let validResult = true
        const validationBlank = (key) => {
            if (form[key].trim() === "") {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: " 공백일 수 없습니다. "
                    })
                )
                validResult = false
            } else {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: ""
                    })
                )
            }
        }

        const validationBirthDate = (key) => {
            if(!/^\d{6}$/.test(form[key])) {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: " 숫자 6자리여야 합니다. "
                    })
                )
                validResult = false
            } else {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: ""
                    })
                )
            }
        }

        const validationPhone = (key) => {
            if(!/^\d{4}$/.test(form[key])) {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: " 숫자 4자리여야 합니다. "
                    })
                )
                validResult = false
            } else {
                setValidForm(prevState => ({
                        ...prevState,
                        [key]: ""
                    })
                )
            }
        }

        for (const key in form) {
            console.log(key)

            switch (key) {
                case 'name' :
                    validationBlank(key)
                    break;
                case 'birthDate' :
                    validationBirthDate(key);
                    break;
                case 'phone3' :
                    validationBlank(key)
                    validationPhone(key)
                    break;
                case 'primaryAddress' :
                    validationBlank(key)
                    break;
            }
        }
        return validResult;
    }

    return (
        <>
            {customer && (
                <div className="customers-modify-box">
                    <div className="customers-regist-content customers-modify-content">
                        <div name="closeModal" className="modifyModal-close" onClick={onClickCloseHandler}><img
                            src="https://static.thenounproject.com/png/26894-200.png"/></div>
                        <div className="customers-modify-title"><span>고객 상세 정보</span></div>
                        <div className="customers-regist-row-h">기본 정보</div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">이름<span className="customers-valid">*</span></div>
                            <div>
                                <input
                                    name="name"
                                    onChange={onChangeHandler}
                                    type="text"
                                    value={!modifyMode ? customer.name : form.name}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                            <div className="customers-valid-form">{validForm.name}</div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">성별<span className="customers-valid">*</span></div>
                            <select
                                name="gender"
                                onChange={onChangeHandler}
                                className="customers-regist-select"
                                value={!modifyMode ? customer.gender : form.gender}
                                disabled={!modifyMode}
                                style={inputStyle}
                            >
                                <option value="FEMALE">여성</option>
                                <option value="MALE">남성</option>
                            </select>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">생년월일(6자리)<span className="customers-valid">*</span></div>
                            <div>
                                <input
                                    name="birthDate"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? customer.birthDate : form.birthDate}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                            <div className="customers-valid-form">{validForm.birthDate}</div>
                        </div>
                        <div className="customers-regist-row customers-regist-row-phone">
                            <div className="customers-regist-head">전화번호<span className="customers-valid">*</span></div>
                            <div>
                                <select
                                    name="phone1"
                                    onChange={onChangeHandler}
                                    className="customers-regist-select"
                                    value={!modifyMode ? phone[0] : form.phone1}
                                    disabled={!modifyMode}
                                    style={inputStyle}
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="012">012</option>
                                </select>
                            </div>
                            -   &nbsp;
                            <div>
                                <input
                                    name="phone2"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? phone[1] : form.phone2}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                            -    &nbsp;
                            <div>
                                <input
                                    name="phone3"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? phone[2] : form.phone3}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                            <div className="customers-valid-form">{validForm.phone3}</div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">고객 등록일</div>
                            <div>
                                <input
                                    style={{border: "none"}}
                                    readOnly={true}
                                    value={currentDate}
                                />
                            </div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">등록상태</div>
                            <div>
                                <select
                                    name="customerStatus"
                                    onChange={onChangeHandler}
                                    className="customers-regist-select"
                                    value={!modifyMode ? customer.status : form.customerStatus}
                                    disabled={!modifyMode}
                                    style={inputStyle}
                                >
                                    <option value="ACTIVE">등록</option>
                                    <option value="INACTIVE">해지</option>
                                </select>
                            </div>
                        </div>

                        <div className="customers-regist-row-h">거주지 정보</div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">우편번호<span className="customers-valid">*</span></div>
                            <div>
                                <input
                                    className="customers-regist-head"
                                    type="text"
                                    id="sample6_postcode"
                                    placeholder="우편번호"
                                    readOnly
                                    value={!modifyMode ? customer.postalCode : form.postalCode}
                                    style={inputStyle}
                                />
                                &nbsp;
                                <input
                                    id="postButton"
                                    type="button"
                                    onClick={handleExecDaumPostcode}
                                    value="주소검색"
                                    disabled={!modifyMode}
                                    style={inputStyle}
                                />
                                <br/>
                            </div>
                            <div></div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">기본주소<span className="customers-valid">*</span></div>
                            <div>
                                <input
                                    type="text"
                                    id="sample6_address"
                                    placeholder="기본주소"
                                    readOnly
                                    value={!modifyMode ? customer.primaryAddress : form.primaryAddress}
                                    style={inputStyle}
                                />
                                <br/>
                            </div>
                            <div className="customers-valid-form">{validForm.primaryAddress}</div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">상세주소</div>
                            <div>
                                <input
                                    name="detailAddress"
                                    onChange={onChangeHandler}
                                    type="text"
                                    id="sample6_detailAddress"
                                    placeholder="상세주소"
                                    value={!modifyMode ? customer.detailAddress : form.detailAddress}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="customers-regist-row-h">고객 특이사항</div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">특이사항</div>
                            <div>
                            <textarea
                                name="memo"
                                onChange={onChangeHandler}
                                rows="4"
                                cols="50"
                                value={!modifyMode ? customer.memo : form.memo}
                                readOnly={!modifyMode}
                                style={inputStyle}
                            >
                            </textarea>
                            </div>
                        </div>

                        <div className="customers-regist-row-h">보호자 정보</div>
                        <div className="customers-regist-row">
                            <div>보호자 이름</div>
                            <div>
                                <input
                                    name="guardianName"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? customer.guardianName : form.guardianName}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">보호자 관계</div>
                            <div>
                                <input
                                    name="guardianRelationship"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? customer.guardianRelationship : form.guardianRelationship}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="customers-regist-row customers-regist-row-phone">
                            <div className="customers-regist-head">보호자 연락처</div>
                            <div>
                                <select
                                    name="guardianPhone1"
                                    onChange={onChangeHandler}
                                    className="customers-regist-select"
                                    value={!modifyMode ? guardianPhone[0] : form.guardianPhone1}
                                    disabled={!modifyMode}
                                    style={inputStyle}
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="012">012</option>
                                </select>
                            </div>
                            -   &nbsp;
                            <div>
                                <input
                                    name="guardianPhone2"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? guardianPhone[1] : form.guardianPhone2}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                            -    &nbsp;
                            <div>
                                <input
                                    name="guardianPhone3"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? guardianPhone[2] : form.guardianPhone3}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>


                    {!modifyMode &&
                        <div className="customers-regist-button-div">
                            <div onClick={onClickModifyModeHandler} className="customers-regist-button">고객 정보 수정</div>
                        </div>
                    }
                    {modifyMode &&
                        <div className="customers-regist-button-div">
                            <div onClick={onClickModifyHandler} id="customers-modify-save"
                                 className="customers-regist-button">수정완료
                            </div>
                            <div onClick={onClickModifyCancle} className="customers-regist-button">취소</div>
                        </div>
                    }
                </div>
            )}
        </>
    )
}

export default CustomerModifyForm;
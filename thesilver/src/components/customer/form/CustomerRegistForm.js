import React, {useEffect, useState} from "react";

function CustomerRegistForm() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // 페이지가 로드될 때 한 번 실행되는 부분
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setCurrentDate(formattedDate);
    }, []); // 빈 배열을 전달하여 처음 한 번만 실행



    ///////////////////////////////////////
    const [postcode, setPostcode] = useState();
    const [address, setAddress] = useState();
    const [extraAddress, setExtraAddress] = useState();


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



    return (
        <>

            <div>
                <div className="customers-regist-content">
                    <div className="customers-regist-row-h">기본 정보</div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">이름</div>
                        <div><input type="text"/></div>
                    </div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">성별</div>
                        <select className="customers-regist-select">
                            <option value="여성">여성</option>
                            <option value="남성">남성</option>
                        </select>
                    </div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">생년월일(6자리)</div>
                        <div><input/></div>
                    </div>
                    <div className="customers-regist-row customers-regist-row-phone">
                        <div className="customers-regist-head">전화번호</div>
                        <div>
                            <select className="customers-regist-select">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                        </div>
                        -   &nbsp;
                        <div><input/></div>
                        -    &nbsp;
                        <div><input/></div>
                    </div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">고객 등록일</div>
                        <div><input style={{border: "none"}} readOnly={true} value={currentDate}/></div>
                    </div>

                    <div className="customers-regist-row-h">거주지 정보</div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">우편번호</div>
                        <div>
                        <input className="customers-regist-head" type="text" id="sample6_postcode" placeholder="우편번호" readOnly value={postcode} />
                            &nbsp;
                            <input id="postButton" type="button" onClick={handleExecDaumPostcode} value="주소검색" /><br />
                        </div>
                        <div></div>
                    </div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">기본주소</div>
                        <div>
                        <input type="text" id="sample6_address" placeholder="주소" readOnly value={address} /><br />
                        </div>
                    </div>
                    <div className="customers-regist-row">
                        <div className="customers-regist-head">상세주소</div>
                        <div>
                            <input type="text" id="sample6_detailAddress" placeholder="상세주소"  />
                        </div>
                    </div>

                    <div className="customers-regist-row-h">고객 특이사항</div>
                    <div className="customers-regist-row">
                        <div>특이사항</div>
                        <div><textarea rows="4" cols="50"></textarea></div>
                    </div>

                    <div className="customers-regist-row-h">보호자 정보</div>
                    <div className="customers-regist-row">
                        <div>보호자 이름</div>
                        <div><input/></div>
                    </div>
                    <div className="customers-regist-row">
                        <div>보호자 관계</div>
                        <div><input/></div>
                    </div>
                    <div className="customers-regist-row">
                        <div>보호자 연락처</div>
                        <div><input/></div>
                    </div>
                    <div className="customers-regist-button-div">
                        <div className="customers-regist-button">신규 고객 등록</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomerRegistForm;
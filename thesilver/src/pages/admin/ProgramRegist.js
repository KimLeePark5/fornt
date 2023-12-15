import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAdminProgramRegistAPI} from "../../apis/ProgramAPICalls";


function ProgramRegist() {

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const dispatch = useDispatch();
    const {postProgramSuccess} = useSelector(state => state.programReducer);

    const [postNo, setPostNo] = useState("");
    const [address, setAddress] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [extraAddress, setExtraAddress] = useState("");

    useEffect(() => {
        if (postProgramSuccess === true) {
            navigate('/programs', {replace: true});
        }
    }, [postProgramSuccess]);

    // 이미지 업로드 버튼 클릭시 input type file이 클릭 되도록 하는 이벤트
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = () => {
        const fileInput = imageInput.current;

        // 이미지 파일 첨부 시 동작하는 이벤트
        // 파일이 선택되었는지 확인
        if (fileInput.files.length > 0) {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const {result} = e.target;
                if (result) setImageUrl(result);
            };

            fileReader.readAsDataURL(fileInput.files[0]);
        } else {
            console.log('파일 선택이 취소되었습니다.');
        }
    };

    /*-------------*/

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
                setPostNo(data.zonecode);
                setAddress(addr);
                setExtraAddress(extraAddr);
            },
        }).open();
    };

    //-----------------------------------

    // 등록 버튼 클릭 시 이벤트
    const onClickProgramRegistHandler = () => {

        // 폼 상태에 주소 포함
        const updatedForm = {
            ...form,
            postNo: postNo,
            address: address //이거맞음
        };

        // 서버로 전달한 FormData 형태의 객체 설정
        const formData = new FormData();

        if (imageInput.current.files.length > 0) {
            formData.append("teacherImg", imageInput.current.files[0]);
        }
        formData.append("programRequest", new Blob([JSON.stringify(updatedForm)], {type: 'application/json'}));

        dispatch(callAdminProgramRegistAPI({registRequest: formData})); //위에 formData를 안보내고 setForm을 보내고 있어서 안됐음
    }

    // 상태 변경 핸들러
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    useEffect(() => {
        if (postProgramSuccess) {
            alert('프로그램 등록이 완료되었습니다.');
            window.location.href = "/programs";
        }
    }, [postProgramSuccess]);

//---------------------------------------

    return (
        <div>

            <div style={{border: "2px solid #000000"}}>

                <div className="program-head1">❮ 프로그램 등록 ❯</div>
                <table className="description-table">
                    <tbody>
                    <tr>
                        <th className="program-table1" style={{"border-top": "1px solid #000000"}}>프로그램 명</th>
                        <td className="program-table1-body1">
                            <input name="categoryName" type="text" onChange={onChangeHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="program-table1">시행 시기</th>
                        <td className="program-table1-body1">
                            <input
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={onChangeHandler}
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            {' ~ '}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={onChangeHandler}
                                min={form.startDate}
                            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {' 매주 '}&nbsp;&nbsp;
                            <select
                                onChange={onChangeHandler}
                                name="day">
                                <option>-- 선택하세요 --</option>
                                <option value="월">월</option>
                                <option value="화">화</option>
                                <option value="수">수</option>
                                <option value="목">목</option>
                                <option value="금">금</option>
                            </select>
                            &nbsp;&nbsp;{'요일'}
                        </td>
                    </tr>

                    <tr>
                        <th className="program-table1">회 차</th>
                        <td className="program-table1-body1">
                            <div>
                                <input
                                    onChange={onChangeHandler}
                                    name="round"
                                    type="text"
                                    value={form.numberOfSessions}

                                    style={{width: "40px"}} // 너비 조정/>
                                />&nbsp;&nbsp;&nbsp;
                                회 차
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th className="program-table1">수업 시간</th>
                        <td className="program-table1-body1">
                            <input
                                onChange={onChangeHandler}
                                name="startTime"
                                type="time"
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            ~
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                onChange={onChangeHandler}
                                name="endTime"
                                type="time"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                {/*----------------------------------------*/}

                <div className="program-head2">프로그램 내용</div>
                <div className="program-table2-body2"><input name="shortStory" type="text" onChange={onChangeHandler}
                                                             style={{width: "1300px"}}/>
                </div>

                <div className="program-head3">담당 강사 프로필</div>

                <main className="detail-main">
                    <div className="detail-div01">

                        <div className=" img-div0">
                            {imageUrl &&
                                <img
                                    className="img-div00"
                                    alt="preview"
                                    src={imageUrl}
                                />
                            }
                            <input
                                style={{display: 'none'}}
                                type="file"
                                name='profilePicture'
                                accept='image/jpg,image/png,image/jpeg,image/gif'
                                ref={imageInput}
                                onChange={onChangeImageUpload}
                            />
                            <button
                                className="program-image-button"
                                onClick={onClickImageUpload}
                            >
                                이미지 업로드
                            </button>
                        </div>

                        <div className="description-div0">

                            <table className="description-table0">
                                <tbody>

                                <tr>
                                    <th className="program-table3-body3">이름 :</th>
                                    <td className="program-table3-body4">
                                        <input name='teacherName'
                                               onChange={onChangeHandler}/></td>
                                </tr>
                                <tr>
                                    <th className="program-table3-body3">성별 :</th>
                                    <td className="program-table3-body4">
                                        <select
                                            onChange={onChangeHandler}
                                            name="gender">
                                            <option>-- 선택하세요 --</option>
                                            <option value="남">남</option>
                                            <option value="여">여</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="program-table3-body3">생년월일 :</th>
                                    <td className="program-table3-body4"><input name="birthDate" type="text"
                                                                                onChange={onChangeHandler}/></td>
                                </tr>
                                <tr>
                                    <th className="program-table3-body3">연락처 :</th>
                                    <td className="program-table3-body4"><input name="phone" type="text"
                                                                                onChange={onChangeHandler}/></td>
                                </tr>
                                <tr>
                                    <th className="program-table3-body3">주소 :</th>
                                    <td className="program-table3-body4">
                                        <div>
                                            <input name="postNo"
                                                   type="text"
                                                   style={{width: "80px"}}
                                                   id="sample6_postcode"
                                                   placeholder="우편번호"
                                                   readOnly
                                                   value={postNo}/>
                                            &nbsp;
                                            <input id="addressButton"
                                                   type="button"
                                                   onClick={handleExecDaumPostcode}
                                                   value="검색"/><br/>
                                        </div>
                                        <div>
                                            <div>
                                                <input type="text"
                                                       name="address"
                                                       id="sample6_address"
                                                       placeholder="주소"
                                                       readOnly
                                                       value={address}/><br/>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input name="detailAddress"
                                                       onChange={onChangeHandler}
                                                       type="text"
                                                       id="sample6_detailAddress"
                                                       placeholder="상세주소"/>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
            <div className="product-button-div">
                <button
                    style={{width: "70px"}}
                    onClick={() => navigate(-1)}
                >
                    이전으로
                </button>

                <button
                    onClick={onClickProgramRegistHandler}
                    style={{marginLeft: "1320px"}}
                >
                    프로그램 등록
                </button>
            </div>
        </div>
    );
}


export default ProgramRegist;
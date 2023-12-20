import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAdminProgramModifyAPI, callProgramDetailAPI} from "../../apis/ProgramAPICalls";

function ProgramModify() {

    const {code} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 읽기 모드와 수정 모드를 전환하는 state
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const {program, putProgramSuccess} = useSelector(state => state.programReducer);

    const [postNo, setPostNo] = useState("");
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
                setPostNo(data.zonecode);
                setAddress(addr);
                setExtraAddress(extraAddr);
            },
        }).open();
    };
    //-----------------------------------------------------
    // 최초 랜더링 시 프로그램 상세 정보 조회
    useEffect(() => {
        dispatch(callProgramDetailAPI({ code }));
    }, []);
    //---------------------------------------------------

    // 수정 성공 시 프로그램 목록으로 이동 // 이거 뭔소용이냐.........
    useEffect(() => {
        if (putProgramSuccess === true) {
            navigate('/programs', {replace: true})
        }
    }, [putProgramSuccess]);

    //입력 양식 값 변경 시 state 수정
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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

    // 수정 모드로 변환하는 이벤트
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({...program}); //{기존에 가져왔던 프로그램 가져옴} -> Form으로 옮겨감
    }

    // 프로그램 수정 요청하는 이벤트 저장 버튼 눌렀을 때
    const onClickProductUpdateHandler = () => {

        // 폼 상태에 주소 포함
        const updatedForm = {
            ...form,
            postNo: postNo,
            address: address //이거맞음
        };

        const formData = new FormData();

        formData.append("teacherImg", imageInput.current.files[0]);
        formData.append("programRequest", new Blob([JSON.stringify(updatedForm)], {type: 'application/json'}));

        dispatch(callAdminProgramModifyAPI({code, modifyRequest: formData}));
        alert("프로그램을 수정하였습니다.");
        navigate('/programs', {replace: true})
    }

    const inputStyle = !modifyMode ? {backgroundColor: '#e8e8e8'} : null;

    return (
        <div>
            {program &&

                <div style={{border: "2px solid #000000",  "backgroundColor": "#FFFFFF"}}>

                    <div className="program-head1">❮ 프로그램 수정 ❯</div>
                    <table className="description-table">
                        <tbody>
                        <tr>
                            <th className="program-table1" style={{"borderTop": "1px solid #000000"}}>프로그램 명</th>
                            <td className="program-table1-body1">
                                <input
                                    name="categoryName"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? program.categoryName : form.categoryName}
                                    readOnly={!modifyMode}
                                    style={inputStyle}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="program-table1">시행 시기</th>
                            <td className="program-table1-body1">
                                <input
                                    name="startDate"
                                    type="date"
                                    onChange={onChangeHandler}
                                    value={!modifyMode ? program.startDate : form.startDate}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                {' ~ '}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                    name="endDate"
                                    type="date"
                                    onChange={onChangeHandler}
                                    min={form.startDate}
                                    value={!modifyMode ? program.endDate : form.endDate}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {' 매주 '}&nbsp;&nbsp;
                                <select
                                    onChange={onChangeHandler}
                                    name="day"
                                    value={!modifyMode ? program.day : form.day}
                                    readOnly={!modifyMode}
                                    style={inputStyle}>
                                    <option>-- 선택하세요 --</option>
                                    <option value="월">월</option>
                                    <option value="화">화</option>
                                    <option value="수">수</option>
                                    <option value="목">목</option>
                                    <option value="금">금</option>
                                </select>
                                {'요일'}
                            </td>
                        </tr>

                        <tr>
                            <th className="program-table1">회 차</th>
                            <td className="program-table1-round">
                                <div>
                                    <input
                                        onChange={onChangeHandler}
                                        name="round"
                                        value={!modifyMode ? program.round : form.round}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
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
                                    value={!modifyMode ? program.startTime : form.startTime}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                ~
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                    onChange={onChangeHandler}
                                    name="endTime"
                                    type="time"
                                    value={!modifyMode ? program.endTime : form.endTime}
                                    readOnly={!modifyMode}
                                    style={inputStyle}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    {/*----------------------------------------*/}

                    <div className="program-head2">프로그램 내용</div>
                    <div className="program-table2-shortStory">
                        <input name="shortStory"
                               onChange={onChangeHandler}
                               value={!modifyMode ? program.shortStory : form.shortStory}
                               readOnly={!modifyMode}
                               style={inputStyle}/>
                    </div>

                    <div className="program-head3">담당 강사 프로필</div>

                    <main className="detail-main">
                        <div className="detail-div01">

                            <div className=" img-div0">
                                    <img
                                        className="img-div00"
                                         alt="preview"
                                          src={ !imageUrl ?  program.profilePicture  : imageUrl }
                                        //src= '/img/2341199f94884fed9b5fae15959f7034.jpg' /*이미지 걍 박아서 눈가리고 아웅함 ㅋㅋ*/
                                    />
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
                                    style={ inputStyle }
                                    disabled={ !modifyMode }
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
                                                   onChange={onChangeHandler}
                                                   value={!modifyMode ? program.teacherName : form.teacherName}
                                                   readOnly={!modifyMode}
                                                   style={inputStyle}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <th className="program-table3-body3">성별 :</th>
                                        <td className="program-table3-body4">
                                            <select
                                                onChange={onChangeHandler}
                                                name="gender"
                                                value={!modifyMode ? program.gender : form.gender}
                                                readOnly={!modifyMode}
                                                style={inputStyle}
                                            >
                                                <option>-- 선택하세요 --</option>
                                                <option value="남">남</option>
                                                <option value="여">여</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="program-table3-body3">생년월일 :</th>
                                        <td className="program-table3-body4">
                                            <input name="birthDate"
                                                   onChange={onChangeHandler}
                                                   value={!modifyMode ? program.birthDate : form.birthDate}
                                                   readOnly={!modifyMode}
                                                   style={inputStyle}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <th className="program-table3-body3">연락처 :</th>
                                        <td className="program-table3-body4">
                                            <input name="phone"
                                                   onChange={onChangeHandler}
                                                   value={ !modifyMode ? program.phone : form.phone }
                                                   readOnly={ !modifyMode }
                                                   style={ inputStyle }
                                            /></td>
                                    </tr>
                                    <tr>
                                        <th className="program-table3-body3">주소 :</th>
                                        <td className="program-table3-body4">
                                            <div>
                                                <input
                                                    className="input-postNo"
                                                       name="postNo"
                                                       id="sample6_postcode"
                                                       placeholder="우편번호"
                                                       readOnly
                                                       style={ inputStyle }
                                                       value={postNo}/>
                                                &nbsp;
                                                <input id="addressButton"
                                                       type="button"
                                                       onClick={handleExecDaumPostcode}
                                                       value="검색"/><br/>
                                            </div>
                                            <div>
                                                <div>
                                                    <input
                                                           name="address"
                                                           id="sample6_address"
                                                           placeholder="주소"
                                                           readOnly
                                                           style={ inputStyle }
                                                           value={address}/><br/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <input name="detailAddress"
                                                           onChange={onChangeHandler}
                                                           id="sample6_detailAddress"
                                                           placeholder="상세주소"
                                                           value={ !modifyMode ? program.detailAddress : form.detailAddress }
                                                           readOnly={ !modifyMode }
                                                           style={ inputStyle }
                                                    />
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

            }
            <div className="product-button-div">
                <button
                    onClick={() => navigate(-1)}
                >
                    이전으로
                </button>
                {!modifyMode &&
                    <button
                        onClick={onClickModifyModeHandler}
                    >
                        수정 모드
                    </button>
                }
                {modifyMode &&
                    <button
                        onClick={onClickProductUpdateHandler}
                    >
                        저장
                    </button>
                }
            </div>

        </div>
    )
}

export default ProgramModify;
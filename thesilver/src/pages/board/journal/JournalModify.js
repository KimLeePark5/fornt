import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callAdminProgramModifyAPI, callGetProgramListAPI} from "../../../apis/ProgramAPICalls";
import {callJournalDetailAPI, callJournalRegistAPI} from "../../../apis/JournalAPICalls";
import programs from "../program/Programs";

function JournalModify() {

    const {journalCode} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInputs = useRef([React.createRef(), React.createRef(), React.createRef()]);
    const [imageUrls, setImageUrls] = useState([]);
    // 모든 입력 값이 채워져 있는지 확인하는 함수
    const isFormValid = () => {
        // form 객체의 속성 중 하나라도 비어있으면 false 반환
        return Object.values(form).every(value => value !== "");
    };

    // 이미지 데이터를 직접 보여주도록 수정
    const imageUrl = imageUrls.length > 0 ? imageUrls[0] : '';

    // 읽기 모드와 수정 모드를 전환하는 state
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({

    });
    // const [imageUrl, setImageUrl] = useState('');
    const {journal, putJournalSuccess} = useSelector(state => state.journalReducer);
    const imageInput = useRef();

    useEffect(() => {
        const fetchJournalDetails = async () => {
            await dispatch(callJournalDetailAPI({journalCode}));
        };
        fetchJournalDetails();
    }, [dispatch, journalCode]);

    //-----------------------------------------------------
    // 최초 랜더링 시 프로그램 상세 정보 조회
    useEffect(() => {
        dispatch(callJournalDetailAPI({journalCode}));
    }, []);
    //---------------------------------------------------

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

    const onChangeImageUpload = (index) => (e) => {
        const fileInput = imageInputs.current[index].current;

        // 이미지 파일 첨부 시 동작하는 이벤트
        // 파일이 선택되었는지 확인
        if (fileInput.files.length > 0) {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const {result} = e.target;
                if (result) {
                    setImageUrls((prevImageUrls) => {
                        const updatedImageUrls = [...prevImageUrls];
                        updatedImageUrls[index] = result;
                        return updatedImageUrls;
                    });
                }
            };

            fileReader.readAsDataURL(fileInput.files[0]);
        } else {
            console.log("파일 선택이 취소되었습니다.");
        }
    };

    // 수정 모드로 변환하는 이벤트
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({...journal}); //{기존에 가져왔던 상품 가져옴} -> Form으로 옮겨감
    }

    // 일지 수정 요청하는 이벤트 저장 버튼 눌렀을 때
    const onClickProductUpdateHandler = async () => {
        // 값이 하나라도 빈 상태로 수정되었을 때 알림 창 띄우기
        if (!isFormValid()) {
            alert("모두 입력해주세요.");
            return;
        }

        // attachments 이미지가 빈 값일 때 알림 창 띄우기
        if (imageUrls.every(url => !url)) {
            alert("이미지를 첨부해주세요.");
            return;
        }

//-------------------------------------------------

        // 서버로 전달한 FormData 형태의 객체 설정
        const formData = new FormData();

        imageInputs.current.forEach((inputRef, index) => {
            if (inputRef.current.files.length > 0) {
                formData.append('journalImages', inputRef.current.files[0]);
            }
        });
        formData.append("journalRequest", new Blob([JSON.stringify(form)], {type: "application/json"}));

        // dispatch 호출 후 수정 성공 여부 확인
        dispatch(callJournalRegistAPI({registJournalRequest: formData})).then(response => {
            navigate('/journals', {replace: true})
            alert("일지를 수정하였습니다.");
        });
    };

    const inputStyle = !modifyMode ? {backgroundColor: '#e8e8e8'} : null;

    return (
        <>
            {journal &&
                <>
                    <div className="journal-head1">❮ 프로그램 운영 일지 수정 ❯</div>

                    <table className="description-table"
                           style={{border: "2px solid #000000", "backgroundColor": "#FFFFFF"}}>
                        <tbody>
                        <div className="detail-div1">

                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">프로그램 명</th>
                                <td style={{paddingLeft: "40px", paddingRight: "153px"}}>
                                    <input
                                        name="categoryName"
                                        value={!modifyMode ? journal.categoryName : form.categoryName}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
                                        onChange={onChangeHandler}/>

                                </td>
                            </tr>
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>회 차</th>
                                <td style={{paddingLeft: "40px", paddingRight: "175px", width: "175px"}}>
                                    <input
                                        className="round-input"
                                        onChange={onChangeHandler}
                                        name="round"
                                        value={!modifyMode ? journal.round : form.round}
                                        readOnly={!modifyMode}
                                        style={inputStyle}/>
                                    &nbsp;&nbsp;회 차
                                </td>
                            </tr>
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>참관 일자</th>
                                <td style={{paddingLeft: "40px"}}>
                                    <input name="observation"
                                           type="date"
                                           value={!modifyMode ? journal.observation : form.observation}
                                           readOnly={!modifyMode}
                                           style={inputStyle}
                                           onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </div>


                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">프로그램 주제</th>
                                <td className="journal-table3-body1" style={{width: "1000px"}}>
                                    <input
                                        style={{width: "200px"}}
                                        name="programTopic"
                                        value={!modifyMode ? journal.programTopic : form.programTopic}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">시작 시간</th>
                                <td className="journal-table3-body1">
                                    <input
                                        onChange={onChangeHandler}
                                        name="startTime"
                                        type="time"
                                        value={!modifyMode ? journal.startTime : form.startTime}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
                                    />
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">종료 시간</th>
                                <td className="journal-table3-body1" style={{paddingRight: "710px"}}>
                                    <input
                                        onChange={onChangeHandler}
                                        name="endTime"
                                        type="time"
                                        value={!modifyMode ? journal.endTime : form.endTime}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
                                    />
                                </td>
                            </tr>
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1"
                                    style={{borderLeft: "2px solid #000000", borderTop: "1px solid #000000"}}>담당자
                                </th>
                                <td className="journal-table3-body1" style={{width: "300px"}}>
                                    <input name="employeeName"
                                           onChange={onChangeHandler}
                                           value={!modifyMode ? journal.employeeName : form.employeeName}
                                           readOnly={!modifyMode}
                                           style={inputStyle}
                                           onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>

                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">요일</th>
                                <td className="journal-table3-body1"
                                    style={{paddingRight: "635px", width: "180px"}}>
                                    <select
                                        onChange={onChangeHandler}
                                        name="day"
                                        value={!modifyMode ? journal.day : form.day}
                                        readOnly={!modifyMode}
                                        style={inputStyle}>
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
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1" style={{borderLeft: "2px solid #000000"}}>강사</th>
                                <td className="journal-table3-body1">
                                    <input name='teacherName'
                                           onChange={onChangeHandler}
                                           value={!modifyMode ? journal.teacherName : form.teacherName}
                                           readOnly={!modifyMode}
                                           style={inputStyle}
                                           onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-subProgress">
                                    프로그램<br/>
                                    진행 사항
                                </th>
                                <td className="journal-body-subProgress" style={{textAlign: "left"}}>
                            <textarea name="subProgress"
                                      className="subProgress-input"
                                      value={!modifyMode ? journal.subProgress : form.subProgress}
                                      readOnly={!modifyMode}
                                      style={inputStyle}
                                      onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-observe">
                                    반응 및<br/>
                                    관찰 결과
                                </th>
                                <td className="journal-table3-body1" style={{width: "1250px"}}>
                            <textarea
                                name="observe"
                                className="observe-input"
                                value={!modifyMode ? journal.observe : form.observe}
                                readOnly={!modifyMode}
                                style={inputStyle}
                                onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">참가 인원</th>
                                <td className="journal-table3-body1" style={{width: "1250px"}}>
                                    {/*여기에 모달*/}
                                    <textarea
                                        className="participantNames-input"
                                        name="participantNames"
                                        value={!modifyMode ? journal.participantNames : form.participantNames}
                                        readOnly={!modifyMode}
                                        style={inputStyle}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">평가 및 관리</th>
                                <td className="journal-table3-body1" style={{width: "1250px"}}>
                                    <input name="rating"
                                           className="rating-input"
                                           value={!modifyMode ? journal.rating : form.rating}
                                           readOnly={!modifyMode}
                                           style={inputStyle}
                                           onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>
                        <div className="detail-div1">
                            <tr style={{display: "flex", alignItems: "center"}}>
                                <th className="journal-table1">비고</th>
                                <td className="journal-table3-body1" style={{width: "1250px"}}>
                                    <input className="note-input"
                                           name="note"
                                           value={!modifyMode ? journal.note : form.note}
                                           readOnly={!modifyMode}
                                           style={inputStyle}
                                           onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </div>

                        <div className="detail-div1">
                            <div className="journal-imgs">첨부 파일</div>

                            <div className="attachmentUrl2-div">
                                <div className="attachmentUrls2" style={{width: "1250px"}}>
                                    {imageInputs.current.map((inputRef, index) => (
                                        <div key={index}>
                                            <img className="img-div00"
                                                 alt="preview"
                                                // src={!imageUrl ? journal.attachments : imageUrls[index]}/>
                                                 src={imageUrls[index] || ''}
                                            />
                                            <input
                                                style={{display: "none"}}
                                                type="file"
                                                name={`attachments-${index}`}
                                                accept="image/jpg,image/png,image/jpeg,image/gif"
                                                ref={inputRef}
                                                onChange={onChangeImageUpload(index)}
                                            />
                                            <button
                                                className="journal-image-button"
                                                style={inputStyle}
                                                disabled={!modifyMode}
                                                onClick={() => inputRef.current.click(onClickImageUpload)}
                                            >
                                                ➕
                                            </button>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                        </tbody>
                    </table>
                </>
            }
            <div className="product-button-div">
                <button
                    style={{width: "70px"}}
                    onClick={() => navigate(-1)}
                >
                    이전으로
                </button>
                {!modifyMode &&
                    <button
                        onClick={onClickModifyModeHandler}
                        style={{marginLeft: "1320px"}}
                    >
                        수정 모드
                    </button>
                }
                {modifyMode &&
                    <button
                        onClick={onClickProductUpdateHandler}
                        style={{marginLeft: "1320px"}}
                    >
                        저장
                    </button>
                }
            </div>
        </>

    )
}

export default JournalModify;
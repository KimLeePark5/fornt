import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callJournalRegistAPI} from "../../../apis/JournalAPICalls";
import {postJournalSuccess} from "../../../modules/JournalsModule";

function JournalRegist() {

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const imageInputs = useRef([React.createRef(), React.createRef(), React.createRef()]);
    const dispatch = useDispatch();
    const {postJournalSuccess} = useSelector(state => state.journalReducer);

    useEffect(() => {
        if (postJournalSuccess === true) {
            navigate('/journals', {replace: true});
        }
    }, [postJournalSuccess]);

    // 이미지 업로드 버튼 클릭시 input type file이 클릭 되도록 하는 이벤트
    const onChangeImageUpload = (index) => (e) => {
        const fileInput = imageInputs.current[index].current;

        // 이미지 파일 첨부 시 동작하는 이벤트
        // 파일이 선택되었는지 확인
        if (fileInput.files.length > 0) {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const {result} = e.target;
                if (result) {
                    const updatedImageUrls = [...imageUrls];
                    updatedImageUrls[index] = result;
                    setImageUrls(updatedImageUrls);
                }
            };

            fileReader.readAsDataURL(fileInput.files[0]);
        } else {
            console.log("파일 선택이 취소되었습니다.");
        }
    };

    // 등록 버튼 클릭 시 이벤트
    const onClickProgramRegistHandler = () => {
        const updatedForm = {...form};
        // 서버로 전달한 FormData 형태의 객체 설정
        const formData = new FormData();


        imageInputs.current.forEach((inputRef, index) => {
            if (inputRef.current.files.length > 0) {
                formData.append(`journalImages-${index}`, inputRef.current.files[0]);
            }
        });

        formData.append(
            "journalRequest",
            new Blob([JSON.stringify(updatedForm)], {type: "application/json"})
        );

        dispatch(callJournalRegistAPI({registJournalRequest: updatedForm, setForm}));
    };

    //const 쓸 값 이름 주소 어쩌고 다 넣고 보내기..?

    // 상태 변경 핸들러
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(form);
    };

    useEffect(() => {
        if (postJournalSuccess) {
            alert('일지 등록이 완료되었습니다.');
            window.location.href = "/journals";
        }
    }, [postJournalSuccess]);
//--------------------------------------------

    return (
        <>
            <div className="journal-head1">❮ 프로그램 운영 일지 등록 ❯</div>

            <table className="description-table" style={{border: "2px solid #000000", "background-color": "#FFFFFF"}}>
                <tbody>
                <div className="detail-div1">

                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">프로그램 명</th>
                        <td style={{"padding-left": "40px", "padding-right": "153px"}}>
                            <select onChange={onChangeHandler}>
                                <option>-- 선택하세요 --</option>
                            </select>
                        </td>
                    </tr>
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>회 차</th>
                        <td style={{"padding-left": "40px", "padding-right": "175px", width: "175px"}}>
                            <select onChange={onChangeHandler}>
                                <option>-- 선택하세요 --</option>
                            </select>
                            &nbsp;&nbsp;회 차
                        </td>
                    </tr>
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>참관 일자</th>
                        <td style={{"padding-left": "40px"}}>
                            <input name="observation"
                                   type="date"
                                   onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                </div>


                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">프로그램 주제</th>
                        <td className="journal-table3-body1" style={{"width": "1000px"}}>
                            <input
                                style={{width: "200px"}}
                                name="programTopic"
                                type="text"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">시작 시간</th>
                        <td className="journal-table3-body1">
                            <input
                                onChange={onChangeHandler}
                                name="startTime"
                                type="time"
                            />
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">종료 시간</th>
                        <td className="journal-table3-body1" style={{"padding-right": "710px"}}>
                            <input
                                onChange={onChangeHandler}
                                name="endTime"
                                type="time"
                            />
                        </td>
                    </tr>
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1"
                            style={{"border-left": "2px solid #000000", "border-top": "1px solid #000000"}}>담당자
                        </th>
                        <td className="journal-table3-body1" style={{"width": "300px"}}>
                            <input name="employeeName"
                                   type="text"
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">요일</th>
                        <td className="journal-table3-body1" style={{"padding-right": "635px", width: "180px"}}>
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
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1" style={{"border-left": "2px solid #000000"}}>강사</th>
                        <td className="journal-table3-body1">
                            <input name="teacherName"
                                   type="text"
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-subProgress">
                            프로그램<br/>
                            진행 사항
                        </th>
                        <td className="journal-body-subProgress" style={{"text-align": "left"}}>
                            <textarea name="subProgress"
                                   type="text"
                                   style={{width:"1250px", height:"100px"}}
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-observe">
                            반응 및<br/>
                            관찰 결과
                        </th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>
                            <textarea name="observe"
                                      style={{width:"1250px", height:"70px"}}
                                   type="text"
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">참가 인원</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>

                            여기에 모달

                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">평가 및 관리</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>
                            <input name="rating"
                                   type="text"
                                   style={{width:"1250px"}}
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>
                <div className="detail-div1">
                    <tr style={{display: "flex", "align-items": "center"}}>
                        <th className="journal-table1">비고</th>
                        <td className="journal-table3-body1" style={{"width": "1250px"}}>
                            <input name="note"
                                   type="text"
                                   style={{width:"1250px"}}
                                   onChange={onChangeHandler}/>
                        </td>
                    </tr>
                </div>

                <div className="detail-div1">
                    <div className="journal-imgs">첨부 파일</div>

                    <div className="attachmentUrl2-div">
                        <div className="attachmentUrls2" style={{"width": "1250px"}}>
                            {imageInputs.current.map((inputRef, index) => (
                                <div key={index}>
                                    {imageUrls[index] &&
                                        <img className="img-div00" alt="preview" src={imageUrls[index]}/>}
                                    <input
                                        style={{display: "none"}}
                                        type="file"
                                        name={`attachments-${index}`}
                                        accept="image/jpg,image/png,image/jpeg,image/gif"
                                        ref={inputRef}
                                        onChange={onChangeImageUpload(index)}
                                    />
                                    <button className="journal-image-button" onClick={() => inputRef.current.click()}>
                                        ➕
                                    </button>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                </tbody>
            </table>
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

        </>
    )
}

export default JournalRegist;
import React, {useEffect, useState} from "react";
import LicenseItem from "../items/LicenseItem";
import PagingBar from "../../common/PagingBar";
import {callLicenseAPI, callLicenseRegistAPI} from "../../../apis/CustomerAPICalls";
import {useDispatch, useSelector} from "react-redux";
import customerReducer, {deleteLicenseReset, postLicenseReset} from "../../../modules/CustomerModule";

function LicenseModifyForm({openLicenseModal, customer, licenses, onClickCloseHandler, pageInfo}) {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [licenseDate, setLicenseDate] = useState({});
    const {postLicenseSuccess} = useSelector(state => state.customerReducer)
    const {deleteLicenseSuccess} = useSelector(state => state.customerReducer)

    useEffect(() => {
        if (deleteLicenseSuccess) {
            alert("회원권 삭제가 완료되었습니다.");
            openLicenseModal(customer.customerCode);
            dispatch(deleteLicenseReset())
            setCurrentPage(1)
        }
    }, [deleteLicenseSuccess]);

    useEffect(() => {
        if (postLicenseSuccess) {
            alert("회원권 등록이 완료되었습니다.");
            openLicenseModal(customer.customerCode);
            dispatch(postLicenseReset())

        }
    }, [postLicenseSuccess]);

    useEffect(() => {
        const customerCode = customer.customerCode;
        console.log("라이센스 모디파이 폼 로그")
        dispatch(callLicenseAPI({customerCode, currentPage}))
    }, [currentPage]);


    console.log("라이센스라이센스스 : ", licenses)
    console.log("라이센스커스토머 : ", customer)

    const onChangeLicenseDate = (e) => {
        setLicenseDate({
                ...licenseDate,
                [e.target.name]: e.target.value
            }
        )
        console.log("licenseDate", licenseDate)
    }

    const onClickLicenseRegist = () => {
        const customerCode = customer.customerCode;
        dispatch(callLicenseRegistAPI({customerCode, licenseDate}))
    }


    return (
        <>
            {licenses && (
                <div className="customers-modify-box" id="customers-license-box">
                    <div className="customers-regist-content customers-modify-content" id="customers-license-content">
                        <div className="modifyModal-close" onClick={onClickCloseHandler}><img
                            src="https://static.thenounproject.com/png/26894-200.png"/></div>
                        <div className="customers-modify-title"><span>회원권 정보</span></div>
                        <div className="customers-regist-row-h">회원권 등록</div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">고객코드</div>
                            <div>{customer.customerCode}</div>
                        </div>
                        <div className="customers-regist-row">
                            <div className="customers-regist-head">이름</div>
                            <div>{customer.name}</div>
                        </div>
                        <div className="customers-regist-row" id="customers-license-row">
                            <div className="customers-regist-head">회원권 등록</div>
                            <div>
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={onChangeLicenseDate}
                                />
                            </div>
                            &nbsp;-&nbsp;
                            <div>
                                <input
                                    id="license-input"
                                    type="date"
                                    name="endDate"
                                    onChange={onChangeLicenseDate}
                                />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <input
                                    id="license-button"
                                    type="button"
                                    value="등록"
                                    onClick={onClickLicenseRegist}
                                />
                            </div>
                        </div>
                        <div className="customers-regist-row-h">회원권 등록 내역</div>
                        <div className="customers-license-row-h">
                            <div>등록일</div>
                            <div></div>
                            <div>시작일</div>
                            <div></div>
                            <div>종료일</div>
                        </div>
                        {licenses.map((license) => <LicenseItem license={license}/>)}
                        <div id="customers-license-pagingbar">
                            <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>


                </div>
            )}
        </>
    )
}

export default LicenseModifyForm;
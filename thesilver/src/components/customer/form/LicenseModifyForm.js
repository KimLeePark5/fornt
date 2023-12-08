import React, {useState} from "react";
import LicenseItem from "../items/LicenseItem";
import PagingBar from "../../common/PagingBar";

function LicenseModifyForm ({customer, licenses, onClickCloseHandler, pageInfo}) {
    const [currentPage, setCurrentPage] = useState(1);

    console.log("라이센스라이센스스 : ", licenses)
    console.log("라이센스커스토머 : ", customer)

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
                            <div><input type="date"/></div>
                            &nbsp;-&nbsp;
                            <div><input id="license-input" type="date"/></div>
                            &nbsp;&nbsp;
                            <div><input id="license-button" type="button" value="등록"/></div>
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
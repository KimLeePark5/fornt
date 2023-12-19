import ProceedRequireItem from "../items/ProceedRequireItem";

function ProceedRequireList({proceedRequire}) {

    return (
        <>
        <div className="require-proceed-list">
            <div className="require-proceed-head">
                <div className="rpb1">이름</div>
                <div className="rpb1">종류</div>
                <div className="rpb2">사용 일자</div>
                <div className="rpb3">사용 일</div>
                <div className="rpb3">상태</div>
                <div className="rpb4">일시</div>
            </div>
            {proceedRequire?.data.map(data => <ProceedRequireItem key={data.employeeCode} data={data}/>)}
        </div>
        </>
    )
}

export default ProceedRequireList;
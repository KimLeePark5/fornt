import ProceedRequireItem from "../items/ProceedRequireItem";

function ProceedRequireList({proceedRequire}) {

    return (
        <>
        <div className="require-proceed-list">
            <div className="require-proceed-head">
                <div>이름</div>
                <div>종류</div>
                <div>사용 일자</div>
                <div>사용 일</div>
                <div>상태</div>
                <div>일시</div>
            </div>
            {proceedRequire?.data.map(data => <ProceedRequireItem key={data.employeeCode} data={data}/>)}
        </div>
        </>
    )
}

export default ProceedRequireList;
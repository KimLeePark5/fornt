import {useEffect} from "react";

function EmpSimpleInfo() {

    const name = '홍길동'
    const rank = '사원'
    const image = '사진'
    useEffect(() => {

    }, []);
    return (
        <div className='simpleinfoCon'>
            <img className='simpleinfoimg' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hq0WZBhFK7trcEApAsmPWKPUbBBZdDg8GPjcVTywD8-BGgE5KvBp55RPRb-bgxuHmE0&usqp=CAU'}/>
            <div className='simpleinfoName'> {name} {rank}</div>
        </div>
    )
}

export default EmpSimpleInfo;
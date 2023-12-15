import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PagingBar from "../../../components/common/PagingBar";
import ProgramList from "../../../components/board/program/lists/ProgramList";
import {callProgramSearchListAPI} from "../../../apis/ProgramAPICalls";

function SearchProgram(){

    const dispatch = useDispatch();
    const [searchParams]= useSearchParams(); //
    const categoryName = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const {programs} = useSelector(state => state.programReducer);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        dispatch(callProgramSearchListAPI({categoryName, currentPage}));
    }, [categoryName, currentPage]);

    return(
        <>
            {programs && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <ProgramList data={programs.data}/>
                    <PagingBar pageInfo={programs.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    )
}

export default SearchProgram;
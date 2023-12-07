import TodoListItem from "../todoList/TodoListItem";
import PagingBar from "../common/PagingBar";
import {useState} from "react";
import {ToastContainer} from "react-toastify";


function TodoListList({data, setPage, setDay}) {

    const dateChangeHandler = (e)=>{
        setDay(e.target.value)
    }

    return (
        <div>
            <ToastContainer/>
            <TodoListItem content={data.data.content}/>
            <PagingBar setCurrentPage={setPage} pageInfo={data.pageInfo}/>
        </div>
    )
}

export default TodoListList;
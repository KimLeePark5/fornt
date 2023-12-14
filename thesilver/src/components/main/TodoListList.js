import TodoListItem from "../todoList/TodoListItem";
import PagingBar from "../common/PagingBar";
import {useState} from "react";
import {ToastContainer} from "react-toastify";


function TodoListList({data, setPage, setDay}) {


    return (
        <div>
            <ToastContainer/>
            <TodoListItem content={data.data.content}/>
            <div className='todopage'>
            <PagingBar setCurrentPage={setPage} pageInfo={data.pageInfo}/>
            </div>
        </div>
    )
}

export default TodoListList;
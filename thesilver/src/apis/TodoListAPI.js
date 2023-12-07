import {request} from "./Api";
import {deleteSuccess, getTodolist, modifySuccess, registSuccess} from "../modules/TodoListModule";

export const callTodoListAPI = (page=1,day)=>{
    console.log(day)
    return async (dispatch,getState) => {
        const result = await request('GET',`/api/v1/todoList?day=${day}&page=${page}`)
        if (result == null){
            return;
        }
        if(result?.status == 200){
            console.log(result)
            dispatch(getTodolist(result))
        }

    }
}

export const callRegistTodo = (text) => {
    return async (dispatch,getState) => {
        const result = await request('POST',`/api/v1/todoList?content=${text}`)
        if(result?.status == 201){
            dispatch(registSuccess(result))
        }

    }
}
export const callTodoModifyAPI = (text,todoNo) => {
    return async (dispatch,getState) => {
        const result = await request('PUT',`/api/v1/todoList/${todoNo}?content=${text}`)
        if(result?.status == 201 ){
            dispatch(modifySuccess(result))
        }
    }
}
export const callTodoDeleteAPI = (todoNo) => {
    return async (dispatch,getState)=> {
        const result = await request('DELETE',`api/v1/todoList/${todoNo}`)
        if(result?.status == 204 ){
            dispatch(deleteSuccess(result))
        }

    }
}
import {authRequest, request} from "./Api";

import {completeSuccess, deleteSuccess, getTodolist, modifySuccess, registSuccess} from "../modules/TodoListModule";


export const callTodoListAPI = (page=1,day)=>{
    console.log(day)
    return async (dispatch,getState) => {
        const result = await authRequest.get(`/api/v1/todoList?day=${day}&page=${page}`)

        if(result?.status == 200){
            dispatch(getTodolist(result))
        }

    }
}

export const callRegistTodo = (text) => {
    return async (dispatch,getState) => {
        const result = await authRequest.post(`/api/v1/todoList?content=${text}`)
        if(result?.status == 201){
            dispatch(registSuccess(result))
        }

    }
}
export const callTodoModifyAPI = (text,todoNo) => {
    return async (dispatch,getState) => {
        const result = await authRequest.put(`/api/v1/todoList/${todoNo}?content=${text}`)
        if(result?.status == 201 ){
            dispatch(modifySuccess(result))
        }
    }
}
export const callTodoDeleteAPI = (todoNo) => {
    return async (dispatch,getState)=> {
        const result = await authRequest.delete(`api/v1/todoList/${todoNo}`)
        if(result?.status == 204 ){
            dispatch(deleteSuccess(result))
        }

    }
}
export const callTodoComplete = (todoNo,message) =>{
    return async (dispatch,getState)=>{
        const result = await authRequest.put(`api/v1/todoListComplete/${todoNo}?message=${message}`)
        if(result?.status == 201){

            dispatch(completeSuccess(result))

        }
    }

}
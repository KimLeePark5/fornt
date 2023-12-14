//초기값
import {createActions, handleActions} from "redux-actions";

const initial = {}

//액션 함수
const GET_TODOLIST = 'todolist/GET_TODOLIST'
const REGIST_SUCCESS = 'todolist/REGIST_SUCCESS'
const MODIFY_SUCCESS = 'todolist/MODIFY_SUCCESS'
const DELETE_SUCCESS = 'todolist/DELETE_SUCCESS'

//액션함수
export const { todolist :{getTodolist,registSuccess,modifySuccess,deleteSuccess}} = createActions({
    [GET_TODOLIST] : result => ({myTodo : result}),
    [REGIST_SUCCESS] : result => ({registSuccess : true}),
    [MODIFY_SUCCESS] : result =>({modifySuccess : true}),
    [DELETE_SUCCESS] : result => ({deleteSuccess : true})
})

//리듀서 함수
export const todoListReducer = handleActions({
    [GET_TODOLIST] : (state,{payload}) => payload,
    [REGIST_SUCCESS] : (state,{payload}) => payload,
    [MODIFY_SUCCESS] : (state,{payload}) => payload,
    [DELETE_SUCCESS] : (state,{payload}) => payload
},initial)

import {useEffect, useState} from "react";
import TodoListModify from "./TodoListModify";
import {callTodoComplete} from "../../apis/TodoListAPI";
import {useDispatch} from "react-redux";
import modifyAttendModal from "../items/AttendItems/ModifyAttendModal";

function TodoListItem({content}){
    const [todoLIstModifyModal,settodoLIstModifyModal]=useState(false);
    const [todoNo , setTodoNo] =useState(0)
    const dispatch = useDispatch();
    const checkboxOnchangeHandler = (e)=>{
        let message = ''
        console.log(e.target.checked)
        if(e.target.checked){
            message = 'COMPLETE'
            console.log(e.target.value, message)
            dispatch(callTodoComplete(e.target.value, message));
        }else{
            message = 'INCOMPLETE'
            dispatch(callTodoComplete(e.target.value, message));
        }
    }
const textDecoStyle = (content)=>{
        if(content.todoComplete == 'complete'){
            return {textDecoration:'line-through'}
        }else{
            return {}
        }

}

    const escKeyModalClose = (e) => {
        if(todoLIstModifyModal){
            settodoLIstModifyModal(false);
        }
    };
    // window.addEventListener("keydown", escKeyModalClose);

    return(
        <div className='todobox'>
            {todoLIstModifyModal && <TodoListModify settodoLIstModifyModal={settodoLIstModifyModal} todoNo={todoNo}/>}
            {content && content.map((content,i) =>
                <div className='setttodo'>
                <input type='checkbox'
                       className='todocheckbox'
                       value={content.todoNo} checked={content.todoComplete == 'complete'} onChange={checkboxOnchangeHandler} style={{marginTop:5}}
                />
                <label className='itemboxtodo'
                       for='todoCheckbox'
                     style={textDecoStyle(content)}
                     onClick={()=> {
                    settodoLIstModifyModal(true)
                    setTodoNo(content.todoNo)
                }}
                >{content.todoContent}</label>
                </div>
            )}
        </div>
    )
}

export default TodoListItem;
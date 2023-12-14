import {useEffect, useState} from "react";
import TodoListModify from "./TodoListModify";
import {callTodoComplete} from "../../apis/TodoListAPI";
import {useDispatch} from "react-redux";

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
    return(
        <div className='todobox'>
            {todoLIstModifyModal && <TodoListModify settodoLIstModifyModal={settodoLIstModifyModal} todoNo={todoNo}/>}
            {content.length == 0 && <div style={{fontSize:17,paddingLeft:240}}>오늘 할 일을 등록해보세요</div>}
            {content && content.map(content =>
                <div className='setttodo'>
                <input type='checkbox'
                       value={content.todoNo} checked={content.todoComplete == 'complete'} onChange={checkboxOnchangeHandler}/>
                <div className='itemboxtodo'
                     style={textDecoStyle(content)}
                     onClick={()=> {
                    settodoLIstModifyModal(true)
                    setTodoNo(content.todoNo)
                }}>{content.todoContent}</div>
                </div>
            )}
        </div>
    )
}
export default TodoListItem;
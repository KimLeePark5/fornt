import {useState} from "react";
import TodoListModify from "./TodoListModify";

function TodoListItem({content}){
    const [todoLIstModifyModal,settodoLIstModifyModal]=useState(false);
    const [todoNo , setTodoNo] =useState(0)
    console.log(
        'content',content
    )
    return(
        <div className='todobox'>
            {todoLIstModifyModal && <TodoListModify settodoLIstModifyModal={settodoLIstModifyModal} todoNo={todoNo}/>}
            {content && content.map(content =>
                <>
                <input type='checkbox' checked={content.todoComplete == 'complete'}/>
                <div onClick={()=> {
                    settodoLIstModifyModal(true)
                    setTodoNo(content.todoNo)
                }}>{content.todoContent}</div>
                </>
            )}
        </div>
    )
}
export default TodoListItem;
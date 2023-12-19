
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callRegistTodo} from "../../apis/TodoListAPI";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function TodoRegist({setTodoRegist}){
    const navigater = useNavigate();
    const dispatch=useDispatch()
    const [text, setText]=useState('')
    const {registSuccess} = useSelector(state => state.todoListReducer)

    const todoregistHandler = () => {
        if(!text){
            toast.error("공백일 수 없습니다.")
            return;
        }
        dispatch(callRegistTodo(text));
    }
    if(registSuccess){
        setTodoRegist(false)
    }
    return(
        <div class="todomodal">
            <div className="todomodalcontainer">
                <div className="todoregiHead">
                    Todo-List
                </div>
                <input type='text' value={text} className='todoregistInput' placeholder='할일 입력' onChange={(e)=>{setText(e.target.value)}}/>
                <br/>
                <div className='todoregistbtn'>
                <button className='toregibtn' onClick={todoregistHandler}>등록</button>
                <button className='toregibtn'  style={{marginLeft:'20px'}} onClick={()=>{setTodoRegist(false)}}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default TodoRegist;
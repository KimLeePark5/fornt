import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callTodoListAPI} from "../../apis/TodoListAPI";
import TodoListList from "./TodoListList";
import TodoRegist from "../todoList/TodoRegist";

function MainTodoList(){
    const date = new Date();
    const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ (String(date.getDate()).length == 1 ? '0'+date.getDate() : date.getDate());
    const [day,setDay]=useState(today);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const {myTodo} = useSelector(state=>state.todoListReducer);
    console.log("mytodo",myTodo)

    useEffect(() => {
        dispatch(callTodoListAPI(page,day))
    }, [day,page]);
    useEffect(() => {
        dispatch(callTodoListAPI(page,day))
    }, []);

    const [todoRegist,setTodoRegist]=useState(false);

    const dateChangeHandler = (e)=>{
        setDay(e.target.value)
    }

    return(
            <div className='todoContainer'>
                <input type='text'/><button onClick={()=>setTodoRegist(true)}>추가</button>
                {todoRegist && <TodoRegist setTodoRegist={setTodoRegist}/>}
                    {myTodo && <TodoListList data={myTodo.data} setPage={setPage}/>}
            </div>
    )
}
export default MainTodoList
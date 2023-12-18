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
    const {myTodo,modifySuccess,deleteSuccess,registSuccess,completeSuccess} = useSelector(state=>state.todoListReducer);
    console.log("mytodo",myTodo)

    useEffect(() => {
        dispatch(callTodoListAPI(page,day))
    }, [day,page,modifySuccess,deleteSuccess,registSuccess,completeSuccess]);


    const [todoRegist,setTodoRegist]=useState(false);

    const dateChangeHandler = (e)=>{
        setDay(e.target.value)
    }
    const escKeyModalClose = (e) => {
        if(e.key=='Escape'){
        if(todoRegist){
            setTodoRegist(false);
        }
        }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return(<>
        {todoRegist && <TodoRegist setTodoRegist={setTodoRegist}/>}
            <div className='todoContainer'>
                <div className='todoccc'>
                <div>
                <input type='date' value={today} onChange={dateChangeHandler} className='tododate'/>
                    <button onClick={()=>setTodoRegist(true)} className='todoregistbnt'>추가+</button>
                <h1 style={{fontWeight:'bold',fontSize:25,marginTop: 25,paddingLeft:40}}>TO DO LIST</h1>
                </div>
                </div>
                {myTodo && <TodoListList data={myTodo.data} setPage={setPage}/>}
            </div>
        </>
    )
}
export default MainTodoList
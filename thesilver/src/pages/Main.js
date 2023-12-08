import MainTodoList from "../components/main/MainTodoList";
import {ToastContainer} from "react-toastify";

function Main(){

    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <MainTodoList/>
        </>
    )
}
export default Main;
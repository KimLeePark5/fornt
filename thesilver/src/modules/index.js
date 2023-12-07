import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {todoListReducer} from "./TodoListModule";


const rootReducer = combineReducers({ customerReducer,attendReducer,loginReducer,todoListReducer });

export default rootReducer;
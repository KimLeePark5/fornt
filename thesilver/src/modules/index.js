import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";

const rootReducer = combineReducers({ customerReducer,attendReducer,loginReducer });

export default rootReducer;
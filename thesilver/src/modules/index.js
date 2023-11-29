import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";

const rootReducer = combineReducers({ customerReducer,attendReducer });

export default rootReducer;
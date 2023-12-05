import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import employeesReducer from "./EmployeesModule";

const rootReducer = combineReducers({ customerReducer,attendReducer, employeesReducer });

export default rootReducer;
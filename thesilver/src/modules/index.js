import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {vacationReducer} from "./VacationModules";
import employeesReducer from "./EmployeesModule";


const rootReducer = combineReducers({ customerReducer,attendReducer,loginReducer, vacationReducer, employeesReducer });

export default rootReducer;
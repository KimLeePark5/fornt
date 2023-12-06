import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {vacationReducer} from "./VacationModules";
import employeesReducer from "./EmployeesModule";
import programReducer from "./ProgramsModule";


const rootReducer = combineReducers({
    customerReducer,attendReducer,loginReducer, vacationReducer, programReducer, employeesReducer
});


export default rootReducer;
import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {todoListReducer} from "./TodoListModule";
import {vacationReducer} from "./VacationModules";
import programReducer from "./ProgramsModule";
import employeesReducer from "./EmployeesModule";
import journalReducer from "./JournalsModule";


const rootReducer = combineReducers({
    customerReducer,attendReducer,loginReducer, vacationReducer, programReducer,employeesReducer, journalReducer, todoListReducer

});





export default rootReducer;
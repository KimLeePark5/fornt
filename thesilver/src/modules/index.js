import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {vacationReducer} from "./VacationModules";
import programReducer from "./ProgramsModule";


const rootReducer = combineReducers({
    customerReducer,attendReducer,loginReducer, vacationReducer, programReducer
});

export default rootReducer;
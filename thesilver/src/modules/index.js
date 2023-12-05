import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";
import {attendReducer} from "./AttendModule";
import loginReducer from "./LoginModule";
import {vacationReducer} from "./VacationModules";


const rootReducer = combineReducers({ customerReducer,attendReducer,loginReducer, vacationReducer });

export default rootReducer;
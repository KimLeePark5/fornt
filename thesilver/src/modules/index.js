import {combineReducers} from "redux";
import customerReducer from "./CustomerModule";

const rootReducer = combineReducers({ customerReducer });

export default rootReducer;
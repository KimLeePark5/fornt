// import {createActions, handleActions} from "redux-actions";
//
// const initialState = {};
//
// const GET_VACATION = 'vacation/GET_VACATION';
//
// export const {vacation : {getVacation}} = createActions({
//     [GET_VACATION] : result => ({data: result.data})
// });
//
// const vacationReducer = handleActions({
//     [GET_VACATION]: (state, {payload}) => payload,
// }, initialState);
//
// export default vacationReducer;
import {handleActions} from "redux-actions";

const initialState = {};

const REQUIRE_SUCCESS = 'vacation/REQUIRE_SUCCESS';



const vacationReducer = handleActions({
    [REQUIRE_SUCCESS] : (state, {payload}) => payload
}, initialState)

export default vacationReducer;
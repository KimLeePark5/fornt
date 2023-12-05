import { createActions, handleActions} from "redux-actions";

const initialState = {};

const VACATION = 'VACATION';

export const { vacation, setVacation } = createActions({
    [VACATION]: result => ({ payload: result.data })
});


export const vacationReducer = handleActions({
    [VACATION]: (state, { payload }) => {
        console.log("API 응답 구조 확인: ", payload);
        return {
            ...state,
            ...payload
        };
    }
}, initialState);

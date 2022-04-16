import {createAction, hadleActions, handleActions} from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

const LOG_IN = "LOG_IN";
const LOG_OUT="LOG_OUT";
const GET_USER = "GET_USER"

const logIn = createAction(LOG_IN, (user) => ({user}))
const logOut = createAction(LOG_OUT, (user) => ({user}))
const getUser = createAction(GET_USER, (user) => ({user}))

const initialState = {
    user:null,
    id_login:false,
}

// reducer
export default handleActions({
    [LOG_IN] : (state,action) => produce(state, (draft) => {
        setCookie("is_login", 'success')
        draft.user = action.payload.user;
        draft.is_login = true
    }),
    [LOG_OUT] : (state,action) => produce(state, (draft) => {
        
    }),
    [GET_USER] : (state,action) => produce(state, (draft) => {
        
    })
}, initialState)

const actionCreators = {
    logIn,
    logOut,
    getUser
}

export {actionCreators}
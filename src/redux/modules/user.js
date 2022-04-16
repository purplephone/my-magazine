import {createAction, hadleActions} from "redux-actions";
import { produce } from "immer";

const LOG_IN = "LOG_IN";
const LOG_OUT="LOG_OUT";
const GET_USER = "GET_USER"

const logIn = createAction(LOG_IN, (user) => ({user}))


import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";
import axios from "axios";
import { urll } from "./test";

//token 
// token = sessionStorage.getItem('token')
// headers: {
//   Authorization:`Bearer ${token}`
// }

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));



// initialState
const initialState = {
  user: {
    userNickname:"asd",
    userProfile:"",
    isAdmin:false
  },
  isLogin: false,
};

// middleware actions
const loginFB = (nickname, pwd, imageUrl="") => {
  return function (dispatch, getState, { history }) {
    axios({
      method:'post',
      url: `${urll}api/users/login`,
      data:{
        nickname:nickname,
        password:pwd
      }
    }).then(function (response){
      sessionStorage.setItem('token', response.data.token)
      console.log("login data : ", response.data)
      const user_info = {
        nickname: response.data.nickname,
        isAdmin : response.data.isAdmin,
        userProfile:imageUrl
      }
      dispatch(setUser(user_info));
    }).catch((err) => {
      console.log(err)
    })
    history.replace("/");
  };
};

const signupFB = (nickname, pwd, pwd2) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname, pwd, pwd2)
    axios({
      method:'post',
      url : `${urll}api/users/register`,
      data:{
        nickname : nickname,
        password : pwd,
        confirmPassword : pwd2,
      }
    }).then(function (response){
      console.log("response data : " , response.data)
    }).catch((err) => {
      console.log(err)
    })
    history.push("/");
  }
};

const loginCheckFB = () => {
  return function (dispatch, getState, { histroy }) {
    const token = sessionStorage.getItem('token')
    axios({
      method:'get',
      url : `${urll}api/users/auth`,
      headers:{
        authorization : `Bearer ${token}`,
      }
    }).then(function (response){
      const user_info = {
        nickname: response.data.nickname,
        isAdmin : response.data.isAdmin,
        userProfile : ""
      }
      dispatch(setUser(user_info))
      console.log("check : success")
    })
  };
};

const logOutFB = () => {
  return function (dispatch, getState, { history }) {
    sessionStorage.removeItem('token')
    dispatch(logOut());
    history.replace("/login");
  }
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("isLogin");
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logOutFB,
};

export { actionCreators };

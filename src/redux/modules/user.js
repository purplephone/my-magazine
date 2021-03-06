import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { urll } from "./test";
import { actionCreators as postActions } from "./post";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

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
    nickname:"",
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
      setCookie( response.data.token)
      const user_info = {
        nickname: response.data.nickname,
        isAdmin : response.data.isAdmin,
        userProfile:imageUrl
      }
      dispatch(setUser(user_info));
      dispatch(postActions.getPostFB())
      history.push("/");
    }).catch((err) => {
      console.log(err)
    })
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
      history.push("/");
    }).catch((err) => {
      console.log(err)
    })
  }
};

const loginCheckFB = () => {
  return function (dispatch, getState, { histroy }) {
    const token = getCookie()
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
    deleteCookie()
    dispatch(logOut());
    dispatch(postActions.getPostFB())
    history.replace("/");
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
        draft.user = initialState.user;
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

import {createAction, handleActions} from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import {auth} from '../../shared/firebase';
import firebase from "firebase/app";

const LOG_IN = "LOG_IN";
const LOG_OUT="LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logIn = createAction(LOG_IN, (user) => ({user}))
const logOut = createAction(LOG_OUT, (user) => ({user}))
const getUser = createAction(GET_USER, (user) => ({user}))
const setUser = createAction(SET_USER, (user) => ({user}))

const initialState = {
    user:null,
    is_login:false,
}

//middleware actions
const loginFB = (email,pwd) => {
    return function (dispatch, getState,{history}){
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
            auth.signInWithEmailAndPassword(email, pwd)
            .then((userCredential) => {
            // Signed in
                var user = userCredential.user;
                dispatch(setUser({userNickname:user.displayName, email:email, userUrl:'', userId:user.uid}));
                history.push('/');
            })
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage)
        });

    } 
}

const signupFB = (email, pwd, nickname) => {
    return function (dispatch,getState,{history}){
        auth.createUserWithEmailAndPassword(email, pwd)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            auth.currentUser.updateProfile({
                displayName: nickname
            }).then(() => {
                console.log(user.displayName,email, nickname, user.uid)
                dispatch(setUser({
                    userNickname:nickname, 
                    email:email, 
                    userUrl:'',
                    userId : user.uid
                }))
                history.push('/');
            }).catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
}

const loginCheckFB = () => {
    return function (dispatch, getState, {history}){
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(
                    setUser({
                        userNickname:user.displayName, 
                        email:user.email, 
                        user_profile:'',
                        uid : user.uid
                    })
                )
            }
            else{
                dispatch(logOut());
            }
        })
    }
}

const logoutFB = () => {
    return function (dispatch, getState, {history}){
        auth.signOut().then(() => {
            dispatch(logOut())
            history.replace('/')
        })
    }
}

// reducer
export default handleActions(
    {
        [SET_USER]: (state, action) =>
            produce(state, (draft) => {
                setCookie("is_login", "success");
                draft.user = action.payload.user;
                draft.is_login = true;
        }),
        [LOG_OUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                draft.user = null;
                draft.is_login = false;
        }),
        [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

const actionCreators = {
    logIn,
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB
}

export {actionCreators}




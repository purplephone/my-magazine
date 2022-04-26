import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import axios from "axios";
import { urll } from "./test";
import { isLogin } from "../../shared/isLogin";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LOADING = "LOADING";
const UPDATE_COMMENT = "UPDATE_COMMENT"

const updateComment = createAction(UPDATE_COMMENT, (commentId, comment) => ({
  commentId,
  comment
}))
const deleteComment = createAction(DELETE_COMMENT, ( commentId) => ({ commentId}))
const setComment = createAction(SET_COMMENT, (post,comments) => ({
  post,
  comments,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));



// const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
  post: null,
  comments : [],
  isLoading: false,
};

const updateCommentFB = (postId, commentId, content="") => {
  return function (dispatch,getState,{history}){
    const token = isLogin()
    const user = getState().user.user
    axios({
      method:'put',
      url : `${urll}api/posts/${postId}/comments/${commentId}`,
      data:{
        content:content
      },
      headers:{
        authorization : `Bearer ${token}`
      }
    }).then(function(response){
      const comment = {
        content,
        commentId,
        nickname:user.nickname,
        imageUrl:user.userProfile,
        createdAt : moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt : moment().format("YYYY-MM-DD HH:mm:ss"),
      }
      dispatch(updateComment(commentId,comment))
    }).catch((err) => {
      console.log(err)
    })
  }
}

const deleteCommentFB = (postId,commentId) => {
  return function (dispatch, getState, {history}) {
    const token = isLogin()
    axios({
      method : 'delete',
      url : `${urll}api/posts/${postId}/comments/${commentId}`,
      headers: {
        authorization : `Bearer ${token}`
      }
    }).then(function(response){
      dispatch(deleteComment(commentId))
    }).catch((err) => {
      console.log(err)
    })
  }
}

const addCommentFB = (postID, content) => {
  return function (dispatch, getState, { history }) {
    const token = isLogin()
    const user = getState().user.user
    axios({
      method:'post',
      url : `${urll}api/posts/${postID}/comments`,
      data:{
        content : content
      },
      headers :{
        authorization: `Bearer ${token}`
      }
    }).then(function (response){
      const comment = {
        commentId : response.data.commentId,
        nickname : user.nickname,
        imageUrl : user.userProfile,
        content : content,
        createdAt : moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt : moment().format("YYYY-MM-DD HH:mm:ss"),
      }
      dispatch(addComment(comment))
    }).catch((err) =>{
      console.log(err)
    })
  }
};


const getOnePostFB = (postId) => {
  return function (dispatch, getState, { history }) {
    const token = isLogin()
    if(token){
      axios({
        method:'get',
        url : `${urll}api/posts/${postId}`,
        headers: {
          authorization : `Bearer ${token}`
        }
      }).then(function (response) {
        const post = response.data.post
        const comments = [...response.data.post.comments]
        // const commentCnt = comments.length
        dispatch(setComment(post,comments))
      }).catch((err) => {
        console.log(err)
      })
    }
    else{
      axios({
        method:'get',
        url : `${urll}api/posts/${postId}`,
        data:{

        }
      }).then(function (response) {
        const post = response.data.post
        const comments = [...response.data.post.comments]
        // const commentCnt = comments.length
        dispatch(setComment(post,comments))
      }).catch((err) => {
        console.log(err)
      })
    }
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        // draft.commentCnt = action.payload.commentCnt;
        draft.comments = action.payload.comments;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.unshift(action.payload.comment);
      }),

    [DELETE_COMMENT]: (state, action) =>
    produce(state, (draft) => {
      draft.comments = draft.comments.filter((c) => c.commentId !== action.payload.commentId)
    }),

    [UPDATE_COMMENT]: (state, action) =>
    produce(state, (draft) => {
      const idx = state.comments.findIndex((c) => c.commentId === action.payload.commentId)
      draft.comments[idx] = action.payload.comment
    }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

const actionCreators = {
  getOnePostFB,
  addCommentFB,
  setComment,
  addComment,
  deleteCommentFB,
  updateCommentFB,
};

export { actionCreators };

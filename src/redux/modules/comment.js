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

const deleteComment = createAction(DELETE_COMMENT, ( commentId) => ({ commentId}))
const setComment = createAction(SET_COMMENT, (post,comments, commentCnt) => ({
  post,
  comments,
  commentCnt
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));

// const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
  post: null,
  comments : [],
  isLoading: false,
  commentCnt : 0
};

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
      console.log(response.data)
      const comment = {
        nickname : user.nickname,
        imageUrl : user.userProfile,
        content : content,
        createdAt : moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt : moment().format("YYYY-MM-DD HH:mm:ss"),
      }
      dispatch(addComment(postID, comment))
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
        const commentCnt = comments.length
        dispatch(setComment(post,comments,commentCnt))
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
        const commentCnt = comments.length
        dispatch(setComment(post,comments,commentCnt))
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
        draft.commentCnt = action.payload.commentCnt
        draft.comments = action.payload.comments;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.unshift(action.payload.comment);
        draft.comments.commentCnt += 1
      }),

    [DELETE_COMMENT]: (state, action) =>
    produce(state, (draft) => {
      draft.comments = state.comments.filter((c) => c.commentId !== action.payload.commentId)
      console.log(typeof action.payload.commentId, action.payload.commentId)
      console.log(draft.comments)
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
  deleteCommentFB
};

export { actionCreators };

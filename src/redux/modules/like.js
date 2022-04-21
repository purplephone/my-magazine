import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import firebase from "firebase/app";
import { actionCreators as postActions } from "./post";

const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const UNDO_LIKE = "UNDO_LIKE";

const setLike = createAction(SET_LIKE, (postID, userList) => ({
  postID,
  userList,
}));
const addLike = createAction(ADD_LIKE, (postID, userID) => ({
  postID,
  userID,
}));
const undoLike = createAction(UNDO_LIKE, (postID, userID) => ({
  postID,
  userID,
}));

const initialState = {
  list: {},
};

const addLikeFB = (postID) => {
  return function (dispatch, getState, { history }) {
    const likeDB = firestore.collection("like");
    const userInfo = getState().user.user;

    let like = {
      postID: postID,
      userID: userInfo.uid,
      userName: userInfo.userName,
      insertDt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    likeDB.add(like).then((doc) => {
      const postDB = firestore.collection("post");

      const post = getState().post.list.find((l) => l.id === postID);

      const increment = firebase.firestore.FieldValue.increment(1);

      like = { ...like, id: doc.id };
      postDB
        .doc(postID)
        .update({ likeCnt: increment })
        .then((_post) => {
          dispatch(addLike(postID, userInfo.uid));

          if (post) {
            dispatch(
              postActions.editPost(postID, {
                likeCnt: parseInt(post.likeCnt) + 1,
              })
            );
          }
        });
    });
  };
};

const undoLikeFB = (postID) => {
  return function (dispatch, getState, { history }) {
    const likeDB = firestore.collection("like");
    const userInfo = getState().user.user;

    likeDB
      .where("postID", "==", postID)
      .where("userID", "==", userInfo.uid)
      .get()
      .then((docs) => {
        let id = "";
        docs.forEach((doc) => (id = doc.id));
        likeDB
          .doc(id)
          .delete()
          .then(() => {
            const postDB = firestore.collection("post");

            const post = getState().post.list.find((l) => l.id === postID);

            const decrement = firebase.firestore.FieldValue.increment(-1);

            postDB
              .doc(postID)
              .update({ likeCnt: decrement })
              .then((_post) => {
                dispatch(undoLike(postID, userInfo.uid));
                if (post) {
                  if (parseInt(post.likeCnt) === 0) return;

                  dispatch(
                    postActions.editPost(postID, {
                      likeCnt: parseInt(post.likeCnt) - 1,
                    })
                  );
                }
              });
          });
      })
      .catch((error) => {
        console.log("LIKE FAILED", error);
      });
  };
};

const getLikeFB = (postID) => {
  return function (dispatch, getState, { history }) {
    if (!postID) {
      return;
    }

    const likeDB = firestore.collection("like");

    likeDB
      .where("postID", "==", postID)
      .get()
      .then((docs) => {
        let userList = [];
        docs.forEach((doc) => {
          userList.push(doc.data().userID);
        });

        dispatch(setLike(postID, userList));
      })
      .catch((error) => {
        console.log("LIKE FAILED", error);
      });
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postID] = action.payload.userList;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postID].push(action.payload.userID);
      }),
    [UNDO_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // let list = draft.list[action.payload.postID];
        // list = list.filter((userID) => userID !== action.payload.userID);
        draft.list[action.payload.postID] = draft.list[
          action.payload.postID
        ].filter((userID) => userID !== action.payload.userID);
      }),
  },
  initialState
);

const actionCreators = {
  getLikeFB,
  addLikeFB,
  undoLikeFB,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

const moment=require('moment');

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list : [],
}

const initialPost = {
    userId:1,
    userNickname:"testUser",
    userUrl:"https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjlfMTg0/MDAxNjE3MDIxODU4MzIx.jRX9zgbSwS7rFSZlnvThnvAn0DUwsy_CYvZJtRQV57kg.QXB3bRcMm-NsjUOAoW2NwiuxnC_ihrSYjctjaD_w4Wog.JPEG.nohns76/SE-c0d1e18b-8f96-4b54-aab4-2bd8fb81e067.jpg?type=w800",
    title:"testTitle",
    postId:1,
    content:"conetent",
    created:"2022-04-15 13:15:25",
    updated: moment().format("YYYY-MM-DD hh:mm:ss"),
    imageUrl:"https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjlfMTg0/MDAxNjE3MDIxODU4MzIx.jRX9zgbSwS7rFSZlnvThnvAn0DUwsy_CYvZJtRQV57kg.QXB3bRcMm-NsjUOAoW2NwiuxnC_ihrSYjctjaD_w4Wog.JPEG.nohns76/SE-c0d1e18b-8f96-4b54-aab4-2bd8fb81e067.jpg?type=w800",
    likeCnt:20,
    commentCnt : 10,
    isLike:true
}

const addPostFB = (content="") => {
    return function (dispatch,getState,{history}){
        const postDB = firestore.collection('post')
        const _user = getState().user.user;
        const _post = {
            ...initialPost,
            ..._user,
            content : content,
            created: moment().format("YYYY-MM-DD hh:mm:ss"),
            updated: moment().format("YYYY-MM-DD hh:mm:ss"),
            likeCnt:0,
            commentCnt:0,
            isLike:false,
        }
        postDB.add(_post).then((doc) => {
            let post = {..._post, postId:doc.id}
            dispatch(addPost(post))
            history.replace('/')
        }).catch((err) => {
            console.log("post 작성 실패!!")
        })
    }
}

const getPostFB = () => {
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        postDB.get().then((docs) => {
            const post_list = []
            docs.forEach((doc) => {
                let post = {
                    id : doc.id,
                    ...doc.data()
                }
                post_list.push(post)
            })
            dispatch(setPost(post_list))
        })
    }
}

export default handleActions(
    {
        [SET_POST] : (state,action) => produce(state,(draft)=>{
            draft.list = action.payload.post_list
        }),
        [ADD_POST] : (state,action) => produce(state,(draft)=>{
            draft.list.unshift(action.payload.post);
        }),
    }, initialState
)

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB
}

export {actionCreators}
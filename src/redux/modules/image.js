import {createAction, handleActions} from "redux-actions"
import produce from "immer"

import {storage} from "../../shared/firebase"

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE"
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({uploading}))
const uploadImage = createAction(UPLOAD_IMAGE, (imageUrl) => ({imageUrl}))
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}))

const initialState = {
    imageUrl:'',
    uploading:false,
    preview : "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjlfMTg0/MDAxNjE3MDIxODU4MzIx.jRX9zgbSwS7rFSZlnvThnvAn0DUwsy_CYvZJtRQV57kg.QXB3bRcMm-NsjUOAoW2NwiuxnC_ihrSYjctjaD_w4Wog.JPEG.nohns76/SE-c0d1e18b-8f96-4b54-aab4-2bd8fb81e067.jpg?type=w800",
}

const uploadImageFB = (image) => {
    return function(dispatch,getState,{history}){
        dispatch(uploading(true))
        const _upload = storage.ref(`images/${image.name}`).put(image);
        _upload.then((snapshot) => {
            
            snapshot.ref.getDownloadURL().then((url) => {
                dispatch(uploadImage(url))
                console.log(url)
            })
        })
    }
}

export default handleActions({
    [UPLOAD_IMAGE] : (state,action) => produce(state,(draft) => {
        draft.imageUrl = action.payload.imageUrl
        draft.uploading = false
    }),
    [UPLOADING] : (state,action) => produce(state,(draft) => {
        draft.uploading = action.payload.uploading
    }),
    [SET_PREVIEW] : (state,action) => produce(state,(draft) => {
        draft.preview = action.payload.preview;
    }),
},initialState)

const actionCreators = {
    uploadImageFB,
    setPreview,
}

export {actionCreators}
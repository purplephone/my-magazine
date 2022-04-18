import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../elements";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch()
    const fileInput = React.useRef(null)
    const is_uploading = useSelector(state => state.image.uploading);
    const uploadFB = () => {
        let image = fileInput.current.files[0]
        dispatch(imageActions.uploadImageFB(image))
    }
    const selectFile = (e) => {
        const reader =new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result))
        }
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB} text="업로드하기"></Button>
        </React.Fragment>
    )
}

export default Upload;
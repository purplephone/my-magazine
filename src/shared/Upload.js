import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = () => {
  const fileInput = useRef("");
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  // const uploadFB = () => {
  //   let image = fileInput.current.files[0];
  //   dispatch(imageActions.uploadImageFB(image));
  // };

  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        disabled={isUploading}
        onChange={selectFile}
        style={{marginTop:"20px"}}
      />
      {/* <Button _onClick={uploadFB} text="업로드하기"></Button> */}
    </React.Fragment>
  );
};

export default Upload;

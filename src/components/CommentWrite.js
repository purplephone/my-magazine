import React, { useRef } from "react";
import { Grid, Input, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

const CommentWrite = ({ postID, commentId, content, editFalse }) => {
  const dispatch = useDispatch();
  const commentText = useRef("");

  const write = () => {
    const COMMENTTEXT = commentText.current.value;
    if (commentId){
      editFalse()
      dispatch(commentActions.updateCommentFB(postID,commentId,COMMENTTEXT))
    }
    else {
      if (!COMMENTTEXT) {
        alert("댓글 내용을 입력해주세요!");
        return;
      }
      dispatch(commentActions.addCommentFB(postID, COMMENTTEXT));
      commentText.current.value = "";
    }
  };

  React.useEffect(() => {
    commentText.current.value = content
  })

  return (
    <React.Fragment>
      <Grid padding="16px" isFlex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          reff={commentText}
          onSubmit={write}
        />
        <Button
          text="작성"
          width="50px"
          margin="0px 2px 0px 2px"
          _onClick={write}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

CommentWrite.defaultProps = {
  postID : null,
  contentId : null,
  content:"",
  editFalse:() => {}
}
export default CommentWrite;

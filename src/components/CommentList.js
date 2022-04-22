import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../shared/isLogin";
import { actionCreators as commentActions } from "../redux/modules/comment";


const CommentList = ({postID}) => {
  const comments = useSelector((state) => state.comment.comments? state.comment.comments : [])
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comments.map((c,i) => {
          return <CommentItem postId={postID} key={i} {...c}></CommentItem>
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  postID: null,
};

export default CommentList;

const CommentItem = ({
  imageUrl,
  nickname,
  postId,
  content,
  createAt,
  commentId
}) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(commentActions.deleteCommentFB(postId, commentId))
  }
  const login = isLogin()
  return (
    <Grid isFlex>
      <Grid isFlex width="auto">
        <Image shape="circle" src={imageUrl} />
        <Text bold>{nickname}</Text>
      </Grid>
      <Grid isFlex margin="0px 4px">
        <Text margin="0px">{content}</Text>
        <Text margin="0px">{createAt}</Text>
        <Button 
          width="40px"
          margin="5px 0 0 0"
          padding="4px"
          text="삭제"
          _onClick={handleDelete}>
        </Button>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "mean0",
  userID: "",
  postID: 1,
  contents: "귀여운 고양이네요!",
  insertDt: "2021-01-01 19:00:00",
};

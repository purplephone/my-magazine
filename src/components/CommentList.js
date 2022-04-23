import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import CommentWrite from "./CommentWrite";


const CommentList = ({postID}) => {
  const comments = useSelector((state) => state.comment.comments? state.comment.comments : [])
  React.useEffect(() => {

  },[comments])
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
  const [edit, setEdit] = React.useState(false)

  const handleDelete = () => {
    dispatch(commentActions.deleteCommentFB(postId, commentId))
  }

  const user = useSelector((state) => state.user.user)
  const handleEdit = () => {
    setEdit(!edit)
  }
  const editFalse = () => {
    setEdit(false)
  }
  return (
    <React.Fragment>
      <Grid isFlex>
        <Grid isFlex width="auto">
          <Image shape="circle" src={imageUrl} />
          <Text width="70px" bold>{nickname}</Text>
        </Grid>
        <Grid isFlex margin="0px 4px">
          <Text margin="0px" width="180%">{content}</Text>
          <Grid isFlex>
            {nickname===user.nickname && 
            <Button 
              width="40px"
              margin="5px 0 0 0"
              padding="4px"
              text="수정"
              _onClick={handleEdit}>
            </Button>
            }
            {nickname===user.nickname && 
            <Button 
              width="40px"
              margin="5px 0 0 0"
              padding="4px"
              text="삭제"
              _onClick={handleDelete}>
            </Button>
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid >
        {edit ? <CommentWrite postID={postId} commentId={commentId} content={content} editFalse={editFalse}/>: null}
      </Grid>
      </React.Fragment>
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

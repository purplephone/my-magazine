import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image, Grid, Text} from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import PostLayout from "../components/PostLayout";
import Like from "../components/Like";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { isLogin } from "../shared/isLogin";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.comment.post)
  const commentCnt = useSelector((state) => state.comment.commentCnt)
  const login = isLogin()
  React.useEffect(() => {
    if(!post){
      dispatch(commentActions.getOnePostFB(postId))
    }
  })

  if(post){
    return (
      <React.Fragment>
      <Grid margin="20px 0" bg="white" height="100%">
        <Grid isFlex>
          <Grid padding="8px" isFlex width="none" >
            <Image shape="circle" src={post.imageUrl} />
            <Text bold>{post.nickname}<br/>{post.created}</Text>
          </Grid>
        </Grid>
        
          <Grid>

          <PostLayout layout={post.layout} preview={post.imageUrl} content={post.content} />

          </Grid>
        <Grid isFlex padding="8px" height="80px">
          <Grid>
            <Text bold>댓글 {commentCnt? commentCnt:0}개</Text>
            <Text bold>좋아요 {post.likeCnt}개</Text>
          </Grid>
          {login ?null: <Like postId={post.postId} />}
        </Grid>
        {login && <CommentWrite postID={post.postId}/>}
        <Grid>
          <CommentList postID={post.postId}/>
        </Grid>
      </Grid>
    </React.Fragment>
    );
  } else {
    return(null)
  }
};

export default PostDetail;

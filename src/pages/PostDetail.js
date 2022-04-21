import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image, Grid, Text, Input } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import PostLayout from "../components/PostLayout";
import Like from "../components/Like";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.user);
  dispatch(commentActions.getCommentFB(postId))
  const post = useSelector((state) => state.comment.post)
  // useEffect(() => {
  //   if (!post) {
  //     return;
  //   }
  // }, []);

  return (
    <React.Fragment>
    <Grid margin="20px 0" bg="white" height="100%">
      <Grid isFlex>
        <Grid padding="8px" isFlex width="none" >
          <Image shape="circle" src={post.imageUrl} />
          <Text bold>{userInfo.userNickname}<br/>{post.created}</Text>
        </Grid>
      </Grid>
      
        <Grid>

        <PostLayout layout={post.layout} preview={post.imageUrl} content={post.content} />

        </Grid>
      <Grid isFlex padding="8px" height="80px">
        <Grid>
          <Text bold>댓글 0개</Text>
          <Text bold>좋아요 {post.likeCnt}개</Text>
        </Grid>
        <Like postId={post.postId} />
      </Grid>
    </Grid>
  </React.Fragment>
  );
};

export default PostDetail;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";
import Like from "./Like";
import PostLayout from "./PostLayout";

const Post = ({
  userId,
  userNickname,
  postId,
  title,
  content,
  created,
  updated,
  imageUrl,
  likeCnt,
  isLike,
  commentCnt,
  layout,
  idx
  }) => {
  const dispatch = useDispatch();

  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(postActions.deleteFB(postId));
      history.replace("/");
    }
  };

  // useEffect(() => {
  //   dispatch(likeActions.getLikeFB(postId));
  // }, [dispatch, postId]);

  return (
    <React.Fragment>
      <Grid margin="20px 0" bg="white" height="100%">
        <Grid isFlex>
          <Grid padding="8px" isFlex width="none" >
            <Image shape="circle" src={imageUrl} />
            <Text bold>{userNickname}<br/>{created}</Text>
          </Grid>
          <Grid margin="0 10px 0 120px" width="none" >
              <React.Fragment>
                <Button
                  text="수정"
                  padding="4px"
                  _onClick={() => {
                    history.push(`/write/${postId}`);
                  }}
                ></Button>
                <Button
                  margin="5px 0 0 0"
                  padding="4px"
                  text="삭제"
                  _onClick={deletePost}
                ></Button>
              </React.Fragment>
          </Grid>
        </Grid>
        
          <Grid _onClick={() => {history.push(`/post/${postId}`)}}>

          <PostLayout layout={layout} preview={imageUrl} content={content} />

          </Grid>
          <Grid isFlex padding="8px" height="80px">
            <Grid>
              <Text bold>댓글 {commentCnt}개</Text>
              <Text bold>좋아요 {likeCnt}개</Text>
            </Grid>
            <Like postId={postId} idx={idx} />
          {/* <Image
            shape="none"
            src={
              toggleLike
                ? `${process.env.PUBLIC_URL}/assets/redHeart.png`
                : `${process.env.PUBLIC_URL}/assets/emptyHeart.png`
            }
            _onClick={() => {
              setToggleLike(!toggleLike);
            }}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  userId: 1,
  userNickname: "testUser",
  postId: 1,
  title: "testTitle",
  content: "conetent",
  created: "2022-04-15 13:15:25",
  updated: "2022-04-15 14:15:25",
  imageUrl: "http ...",
  likeCnt: 20,
  isLike: true,
  commentCnt: 10,
  layout: "top"
}

export default Post;

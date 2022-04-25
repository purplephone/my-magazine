import React from "react";
import {  useSelector } from "react-redux";
import Post from "../components/Post";
import { Button, Grid } from "../elements";
// import { actionCreators as postActions } from "../redux/modules/post";
// import InfinityScroll from "../shared/InfinityScroll";

const PostList = ({ history }) => {
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);
  // const isLoading = useSelector((state) => state.post.isLoading);
  // const paging = useSelector((state) => state.post.paging);

  return (
    <React.Fragment>
      {/* <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        isNext={paging.next ? true : false}
        loading={isLoading}
      > */}
        {postList.map((p, idx) => {
          if (p.userId === userInfo?.uid) {
            return (
              <Grid
                key={idx}
              >
                <Post
                  {...p}
                  idx={idx}
                  isMe
                />
              </Grid>
            );
          } else {
            return (
              <Grid
                key={idx}
              >
                <Post
                  {...p}
                  idx={idx}
                />
              </Grid>
            );
          }
        })}
      {/* </InfinityScroll> */}
      {isLogin &&
        <Button
          isFloat
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      }
    </React.Fragment>
  );
};

export default PostList;
